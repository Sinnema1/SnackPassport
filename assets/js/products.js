document.addEventListener("DOMContentLoaded", () => {
    // Use addToCart from logic.js to handle adding products to the cart
    const addToCartHandler = function (product) {
      addToCart(product); // Calls the addToCart function from logic.js
      alert("Product added to cart");
    };
  
    // Event listener for the "Add to Cart" button
    document.querySelector(".btn-outline-dark").addEventListener("click", function () {
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
      updateCartCount(); // Update cart count in the header (from logic.js)
    });
  });