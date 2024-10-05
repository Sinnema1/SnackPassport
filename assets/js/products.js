document.addEventListener("DOMContentLoaded", () => {
    // Update the cart count when the page loads
    updateCartCount();
  
    // Use addToCart from logic.js to handle adding products to the cart
    const addToCartHandler = function (product) {
      addToCart(product); // Calls the addToCart function from logic.js
      showNotification("Product added to cart!"); // Show success message
      updateCartCount(); // Update the cart count
    };
  
    // Function to display the notification message
    const showNotification = function (message) {
      const notification = document.getElementById("notification");
      notification.textContent = message;
      notification.style.display = "block";
      notification.classList.add("alert", "alert-success");
  
      // Automatically hide the notification after 3 seconds
      setTimeout(() => {
        notification.style.display = "none";
      }, 3000);
    };
  
    // Event listener for the "Add to Cart" button (no ID, but uses class)
    const addToCartButton = document.querySelector(".btn-outline-dark.flex-shrink-0");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", function () {
        // Retrieve dynamic product details from the data-* attributes
        const productDetails = document.getElementById("product-details");
        const productId = productDetails.dataset.id;
        const productName = productDetails.dataset.name;
        const productPrice = parseFloat(productDetails.dataset.price);
        const productImage = productDetails.dataset.image;
        const productQuantity = parseInt(document.getElementById("inputQuantity").value);
  
        // Validate quantity
        if (isNaN(productQuantity) || productQuantity <= 0) {
          alert("Please enter a valid quantity.");
          return;
        }
  
        // Create product object
        const product = {
          id: productId,
          name: productName,
          price: productPrice,
          quantity: productQuantity,
          image: productImage,
        };
  
        // Add product to the cart using the function from logic.js
        addToCartHandler(product);
      });
    }
  
    // Use the reusable function to set up the cart button redirect to checkout page
    setupCartButtonRedirect("cart-button", "../checkout.html");
  });