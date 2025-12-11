
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
// Function to handle the selection of the subscription plan (Single or Double) and toggle content visibility
function selectSubscriptionPlan(selectedPlanCard) {
    // 1. Deselect all plans and hide their content
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected-plan');
        
        // Find the content wrapper and hide the content
        const contentToggle = card.querySelector('.plan-details-toggle');
        if (contentToggle) {
            contentToggle.classList.remove('active-content');
        }
    });

    // 2. Select the clicked plan and show its content
    selectedPlanCard.classList.add('selected-plan');
    
    // Find the content wrapper of the clicked plan and show the content
    const selectedContentToggle = selectedPlanCard.querySelector('.plan-details-toggle');
    if (selectedContentToggle) {
        selectedContentToggle.classList.add('active-content');
    }
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Attach listener to the main plan cards for selection
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', function(event) {
            // Check if the click occurred outside the plan details area (to allow clicks inside the expanded area)
            if (!event.target.closest('.plan-details-toggle')) {
                selectSubscriptionPlan(this);
            }
        });
    });

    // 2. Fragrance Selection listener (also ensures the parent plan is selected/visible)
    document.querySelectorAll('.fragrance-option').forEach(option => {
        option.addEventListener('click', function() {
            // Existing logic for selecting the fragrance within its group
            const fragranceOptionsContainer = this.closest('.fragrance-options');
            if (fragranceOptionsContainer) {
                fragranceOptionsContainer.querySelectorAll('.fragrance-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            }
            
            // Explicitly call selectSubscriptionPlan to ensure the parent card stays visible
            const parentPlanCard = this.closest('.plan-card');
            if (parentPlanCard) {
                selectSubscriptionPlan(parentPlanCard);
            }
        });
    });
    
    // If you need your other existing functions (like toggleExpand, handleNewsletterSubmit, etc.), 
    // you should paste them here, below the plan selection logic.

});