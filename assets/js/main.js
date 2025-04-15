// assets/js/main.js
// --------------------------------------------------
// JavaScript personalizado para Wangari
// Módulos:
// 1. MobileMenu: gestión del menú móvil (hamburger) con animación smooth
// 2. SmoothScroll: desplazamiento suave para el botón CTA en el hero
// 3. ScrollAnimations: animaciones de elementos al hacer scroll
// --------------------------------------------------

(() => {
  "use strict";

  // ==================================================
  // MÓDULO: MobileMenu - Gestión del menú móvil
  // ==================================================
  const MobileMenu = (() => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    const openMenu = () => {
      mobileNav.classList.remove("hidden");
      gsap.fromTo(
        mobileNav,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    };

    const closeMenu = () => {
      gsap.to(mobileNav, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          mobileNav.classList.add("hidden");
          gsap.set(mobileNav, { clearProps: "height,opacity" });
        },
      });
    };

    const toggleMenu = () => {
      if (mobileNav.classList.contains("hidden")) {
        openMenu();
      } else {
        closeMenu();
      }
    };

    const init = () => {
      if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", toggleMenu);
      }
    };

    return { init };
  })();

  // ==================================================
  // MÓDULO: SmoothScroll - Desplazamiento suave para el botón CTA
  // ==================================================
  const SmoothScroll = (() => {
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    function scrollToTarget(target, duration) {
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
      requestAnimationFrame(animation);
    }

    const init = () => {
      const ctaButton = document.querySelector(".hero a");
      if (ctaButton) {
        ctaButton.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = ctaButton.getAttribute("href");
          const targetEl = document.querySelector(targetId);
          if (targetEl) scrollToTarget(targetEl, 1100);
        });
      }
    };

    return { init };
  })();

  // ==================================================
  // MÓDULO: ScrollAnimations - Animaciones al hacer scroll
  // ==================================================
  const ScrollAnimations = (() => {
    const initAnimations = () => {
      // Animar cada experiencia al llegar a la vista
      gsap.utils.toArray(".experience-item").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Animar el texto del hero al cargar
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

      // Animar el título de la sección "Quiénes Somos" o Proyecto
      gsap.from("#project h2", {
        scrollTrigger: {
          trigger: "#project h2",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
      });
    };

    const init = () => initAnimations();
    return { init };
  })();

  // ==================================================
  // Inicialización de todos los módulos cuando el DOM esté listo
  // ==================================================
  document.addEventListener("DOMContentLoaded", () => {
    MobileMenu.init();
    SmoothScroll.init();
    ScrollAnimations.init();
  });
})();
