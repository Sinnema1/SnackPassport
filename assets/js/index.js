let currentIndex = 0;
const itemsPerPage = 3; // Define the number of items per page

function moveCarousel(direction) {
    const items = document.querySelector('.carousel-items');
    if (!items) {
        console.error('Carousel items container not found.');
        return;
    }

    const totalItems = items.children.length;
    if (totalItems === 0) {
        console.error('No items found in the carousel.');
        return;
    }

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = Math.ceil(totalItems / itemsPerPage) - 1;
    } else if (currentIndex >= Math.ceil(totalItems / itemsPerPage)) {
        currentIndex = 0;
    }

    const offset = -(currentIndex * (100 / itemsPerPage));
    items.style.transform = `translateX(${offset}%)`;
}
document.addEventListener('DOMContentLoaded', () => {
    // Set up the cart button redirect
    setupCartButtonRedirect();
});