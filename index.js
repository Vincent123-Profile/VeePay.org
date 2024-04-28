// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Set up our registration function
  function register() {
    // Get all our input fields
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const pin = document.getElementById('pin').value;
    const referrer = document.getElementById('referrer').value;
  
    // Validate input fields
    if (validate_email(email) === false || validate_password(password) === false) {
      alert('Email or password is Outta line!!');
      return;
    }
    if (validate_field(fullname) === false || validate_field(pin) === false || validate_field(referrer) === false) {
      alert('One or More Extra Fields is outta line!!');
      return;
    }
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        // Declare user variable
        var user = auth.currentUser;
  
        // Add this user to Firebase Database
        var database_ref = database.ref();
  
        // Create User data
        var user_data = {
          whatsapp: whatsapp,
          email: email,
          fullname: fullname,
          confirmPassword: confirmPassword,
          pin: pin,
          referrer: referrer,
          last_login: Date.now()
        };
  
        database_ref.child('user/' + user.uid).set(user_data);
  
        alert('User Created!!');
      })
      .catch(function (error) {
        // Firebase will use this message to alert
        var error_code = error.code;
        var error_message = error.message;
  
        alert(error_message);
      });
  }
  
  function validate_email(email) {
    var expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (expression) {
      // Email is valid
      return true;
    } else {
      // Email is not valid
      return false;
    }
  }
  
  function validate_password(password) {
    // Firebase requires passwords to be at least 6 characters long
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  }
  
  function validate_field(field) {
    if (field == null || field.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
  