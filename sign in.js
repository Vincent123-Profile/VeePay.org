
    function togglePassword(inputId) {
      var input = document.getElementById(inputId);
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }




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
  firebase.initializeApp(firebaseConfig);

  // Initialize variables
  const auth = firebase.auth();
  
  // Set up the sign-in function
  document.getElementById("signin-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get the user's email/phone and password
    const emailOrPhone = document.getElementById('phoneOrEmail').value;
    const password = document.getElementById('password').value;
  
    // Sign in the user with Firebase Authentication
    auth.signInWithEmailAndPassword(emailOrPhone, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log("User signed in:", user);
        // You can redirect the user to another page or perform any other action here
      })
      .catch((error) => {
        // An error occurred
        const errorMessage = error.message;
        showError(errorMessage);
      });
  });
  
  // Function to display error messages
  function showError(message) {
    const errorDetail = document.getElementById('error-detail');
    errorDetail.textContent = message;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
  }