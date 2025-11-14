// ====================================
// Page Loader
// ====================================
window.addEventListener("load", function () {
  const loader = document.getElementById("page-loader");
  setTimeout(function () {
    loader.classList.add("fade-out");
    setTimeout(function () {
      loader.style.display = "none";
    }, 500);
  }, 500);
});

// ====================================
// Mobile Menu Toggle
// ====================================
document.addEventListener("DOMContentLoaded", function() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const mainNav = document.getElementById("main-nav");

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mainNav.classList.toggle("active");

      // Animate hamburger icon
      const spans = this.querySelectorAll("span");
      if (mainNav.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnToggle = mobileToggle.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        mainNav.classList.contains("active")
      ) {
        mainNav.classList.remove("active");
        const spans = mobileToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }
});

// ====================================
// Smooth Scrolling for Navigation Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Close mobile menu if open
        if (mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          const spans = mobileToggle.querySelectorAll("span");
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
        }
      }
    }
  });
});

// ====================================
// Active Navigation Tab on Scroll
// ====================================
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".content-section[id], .hero-section[id], .carousel-section[id]");
  const navLinks = document.querySelectorAll(".nav-tabs a");
  const mainNavLinks = document.querySelectorAll("nav a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 250) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  mainNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ====================================
// FAQ Accordion
// ====================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", function () {
    const isActive = answer.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      ans.classList.remove("active");
    });
    document
      .querySelectorAll(".faq-question span:last-child")
      .forEach((icon) => {
        icon.textContent = "+";
      });

    // Open clicked item if it was closed
    if (!isActive) {
      answer.classList.add("active");
      question.querySelector("span:last-child").textContent = "−";
    }
  });
});

// ====================================
// Lazy Loading for Images
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  }
});

// ====================================
// Initialize Owl Carousel (using jQuery)
// ====================================
$(document).ready(function () {
  // Doctors Carousel
  $(".doctors-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ["<span>&#8249;</span>", "<span>&#8250;</span>"],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Hospitals Carousel
  $(".hospitals-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navText: ["<span>&#8249;</span>", "<span>&#8250;</span>"],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});

// ====================================
// Sticky Header Effect
// ====================================
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)";
  }

  lastScroll = currentScroll;
});

// ====================================
// Scroll Animation for Content Sections
// ====================================
document.addEventListener("DOMContentLoaded", function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe content sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
});