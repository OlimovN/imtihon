document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
});

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-container");

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Savatchangiz bo'sh.</p>";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (product, index) => `
    <div class="cart-item">
      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3>${product.name}</h3>
        <div class="price">
          <span class="new-price">Narx: $${product.newPrice.toFixed(2)}</span>
          <span class="old-price">Eski narx: $${product.oldPrice.toFixed(
            2
          )}</span>
        </div>
        <div class="category">Kategoriya: ${product.category}</div>
        <div class="rating">
          Reyting: ${product.star}
          <div class="stars">
            ${"★".repeat(Math.round(product.star))}
            ${"☆".repeat(5 - Math.round(product.star))}
          </div>
        </div>
        <div class="quantity-container">
          <label for="quantity-${index}">Miqdori:</label>
          <input type="number" id="quantity-${index}" value="${
        product.quantity
      }" min="1" onchange="updateQuantity(${product.id}, this.value)">
        </div>
        <button onclick="removeFromCart(${
          product.id
        })" class="remove-button"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `
    )
    .join("");
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((product) => product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

function updateQuantity(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((product) => product.id === productId);

  if (productIndex > -1) {
    cart[productIndex].quantity = parseInt(quantity, 10);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
  }
}

function goToCart() {
  window.location.href = "cart.html";
}
