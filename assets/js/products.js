document.addEventListener("DOMContentLoaded", () => {
  // Update the cart count when the page loads
  updateCartCount();

  // Use addToCart from logic.js to handle adding products to the cart
  const addToCartHandler = function (product) {
    addToCart(product); // Calls the addToCart function from logic.js
    alert("Product added to cart");
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
      updateCartCount(); // Update cart count in the header after adding the item
    });
  }

  // Use the reusable function to set up the cart button redirect to checkout page
  setupCartButtonRedirect("cart-button", "../checkout.html");
});