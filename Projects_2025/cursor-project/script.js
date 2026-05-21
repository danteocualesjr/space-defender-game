// Smooth scrolling for navigation links
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

// Add hover effects and interactions
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Sidebar item interactions
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Time filter interactions
document.querySelectorAll('.time-filter').forEach(filter => {
    filter.addEventListener('click', function() {
        document.querySelectorAll('.time-filter').forEach(f => f.classList.remove('active'));
        this.classList.add('active');
    });
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

