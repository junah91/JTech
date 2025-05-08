document.addEventListener("DOMContentLoaded", function () {
  // Ask for password after ensuring the DOM is fully loaded
  function askPassword() {
    const username = document.getElementById('username').value.trim();

    if (!username) {
      alert("Please enter your name first!");
      return;
    }

    // ✅ Update modal welcome message dynamically
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${username}! Please Enter the Code:`;
  }

    // Show the password modal
    const passwordModal = document.getElementById('passwordModal');
    if (passwordModal) {
      passwordModal.style.display = 'flex';  // Show the modal
    } else {
      console.error("Password modal not found.");
    }
  }

  function validate() {
    const secretCode = document.getElementById('password').value;

    // Replace 'anime123' with your actual secret code
    if (secretCode === 'anime123') {
      alert("Access granted! Redirecting...");
      window.location.href = 'homepage.html';  // Replace with your actual homepage URL
    } else {
      alert("Incorrect secret code! Please try again.");
    }
  }

  // Bind the 'Next' button to askPassword function
  const nextButton = document.getElementById("nextButton");
  if (nextButton) {
    nextButton.addEventListener("click", askPassword);
  } else {
    console.error("Next button not found.");
  }

  // Bind the 'Enter' button to validate function
  const enterButton = document.getElementById("enterButton");
  if (enterButton) {
    enterButton.addEventListener("click", validate);
  } else {
    console.error("Enter button not found.");
  }
});

function goToHomepage() {
  // Fetch homepage content
  fetch('homepage.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
    });
}
