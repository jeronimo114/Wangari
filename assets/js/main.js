// main.js
// --------------------------------------------------
// Custom JavaScript for Wangari Website
// Handles mobile menu toggling and GSAP animations
// --------------------------------------------------

// Mobile Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
  const mobileNav = document.getElementById("mobile-nav");
  mobileNav.classList.toggle("hidden");
});

// GSAP Scroll-Triggered Animations
// Animate each experience item when it scrolls into view
gsap.utils.toArray(".experience-item").forEach(function (elem) {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 80%", // Start animation when element reaches 80% of viewport height
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });
});

// Animate the hero section text on page load
gsap.from("#hero h1", {
  duration: 1,
  opacity: 0,
  y: -50,
  ease: "power2.out",
});
gsap.from("#hero p", {
  duration: 1,
  delay: 0.5,
  opacity: 0,
  y: 50,
  ease: "power2.out",
});

// Additional scroll-trigger animation for the About section heading
gsap.from("#about h2", {
  scrollTrigger: {
    trigger: "#about h2",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
});
