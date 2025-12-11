import os
import uuid
from flask import Flask, request, jsonify, send_from_directory
from moviepy import concatenate_videoclips, AudioFileClip
from utils import (
    QUALITY_PRESETS,
    download_file,
    synthesize_tts,
    make_image_clip,
    make_text_slide,
)

app = Flask(__name__)
OUTPUT_DIR = "outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)


@app.route("/generate", methods=["POST"])
def generate_video():
    """
    Example POST body:
    {
      "quality": "720p",
      "scenes": [
        {"type": "text", "text": "Hello world!", "duration": 3},
        {"type": "image", "url": "https://example.com/photo.jpg", "duration": 4}
      ]
    }
    """
    try:
        data = request.get_json(force=True)
        quality = data.get("quality", "720p")
        scenes = data.get("scenes", [])

        preset = QUALITY_PRESETS.get(quality, QUALITY_PRESETS["720p"])
        size = preset["size"]
        bitrate = preset["bitrate"]

        clips = []
        temp_files = []

        for scene in scenes:
            s_type = scene.get("type")
            duration = float(scene.get("duration", 3))

            if s_type == "text":
                text = scene.get("text", "")
                clip = make_text_slide(text, size, duration)
                clips.append(clip)

            elif s_type == "image":
                url = scene.get("url")
                fname = f"temp_{uuid.uuid4().hex}.jpg"
                download_file(url, fname)
                temp_files.append(fname)
                clip = make_image_clip(fname, size, duration)
                clips.append(clip)

            elif s_type == "tts":
                text = scene.get("text", "")
                audio_file = f"temp_{uuid.uuid4().hex}.mp3"
                synthesize_tts(text, audio_file)
                temp_files.append(audio_file)
                clip = make_text_slide(text, size, duration)
                clip = clip.set_audio(AudioFileClip(audio_file))
                clips.append(clip)

        final_clip = concatenate_videoclips(clips, method="compose")
        output_name = f"video_{uuid.uuid4().hex}.mp4"
        output_path = os.path.join(OUTPUT_DIR, output_name)

        final_clip.write_videofile(output_path, fps=24, bitrate=bitrate)

        for f in temp_files:
            if os.path.exists(f):
                os.remove(f)

        return jsonify({"success": True, "video": f"/outputs/{output_name}"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


@app.route("/outputs/<path:filename>")
def serve_output(filename):
    return send_from_directory(OUTPUT_DIR, filename, as_attachment=True)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
