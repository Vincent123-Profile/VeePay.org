// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDObCfvc9Cf1BpR_P6y2loBWNhSUPgorqg",
    authDomain: "veepay-4521d.firebaseapp.com",
    projectId: "veepay-4521d",
    storageBucket: "veepay-4521d.appspot.com",
    messagingSenderId: "56228740854",
    appId: "1:56228740854:web:1498028cdfdb533b3536d7",
    measurementId: "G-LVLJ81JTMX"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Set up the form submission
  document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get the user's email
    const email = document.getElementById('email').value;
  
    // Send a password reset email to the user
    auth.sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        showSuccessMessage("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        // An error occurred
        const errorMessage = error.message;
        showErrorMessage(errorMessage);
      });
  });
  
  // Function to display success message
  function showSuccessMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'green';
    errorMessageElement.style.display = 'block';
  }
  
  // Function to display error message
  function showErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'red';
    errorMessageElement.style.display = 'block';
  }
  