/* =========================
    CONTACT FORM
========================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const submitButton = contactForm.querySelector(".form-submit");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const originalText = submitButton.textContent;

    submitButton.disabled = true;

    submitButton.textContent = "Enviando...";

    submitButton.classList.add("loading");

    try {
      const response = await fetch("./php/forms/contact.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      submitButton.classList.remove("loading");

      if (!data.success) {
        showFormMessage(data.message || "Erro ao enviar formulário.", "error");

        submitButton.disabled = false;

        submitButton.textContent = originalText;

        return;
      }

      showFormMessage("Solicitação enviada com sucesso.", "success");

      contactForm.reset();

      submitButton.textContent = "Agendamento enviado";

      setTimeout(() => {
        window.open(data.whatsapp, "_blank");
      }, 1200);
    } catch (error) {
      showFormMessage("Erro de conexão. Tente novamente.", "error");

      submitButton.disabled = false;

      submitButton.textContent = originalText;

      submitButton.classList.remove("loading");
    }
  });
}

/* =========================
    FEEDBACK MESSAGE
========================= */

function showFormMessage(message, type) {
  let feedback = document.querySelector(".form-feedback");

  if (!feedback) {
    feedback = document.createElement("div");

    feedback.className = "form-feedback";

    document.querySelector(".contact-form").appendChild(feedback);
  }

  feedback.textContent = message;

  feedback.className = `form-feedback ${type}`;

  setTimeout(() => {
    feedback.remove();
  }, 5000);
}
