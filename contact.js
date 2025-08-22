 // contact.js

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://api.myapp.com"; // replace with your backend domain

const contactForm = document.getElementById("contactForm");
const formResponse = document.getElementById("formResponse");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const interest = document.getElementById("interest").value.trim();
    const message = document.getElementById("message").value.trim();

    formResponse.innerText = "Submitting...";

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, interest, message }),
      });

      const data = await res.json();

      if (data.success) {
        formResponse.innerText = "✅ Message sent successfully!";
        contactForm.reset();
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      formResponse.innerText = "❌ Failed to send message. Try again later.";
    }
  });
}
