// =========================
// SERVICES SLIDER
// =========================

const servicesTrack = document.querySelector(".services-track");

if (servicesTrack) {
  const originalCards = [...servicesTrack.children];

  // Duplicate cards dynamically
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);

    clone.setAttribute("aria-hidden", "true");

    servicesTrack.appendChild(clone);
  });

  let animationFrame;
  let position = 0;
  const speed = 0.5;

  function animateSlider() {
    position -= speed;

    const halfWidth = servicesTrack.scrollWidth / 2;

    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }

    servicesTrack.style.transform = `translateX(${position}px)`;

    animationFrame = requestAnimationFrame(animateSlider);
  }

  animateSlider();

  // Pause on hover
  servicesTrack.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationFrame);
  });

  servicesTrack.addEventListener("mouseleave", () => {
    animateSlider();
  });
}
