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
  