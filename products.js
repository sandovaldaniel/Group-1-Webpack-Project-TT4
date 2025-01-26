
const productCards = document.querySelectorAll('.product-card');


productCards.forEach(card => {
  card.addEventListener('click', () => {
    const productName = card.getAttribute('data-product-name');
    alert(`Product selected: ${productName}`);
  });
});