
    // Your Firebase configuration
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

    // Add event listener to the reset form
    document.getElementById("reset-form").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent default form submission

      const email = document.getElementById('email').value;

      // Send password reset email
      auth.sendPasswordResetEmail(email)
        .then(() => {
          // Password reset email sent successfully
          console.log("Password reset link sent. Please check your email.");
          alert("Password reset link sent. Please check your email.");
          // Redirect to sign-in page
          window.location.href = "signin.html";
        })
        .catch((error) => {
          // Handle errors
          console.error("Error sending password reset email:", error);
          alert(error.message);
        });
    });
  </script>
</body>
</html>
