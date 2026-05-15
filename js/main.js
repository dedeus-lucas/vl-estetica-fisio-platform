/* =========================
    MOBILE MENU
========================= */

const menuToggle = document.querySelector(".mobile-menu-toggle");
const navigation = document.querySelector(".nav");

if (menuToggle && navigation) {
  const navLinks = document.querySelectorAll(".nav-link");
  const body = document.body;

  function openMenu() {
    navigation.classList.add("active");
    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    body.style.overflow = "hidden";
  }

  function closeMenu() {
    navigation.classList.remove("active");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  }

  function toggleMenu() {
    const isActive = navigation.classList.toggle("active");

    menuToggle.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isActive);

    if (isActive) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  /* Close menu when clicking links */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* Close on ESC */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}

/* =========================
    SMOOTH SCROLL + ACTIVE LINKS
========================= */

/* Smooth scroll (fallback controlado) */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

/* Active link highlight (scroll spy leve) */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

/* =========================
    CURRENT YEAR
========================= */

const currentYear = document.getElementById("year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================
    AOS INIT
========================= */

if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
}
