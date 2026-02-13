/* ============================================
   PREMIUM SPB AI HACKATHON WEBSITE JAVASCRIPT
   Advanced Animations & Interactions
   ============================================ */

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 50
});

/* ============================================
   PARTICLE ANIMATION (Canvas)
   ============================================ */
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const particlesCanvas = document.getElementById('particles-canvas');
if (particlesCanvas) {
    new ParticleSystem(particlesCanvas);
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================================
   SMOOTH SCROLL FOR NAVIGATION
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   MOBILE NAVIGATION TOGGLE
   ============================================ */
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
class AnimatedCounter {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-target'));
        this.current = 0;
        this.increment = this.target / 60;
        this.hasAnimated = false;

        this.observe();
    }

    observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animate();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }

    animate() {
        const updateCounter = () => {
            this.current += this.increment;

            if (this.current < this.target) {
                this.element.textContent = Math.ceil(this.current);
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
            }
        };

        updateCounter();
    }
}

// Initialize counters
document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    new AnimatedCounter(el);
});

/* ============================================
   TILT EFFECT ON CARDS
   ============================================ */
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.maxTilt = 15;

        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const tiltX = percentY * this.maxTilt;
        const tiltY = -percentX * this.maxTilt;

        this.element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    handleMouseLeave() {
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Initialize tilt effect on cards
document.querySelectorAll('.tilt-card').forEach(card => {
    new TiltEffect(card);
});

/* ============================================
   CIRCULAR PROGRESS ANIMATION
   ============================================ */
class CircularProgress {
    constructor(element) {
        this.element = element;
        this.progress = parseInt(element.getAttribute('data-progress'));
        this.circumference = 2 * Math.PI * 45;
        this.hasAnimated = false;

        this.element.style.strokeDasharray = this.circumference;
        this.element.style.strokeDashoffset = this.circumference;

        this.observe();
    }

    observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animate();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }

    animate() {
        const offset = this.circumference - (this.progress / 100) * this.circumference;
        this.element.style.transition = 'stroke-dashoffset 2s ease-out';
        this.element.style.strokeDashoffset = offset;
    }
}

// Initialize circular progress
document.querySelectorAll('.circle-progress[data-progress]').forEach(el => {
    new CircularProgress(el);
});

/* ============================================
   FORM SUBMISSION HANDLER
   ============================================ */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Show success message (you would normally send this to a server)
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');

        // Reset form
        this.reset();
    });
}

/* ============================================
   BUTTON RIPPLE EFFECT
   ============================================ */
class RippleEffect {
    constructor(element) {
        this.element = element;
        this.element.addEventListener('click', (e) => this.createRipple(e));
    }

    createRipple(e) {
        const ripple = document.createElement('span');
        const rect = this.element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize ripple effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    new RippleEffect(btn);
});

/* ============================================
   PARALLAX SCROLL EFFECT
   ============================================ */
class ParallaxScroll {
    constructor() {
        this.elements = document.querySelectorAll('.floating-card');
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const scrolled = window.pageYOffset;

        this.elements.forEach((element, index) => {
            const speed = 0.05 * (index + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Initialize parallax scroll
new ParallaxScroll();

/* ============================================
   GRADIENT ANIMATION ON SVG
   ============================================ */
const svgGradient = `
    <svg width="0" height="0">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
            </linearGradient>
        </defs>
    </svg>
`;

document.body.insertAdjacentHTML('beforeend', svgGradient);

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

/* ============================================
   CURSOR TRAIL EFFECT (Optional)
   ============================================ */
class CursorTrail {
    constructor() {
        this.coords = [];
        this.cursor = null;

        this.init();
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.animate();
    }

    init() {
        for (let i = 0; i < 20; i++) {
            this.coords.push({ x: 0, y: 0 });
        }
    }

    handleMouseMove(e) {
        this.coords.unshift({ x: e.clientX, y: e.clientY });
        this.coords.pop();
    }

    animate() {
        this.coords.forEach((coord, index) => {
            const dot = document.getElementById(`cursor-dot-${index}`);
            if (!dot) {
                const newDot = document.createElement('div');
                newDot.id = `cursor-dot-${index}`;
                newDot.style.cssText = `
                    position: fixed;
                    width: ${5 - index * 0.2}px;
                    height: ${5 - index * 0.2}px;
                    background: rgba(102, 126, 234, ${1 - index * 0.05});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.1s ease;
                `;
                document.body.appendChild(newDot);
            }

            const currentDot = document.getElementById(`cursor-dot-${index}`);
            if (currentDot) {
                currentDot.style.left = coord.x + 'px';
                currentDot.style.top = coord.y + 'px';
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Uncomment to enable cursor trail (may impact performance on some devices)
// new CursorTrail();

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */
class ScrollProgress {
    constructor() {
        this.progressBar = document.createElement('div');
        this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(this.progressBar);

        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        this.progressBar.style.width = scrolled + '%';
    }
}

// Initialize scroll progress
new ScrollProgress();

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
class MagneticButton {
    constructor(element) {
        this.element = element;
        this.magneticStrength = 0.3;

        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.element.style.transform = `translate(${x * this.magneticStrength}px, ${y * this.magneticStrength}px)`;
    }

    handleMouseLeave() {
        this.element.style.transform = 'translate(0, 0)';
    }
}

// Initialize magnetic effect on CTA buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    new MagneticButton(btn);
});

/* ============================================
   LOADING ANIMATION
   ============================================ */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

/* ============================================
   CONSOLE MESSAGE
   ============================================ */
console.log('%c SPB AI & Business Hackathon ', 'background: linear-gradient(90deg, #667eea, #764ba2); color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Developed with cutting-edge web technologies ', 'color: #667eea; font-size: 14px;');
console.log('%c Looking for talented developers? Visit our hackathon! ', 'color: #764ba2; font-size: 12px;');

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Your scroll handlers here
}, 16);

window.addEventListener('scroll', throttledScroll);

// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

/* ============================================
   EASTER EGG - KONAMI CODE
   ============================================ */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
