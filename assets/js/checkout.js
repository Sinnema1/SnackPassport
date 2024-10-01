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
  // Function to display products on the checkout page
  function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
      productContainer.appendChild(productElement);
    });
  }

  // Function to calculate the total price of products
  function calculateTotalPrice(products) {
    return products.reduce((total, product) => total + product.price, 0);
  }

  // Function to display the total price on the checkout page
  function displayTotalPrice(totalPrice) {
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
  }

  // Retrieve products from local storage and display them
  const products = getLocalStorage('shoppingCart');
  displayProducts(products);

  // Calculate and display the total price
  const totalPrice = calculateTotalPrice(products);
  displayTotalPrice(totalPrice);

  // Store the total price in local storage
  setLocalStorage('totalPrice', totalPrice);

  // Retrieve and display the total price from local storage
  const storedTotalPrice = getLocalStorage('totalPrice');
  displayTotalPrice(storedTotalPrice);
});
