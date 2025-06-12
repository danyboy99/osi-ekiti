// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Dropdown Menu Toggle (Click-based)
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    const parentLi = this.parentElement;

    // Close other dropdowns
    dropdownToggles.forEach((otherToggle) => {
      if (otherToggle !== this) {
        otherToggle.parentElement.classList.remove("dropdown-active");
      }
    });

    // Toggle current dropdown
    parentLi.classList.toggle("dropdown-active");
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".has-dropdown")) {
    dropdownToggles.forEach((toggle) => {
      toggle.parentElement.classList.remove("dropdown-active");
    });
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!link.classList.contains("dropdown-toggle")) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Slideshow Functionality - Simple and working
let currentSlideIndex = 0;
let slideInterval;

// Global functions for slideshow
window.changeSlide = function (direction) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".nav-dot");

  if (slides.length === 0) return;

  // Remove active class from current slide and dot
  slides[currentSlideIndex].classList.remove("active");
  if (dots[currentSlideIndex]) {
    dots[currentSlideIndex].classList.remove("active");
  }

  // Update index
  currentSlideIndex += direction;

  // Loop around
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  // Add active class to new slide and dot
  slides[currentSlideIndex].classList.add("active");
  if (dots[currentSlideIndex]) {
    dots[currentSlideIndex].classList.add("active");
  }
};

window.currentSlide = function (index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".nav-dot");

  if (slides.length === 0) return;

  // Remove active class from current slide and dot
  slides[currentSlideIndex].classList.remove("active");
  if (dots[currentSlideIndex]) {
    dots[currentSlideIndex].classList.remove("active");
  }

  // Set new index
  currentSlideIndex = index - 1;

  // Add active class to new slide and dot
  slides[currentSlideIndex].classList.add("active");
  if (dots[currentSlideIndex]) {
    dots[currentSlideIndex].classList.add("active");
  }
};

// Auto-advance function
function autoSlide() {
  window.changeSlide(1);
}

// Initialize slideshow
function initializeSlideshow() {
  const slides = document.querySelectorAll(".slide");

  if (slides.length > 0) {
    // Start auto-slideshow
    slideInterval = setInterval(autoSlide, 3000);

    // Pause on hover
    const slideshowContainer = document.querySelector(".slideshow-container");
    if (slideshowContainer) {
      slideshowContainer.addEventListener("mouseenter", () => {
        clearInterval(slideInterval);
      });

      slideshowContainer.addEventListener("mouseleave", () => {
        slideInterval = setInterval(autoSlide, 3000);
      });
    }
  }
}

// Touch/Swipe support for mobile
let startX = 0;
let endX = 0;

function initializeTouchSupport() {
  const slideshowContainer = document.querySelector(".slideshow-container");
  if (slideshowContainer) {
    slideshowContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slideshowContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  }
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = startX - endX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left - next slide
      window.changeSlide(1);
    } else {
      // Swiped right - previous slide
      window.changeSlide(-1);
    }
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    window.changeSlide(-1);
  } else if (e.key === "ArrowRight") {
    window.changeSlide(1);
  }
});

// Initialize slideshow
document.addEventListener("DOMContentLoaded", () => {
  // Initialize slideshow
  initializeSlideshow();

  // Initialize touch support
  initializeTouchSupport();

  // Add smooth scroll behavior to navigation links
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".welcome-note, .council-pic"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Trigger line-by-line animation for welcome note
  const welcomeNote = document.querySelector(".welcome-note");
  if (welcomeNote) {
    const animatedTexts = welcomeNote.querySelectorAll(".animated-text");

    // Create intersection observer for welcome note
    const welcomeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations for each line with delay
            animatedTexts.forEach((text, index) => {
              setTimeout(() => {
                text.classList.add("animate");
              }, index * 400); // 400ms delay between each line
            });
            welcomeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    welcomeObserver.observe(welcomeNote);
  }
});
