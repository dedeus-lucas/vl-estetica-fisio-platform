/* =========================
    MOBILE MENU
========================= */

const menuToggle = document.querySelector(".mobile-menu-toggle");
const navigation = document.querySelector(".nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isActive = navigation.classList.toggle("active");

    menuToggle.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isActive);
  });

  /* Close menu when clicking links */
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
    });
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
