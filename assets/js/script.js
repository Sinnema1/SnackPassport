let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelector('.carousel-items');
    const totalItems = items.children.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = Math.ceil(totalItems / 3) - 1;
    } else if (currentIndex >= Math.ceil(totalItems / 3)) {
        currentIndex = 0;
    }

    const offset = -(currentIndex * (100 / 3));
    items.style.transform = `translateX(${offset}%)`;
}