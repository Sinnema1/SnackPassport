// Utility Functions (Local Storage operations)

// Create a function to read from local storage and return the data. If no data exists, return an empty array.
const getLocalStorage = function (key = "data") {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Create a function that will write to local storage. This function should accept an array of objects and write the data to local storage.
const setLocalStorage = function (key = "data", data) {
  localStorage.setItem(key, JSON.stringify(data));
};

// Cart Operations (Adding, updating, and managing cart items)

// Create a function to add an item to the cart
const addToCart = function (product) {
  const cart = getLocalStorage("cart"); // assuming cart data is stored in local storage under "cart"

  // Check if product already exists in the cart
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // If the product exists, update the quantity
    existingProduct.quantity += 1;
  } else {
    // Otherwise, add the product to the cart
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage("cart", cart);
};

// Create a function to update the quantity of an item in the cart
const updateCartQuantity = function (productId, newQuantity) {
  const cart = getLocalStorage("cart");

  if (newQuantity <= 0) {
    console.error(`Invalid quantity: ${newQuantity}`);
    return;
  }

  const product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity = newQuantity;
    setLocalStorage("cart", cart);
  } else {
    console.error(`Product with ID ${productId} not found in the cart`);
  }
};

// Page Navigation

// Use the following function whenever you need to redirect to a different page
const redirectPage = function (url, homePageUrl = "index.html") {
  if (url && typeof url === "string") {
    location.assign(url);
  } else {
    console.error("Invalid URL, defaulting to homepage.");
    location.assign(homePageUrl); // Default redirect to the homepage
  }
};

// UI/Interaction Functions

// Create a function to update the cart count in the header
function updateCartCount() {
  const cart = getLocalStorage("cart") || [];
  const cartCount = cart.length;
  const cartButtonBadge = document.querySelector("#cart-button .badge");

  if (cartButtonBadge) {
    cartButtonBadge.textContent = cartCount;
  }
}

// Define the function to set up the cart button redirect
function setupCartButtonRedirect() {
  const cartButton = document.getElementById("cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      window.location.href = "checkout.html"; // Redirect to checkout.html
    });
  }
}

// Common Form Validation (Kept for future use on multiple pages)
const validateForm = function (form) {
  const inputs = form.querySelectorAll("input, select, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      isValid = false;
    } else {
      input.classList.remove("error");
    }
  });

  return isValid;
};
