// --the logic of the page should include using the local storage to store the products that the user has selected to buy.
// ----assume that setLocalStorage and getLocalStorage and redirectURL functions are already created.
// ----assume that the customer has selected products to buy from the product page and has navigated to the shopping cart page.
// ----Product name, product description, product image, and the price of the products that the user selected should be stored in local storage.
// ----The products need to be retrieved from local storage upon loading the shopping cart page.
// ------the data needed from the product page local storage is the product name, product description, product image, and the price.
// ------the data should be stored in an array of objects.
// ------the array of objects should be stored in the local storage.
// ------the array of objects should be retrieved from the local storage upon loading the checkout page.
// ------the array of objects should be displayed on the checkout page.
// ------the array of objects should be used to calculate the total price of the products.
// ------the total price of the products should be displayed on the checkout page.
// ------the total price of the products should be stored in the local storage.
// ------the total price of the products should be retrieved from the local storage upon loading the checkout page.

document.addEventListener('DOMContentLoaded', () => {
  const couponCodeInput = document.getElementById('coupon-code');
  const applyCouponButton = document.getElementById('apply-coupon');
  const couponMessage = document.getElementById('coupon-message');
  const subtotalElement = document.getElementById('subtotal');
  const taxesElement = document.getElementById('taxes');
  const totalElement = document.getElementById('total');
  const productContainer = document.getElementById('product-container');
  const clearCartButton = document.getElementById('clear-cart-btn');

  let isCouponApplied = false;

  // Create a function to remove an item from the cart
  const removeFromCart = function (productId) {
    let cart = getLocalStorage("cart");
    // Filter out the product to be removed
    cart = cart.filter((item) => item.id !== productId);
    setLocalStorage("cart", cart);
  };

  // Create a function to clear the cart
  const clearCart = function () {
    setLocalStorage("cart", []);
  };

  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      clearCart();
      handleCartDisplay(); // Refresh the cart after clearing it
    });
  }

  // Function to display products on the checkout page
  function displayProducts(products) {
    productContainer.innerHTML = ''; // Clear any existing content
  
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Quantity: ${product.quantity}</p>
        <p>Price: $${product.price}</p>
        <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
        <button class="remove-btn" data-id="${product.id}">Remove</button>
      `;
      productContainer.appendChild(productElement);
    });
  
    // Add event listeners to each "Remove" button
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = button.getAttribute('data-id');
        removeFromCart(productId);
        handleCartDisplay(); // Refresh the cart after removing an item
      });
    });
  }

  // Function to display the total price on the checkout page
  function displayTotalPrice(totalPrice) {
    totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  // Function to calculate and display the subtotal, taxes, and total
  function calculateAndDisplayTotals() {
    const cartTotals = calculateCartTotal(); // Get subtotal and item count from cart
    let subtotal = cartTotals.totalPrice;
    const salesTaxRate = 0.05; // 5% tax
    let taxes = subtotal * salesTaxRate;
    let total = subtotal + taxes;

    // If coupon is applied, make the cart free
    if (isCouponApplied) {
      subtotal = 0;
      taxes = 0;
      total = 0;
    }

    // Update the DOM elements with the calculated values
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxesElement.textContent = `$${taxes.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Function to apply the coupon
  function applyCoupon() {
    const enteredCoupon = couponCodeInput.value.trim().toLowerCase(); // Normalize coupon code input
    const validCoupon = "charlierocks"; // Correct coupon code (case-insensitive)

    if (enteredCoupon === validCoupon) {
      isCouponApplied = true;
      couponMessage.textContent = "Coupon applied successfully! Your cart is free.";
      couponMessage.style.color = "green";
    } else {
      isCouponApplied = false;
      couponMessage.textContent = "Invalid coupon code. Please try again.";
      couponMessage.style.color = "red";
    }

    // Recalculate totals after coupon application
    calculateAndDisplayTotals();
  }

  // Function to handle displaying the cart and totals
  function handleCartDisplay() {
    const cart = getLocalStorage('cart') || []; // Get the cart from local storage (default to empty array)

    if (cart.length > 0) {
      displayProducts(cart);
      calculateAndDisplayTotals(); // Calculate totals when page is loaded
    } else {
      productContainer.innerHTML = '<p>Your cart is empty.</p>';
      subtotalElement.textContent = "$0.00";
      taxesElement.textContent = "$0.00";
      totalElement.textContent = "$0.00";
    }
  }

  // Event listener to handle coupon application
  if (applyCouponButton) {
    applyCouponButton.addEventListener('click', applyCoupon);
  }

  // Event listener to handle cancel button click
  const cancelButton = document.querySelector('.cancel-btn'); // Select the cancel button
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      redirectPage('home.html'); // Redirect to the home page
    });
  }

  // Initial display of cart items and totals
  handleCartDisplay();
});