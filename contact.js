// Backend URL (adjust port if needed)
const API_BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3001" // for local dev practice
    : "https://9e6285eeee1f.ngrok-free.app "; // for production

// Get the form and response div
const contactForm = document.getElementById("contact-form");
const formResponse = document.getElementById("formResponse");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect input values
    const full_name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const interest = document.getElementById("interest").value.trim();
    const message = document.getElementById("message").value.trim();

    // Show loading message
    formResponse.innerText = "Submitting... Please wait.";

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, phone, interest, message }),
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
