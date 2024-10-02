// Create a function to render cart details across all pages
const renderCartDetails = function () {
  const cartDetails = calculateCartTotal();

  document.querySelector(".cart-total-items").textContent =
    cartDetails.totalItems;
  document.querySelector(
    ".cart-total-price"
  ).textContent = `$${cartDetails.totalPrice}`;
};

// Create a form validation function
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

// Create a function that will read from local storage and return the data. If no data exists, return an empty array.
const getLocalStorage = function (key = "data") {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

// Create a function that will write to local storage. This function should accept an array of objects and write the data to local storage.
const setLocalStorage = function (key = "data", data) {
  localStorage.setItem(key, JSON.stringify(data));
};

// Create a function to calculate the total price and number of items in the cart
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
  
    const product = cart.find((item) => item.id === productId);
  
    if (product) {
      product.quantity = newQuantity;
      setLocalStorage("cart", cart);
    } else {
      console.error(`Product with ID ${productId} not found in the cart`);
    }
  };

// ! Use the following function whenever you need to redirect to a different page

const redirectPage = function (url, homePageUrl = 'home.html') {
    if (url && typeof url === "string") {
      location.assign(url);
    } else {
      console.error("Invalid URL, defaulting to homepage.");
      location.assign(homePageUrl); // Default redirect to the homepage
    }
  };