document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const registrationMessage = document.getElementById("registration-message");

    if (registrationForm) {
        registrationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Check if the password and confirm password match
            if (password !== confirmPassword) {
                registrationMessage.textContent = "Passwords do not match.";
                return;
            }

            // Send a request to register and generate OTP
            fetch("http://localhost:5500/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((registrationData) => {
                    // Handle the registration response from the server
                    if (registrationData.success) {
                        // Registration successful, redirect to OTP verification page
                        window.location.href = `otp-verification.html?email=${email}`;
                    } else {
                        registrationMessage.textContent =
                            "Registration failed. Please try again.";
                    }
                })
                .catch((error) => {
                    console.error("Registration Error:", error);
                    registrationMessage.textContent =
                        "An error occurred during registration.";
                });
        });
    }
});
