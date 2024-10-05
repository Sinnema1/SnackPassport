document.addEventListener("DOMContentLoaded", () => {
  let isCouponApplied = false; // Initialize as false by default

  // Update the cart count when the page loads
  updateCartCount();

  // Utility Functions (Basic cart operations)

  // Create a function to remove an item from the cart
  const removeFromCart = function (productId) {
    let cart = getLocalStorage("cart");
    // Filter out the product to be removed
    cart = cart.filter((item) => item.id !== productId);
    setLocalStorage("cart", cart);
  };

  const clearCart = function () {
    setLocalStorage("cart", []);  // Clear the cart in local storage
    isCouponApplied = false;      // Reset the coupon applied state
    
    // Clear the coupon message
    const couponMessage = document.getElementById("coupon-message");
    couponMessage.textContent = "";         // Clear the coupon message content
    couponMessage.classList.remove("alert", "alert-success", "alert-danger"); // Remove any classes
  
    // Clear the coupon input field
    const couponInput = document.getElementById("coupon-code");
    couponInput.value = ""; // Reset the input field
  
    handleCartDisplay();          // Refresh the cart display
  };

  // Function to calculate the total price and number of items in the cart
  const calculateCartTotal = function () {
    const cart = getLocalStorage("cart");
    if (cart.length === 0) {
      return {
        totalPrice: 0,
        totalItems: 0,
      };
    }

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;
    });

    return {
      totalPrice,
      totalItems,
    };
  };

  // Functions for Displaying Products and Totals

// Function to display products on the checkout page
function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear any existing content

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    // Add an image to the product HTML
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}" style="width:100px;height:auto;" />
      <p>Quantity: ${product.quantity}</p>
      <p>Price: $${product.price}</p>
      <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
      <button class="remove-btn" data-id="${product.id}">Remove</button>
    `;

    productContainer.appendChild(productElement);
  });

  // Add event listeners to each "Remove" button
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = button.getAttribute("data-id");
      removeFromCart(productId);
      handleCartDisplay(); // Refresh the cart after removing an item
    });
  });
}

  // Function to calculate and display the subtotal, taxes, and total
  function calculateAndDisplayTotals() {
    const cartTotals = calculateCartTotal(); // Get subtotal and item count from cart
    let subtotal = cartTotals.totalPrice;
    const salesTaxRate = 0.05; // 5% tax
    let taxes = subtotal * salesTaxRate;
    let total = subtotal + taxes;

    const subtotalElement = document.getElementById("subtotal");
    const taxesElement = document.getElementById("taxes");
    const totalElement = document.getElementById("total");

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

  // Function to handle displaying the cart and totals
  function handleCartDisplay() {
    const cart = getLocalStorage("cart") || []; // Get the cart from local storage (default to empty array)

    if (cart.length > 0) {
      displayProducts(cart);
      calculateAndDisplayTotals(); // Calculate totals when page is loaded
    } else {
      document.getElementById("product-container").innerHTML =
        "<p>Your cart is empty.</p>";
      document.getElementById("subtotal").textContent = "$0.00";
      document.getElementById("taxes").textContent = "$0.00";
      document.getElementById("total").textContent = "$0.00";
    }
    updateCartCount(); // Update cart badge
  }

  // Function to update the cart count in the header (total quantity of items)
  function updateCartCount() {
    const cart = getLocalStorage("cart") || [];
    let totalQuantity = 0;

    // Calculate total quantity of items in the cart
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });

    // Update the badge with the total quantity
    document.querySelector("#cart-button .badge").textContent = totalQuantity;
  }

  // Coupon Handling and Other Event Listeners

  // Function to apply the coupon
  function applyCoupon() {
    const enteredCoupon = document
      .getElementById("coupon-code")
      .value.trim()
      .toLowerCase(); // Normalize coupon code input
    const validCoupon = "charlierocks"; // Correct coupon code (case-insensitive)

    const couponMessage = document.getElementById("coupon-message");

    if (enteredCoupon === validCoupon) {
      isCouponApplied = true; // Set to true when coupon is applied
      couponMessage.textContent =
        "Coupon applied successfully! Your cart is free.";
      couponMessage.classList.remove("alert-danger");
      couponMessage.classList.add("alert-success", "alert");
    } else {
      isCouponApplied = false; // Set to false if coupon is invalid
      couponMessage.textContent = "Invalid coupon code. Please try again.";
      couponMessage.classList.remove("alert-success");
      couponMessage.classList.add("alert-danger", "alert");
    }

    // Recalculate totals after coupon application
    calculateAndDisplayTotals();
  }

  // Modal Form Validation Logic (Uses existing validateForm from logic.js)
  const modalForm = document.querySelector("#modalSignin form");

  // Function to validate email format
  const isValidEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password (e.g., min length of 6 characters)
  const isValidPassword = function (password) {
    return password.length >= 6;
  };

  // Event listener for "Sign up" button in the modal
  modalForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting immediately

    const emailInput = document.getElementById("floatingInput");
    const passwordInput = document.getElementById("floatingPassword");

    // Validate the form fields using the validateForm from logic.js
    let formIsValid = validateForm(modalForm);

    // Custom email validation
    if (!isValidEmail(emailInput.value)) {
      emailInput.classList.add("error");
      formIsValid = false;
    } else {
      emailInput.classList.remove("error");
    }

    // Custom password validation
    if (!isValidPassword(passwordInput.value)) {
      passwordInput.classList.add("error");
      formIsValid = false;
    } else {
      passwordInput.classList.remove("error");
    }

    // If form is valid, submit or perform further actions
    if (formIsValid) {
      console.log("Form is valid, proceeding...");
      modalForm.submit(); // Optionally submit or handle further logic
    } else {
      console.log("Form contains errors. Please fix them.");
    }
  });

  // Event Listeners
  document
    .getElementById("apply-coupon")
    .addEventListener("click", applyCoupon);

  if (document.getElementById("clear-cart-btn")) {
    document.getElementById("clear-cart-btn").addEventListener("click", () => {
      if (confirm("Are you sure you want to clear the cart?")) {
        clearCart(); // Calls the updated clearCart function
      }
    });
  }

  document.querySelector(".cancel-btn").addEventListener("click", () => {
    redirectPage("index.html"); // Redirect to the home page
  });

  document.querySelector(".next-btn").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("modalSignin"));
    modal.show();
  });

  // Initial page load logic
  handleCartDisplay(); // Initial display of cart items and totals
});