document.addEventListener('DOMContentLoaded', function() {
    const sellGiftCardForm = document.getElementById('sellGiftCardForm');
    const quoteResult = document.getElementById('quoteResult');
    const historyList = document.getElementById('historyList');
  
    sellGiftCardForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const cardCategory = document.getElementById('cardCategory').value;
      const cardSubCategory = document.getElementById('cardSubCategory').value;
      const amountUSD = parseFloat(document.getElementById('amount').value);
      const optionalComments = document.getElementById('optionalComments').value;
      const giftCardImage = document.getElementById('giftCardImage').files[0];
  
      // Convert amount to Naira
      const conversionRate = 1100; // Assuming 1 USD = 410 NGN (adjust as needed)
      const amountNaira = amountUSD * conversionRate;
  
      // Display quote
      quoteResult.textContent = `You will receive ₦${amountNaira.toFixed(2)} for your ${cardCategory} ${cardSubCategory} gift card.`;
  
      // Display converted amount
      const convertedAmountSpan = document.createElement('span');
      convertedAmountSpan.textContent = `Converted Amount: ₦${amountNaira.toFixed(2)}`;
      quoteResult.appendChild(convertedAmountSpan);
  
      // Add transaction to history
      const transactionItem = document.createElement('li');
      transactionItem.classList.add('historyItem');
      transactionItem.innerHTML = `Sold ${cardCategory} ${cardSubCategory} gift card for ₦${amountNaira.toFixed(2)} <br> Comments: ${optionalComments}`;
      historyList.appendChild(transactionItem);
  
      // Clear form fields
      sellGiftCardForm.reset();
    });
  });
  

  // Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDObCfvc9Cf1BpR_P6y2loBWNhSUPgorqg",
      authDomain: "veepay-4521d.firebaseapp.com",
      projectId: "veepay-4521d",
      storageBucket: "veepay-4521d.appspot.com",
      messagingSenderId: "56228740854",
      appId: "1:56228740854:web:1498028cdfdb533b3536d7",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the Firebase database
  const db = firebase.firestore();
  
  // Function to update balance on the dashboard
  function updateBalance(balance) {
    document.getElementById('balance').innerText = balance;
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
        // Optionally, you can display a success message or perform other actions here
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        // Optionally, you can display an error message or handle the error here
      });
    } else {
      // User is not signed in, handle accordingly (e.g., redirect to login page)
      console.log("User is not signed in.");
    }
  });
  