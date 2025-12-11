
    // Toggle expand/collapse functionality
    function toggleExpand(header) {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.expand-icon');
      const isActive = content.classList.contains('active');
      
      // Close all other expanded items
      document.querySelectorAll('.expand-content.active').forEach(item => {
        if (item !== content) {
          item.classList.remove('active');
          const otherIcon = item.previousElementSibling.querySelector('.expand-icon');
          otherIcon.src = '/images/img_ic_baseline_plus.svg';
        }
      });
      
      // Toggle current item
      if (isActive) {
        content.classList.remove('active');
        icon.src = '/images/img_ic_baseline_plus.svg';
      } else {
        content.classList.add('active');
        icon.src = '/images/img_ic_baseline_minus.svg';
      }
    }
    
    // Fragrance selection functionality
    document.querySelectorAll('.fragrance-option').forEach(option => {
      option.addEventListener('click', function() {
        // Remove selected class from all options
        document.querySelectorAll('.fragrance-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        this.classList.add('selected');
      });
    });
    
    // Newsletter form submission
    function handleNewsletterSubmit(event) {
      event.preventDefault();
      const email = event.target.querySelector('.email-input').value;
      
      if (email) {
        alert('Thank you for subscribing! We\'ll keep you updated on our latest fragrances and offers.');
        event.target.reset();
      }
    }
    
    // Gallery navigation (placeholder functionality)
    document.querySelectorAll('.gallery-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        // Placeholder for gallery navigation
        console.log('Gallery navigation clicked');
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Add to cart functionality
    document.querySelector('.add-to-cart').addEventListener('click', function() {
      const selectedFragrance = document.querySelector('.fragrance-option.selected .fragrance-label').textContent.trim();
      alert(`Added ${selectedFragrance} fragrance to cart! Redirecting to checkout...`);
    });
    
    // Mobile menu toggle (placeholder for future implementation)
    function toggleMobileMenu() {
      const navMenu = document.querySelector('.nav-menu');
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.stat-item, .plan-card, .expand-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
