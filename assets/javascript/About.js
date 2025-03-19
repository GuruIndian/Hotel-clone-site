

// Form Submission Handling
document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    alert(`Email Sent!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
});

