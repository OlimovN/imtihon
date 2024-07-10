document.addEventListener("DOMContentLoaded", displayCart);

function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let totalOldPrice = 0;

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Savatcha bo'sh.</p>";
    document.getElementById(
      "totalOldPrice"
    ).textContent = `$${totalOldPrice.toFixed(2)}`;
    return;
  }

  cartItems.forEach((cartItem) => {
    const itemHtml = `
      <div class="item">
        <img src="${cartItem.image}" alt="${cartItem.name}">
        <div class="info">
          <h3>${cartItem.name}</h3>
          <p>Narx: $${cartItem.newPrice.toFixed(2)}</p>
          <p style="text-decoration: line-through;">Eski narx: $${cartItem.oldPrice.toFixed(
            2
          )}</p>
          <p>Kategoriya: ${cartItem.category}</p>
          <div class="quantity">
            <label for="quantity-${cartItem.id}">Soni:</label>
            <input type="number" id="quantity-${
              cartItem.id
            }" name="quantity" value="${cartItem.quantity}" min="1">
            <button onclick="updateQuantity(${cartItem.id})">Yangilash</button>
          </div>
          <button onclick="removeFromCart(${cartItem.id})">O'chirish</button>
        </div>
      </div>
    `;
    cartItemsContainer.innerHTML += itemHtml;

    totalOldPrice += cartItem.oldPrice * cartItem.quantity;
    document.getElementById(
      "totalOldPrice"
    ).textContent = `$${totalOldPrice.toFixed(2)}`;
  });
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function updateQuantity(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const newQuantity = parseInt(quantityInput.value);

  if (isNaN(newQuantity) || newQuantity < 1) {
    alert("Iltimos, to'g'ri miqdorni kiriting.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    cart[productIndex].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}

function goToCart() {
  window.location.href = "cart.html";
}
