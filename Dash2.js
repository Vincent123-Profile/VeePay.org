// Firebase configuration
var firebaseConfig = {
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
  
  // Reference to the Firebase database
  const db = firebase.firestore();
  
  // Function to update balance on the dashboard
  function updateBalance(balance) {
    document.getElementById('balance').innerText = balance;
  }
  
  // Function to display a notification
  function displayNotification(message) {
    alert(message);
  }
  
  // Function to handle user authentication state changes
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      const userId = user.uid;
      
      // Display username
      document.getElementById('welcomeMessage').innerText = "Welcome to Your Dashboard, " + user.displayName;
      
      // Retrieve user data from the database
      db.collection("users").doc(userId).get().then(function(doc) {
        if (doc.exists) {
          // Update balance on the dashboard
          updateBalance(doc.data().balance);
        } else {
          // User data doesn't exist, create a new document
          db.collection("users").doc(userId).set({
            username: user.displayName,
            balance: 0
          }).then(function() {
            // Update balance on the dashboard
            updateBalance(0);
          }).catch(function(error) {
            console.error("Error adding document: ", error);
          });
        }
      }).catch(function(error) {
        console.error("Error getting document:", error);
      });
    } else {
      // User is signed out.
      // Redirect to login page or handle sign out state
    }
  });
  
  // Function to handle form submission (e.g., selling gift cards)
  document.getElementById('sellGiftCardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);
    
    // Get the current user
    const user = firebase.auth().currentUser;
    
    if (user) {
      // User is signed in, proceed to store data in the database
      const userId = user.uid;
      
      // Here, you would typically store the user input (e.g., amount) in the database
      // For example, let's store it under a 'transactions' collection
      db.collection("transactions").add({
        userId: userId,
        amount: amount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        // Display a success notification
        displayNotification("Trade successful!");
        // Optionally, you can display a success message or perform other actions here
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        // Display an error notification
        displayNotification("Trade failed. Please try again later.");
        // Optionally, you can display an error message or handle the error here
      });
    } else {
      // User is not signed in, handle accordingly (e.g., redirect to login page)
      console.log("User is not signed in.");
    }
  });
  