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
