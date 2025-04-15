// assets/js/main.js
// --------------------------------------------------
// JavaScript personalizado para Wangari
// Maneja el menú móvil y las animaciones con GSAP y ScrollTrigger
// --------------------------------------------------

// Toggle menú móvil
document.getElementById("menu-toggle").addEventListener("click", function () {
  const mobileNav = document.getElementById("mobile-nav");
  mobileNav.classList.toggle("hidden");
});

// Animaciones de Scroll usando GSAP y ScrollTrigger
gsap.utils.toArray(".experience-item").forEach(function (elem) {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 80%", // Inicia la animación cuando el elemento alcanza el 80% del viewport
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });
});

// Animar el texto del hero al cargar la página
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

// Animación de la cabecera de la sección "Quiénes Somos"
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

// --------------------------------------------------
// Custom Smooth Scroll para el botón de CTA en la sección hero
// con una duración extendida para un desplazamiento más lento
// --------------------------------------------------

// Función de easing (easeInOutQuad)
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

// Función para realizar el smooth scroll hacia un elemento objetivo en una duración específica
function smoothScrollTo(target, duration) {
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

// Agregamos el listener al botón de CTA del hero
document.querySelector(".hero a").addEventListener("click", function (e) {
  e.preventDefault(); // Prevenir el comportamiento por defecto
  const targetId = this.getAttribute("href"); // Ejemplo: "#about"
  const targetEl = document.querySelector(targetId);
  if (targetEl) {
    smoothScrollTo(targetEl, 1200); // Duración de 1500ms para un scroll más lento
  }
});
