document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = await fetchProduct(productId);
  displayProductDetail(product);
});

async function fetchProduct(productId) {
  try {
    const response = await fetch(`https://cars-pagination.onrender.com/products/${productId}`);
    if (!response.ok) {
      throw new Error("Mahsulotni topishda xatolik yuz berdi.");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Mahsulotni olishda xatolik yuz berdi:", error.message);
  }
}

function displayProductDetail(product) {
  const productDetailContainer = document.getElementById("product-detail-container");
  if (!product) {
    productDetailContainer.innerHTML = "<p>Mahsulot topilmadi.</p>";
    return;
  }
  const discountPrice = product.newPrice * 0.9;

  productDetailContainer.innerHTML = `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="price">
          <span class="new-price">Narx: $${product.newPrice.toFixed(2)}</span>
          <span class="old-price">Eski narx: $${product.oldPrice.toFixed(2)}</span>
        </div>
        <div class="discount-price">Chegirma narxi: $${discountPrice.toFixed(2)}</div>
        <div class="category">Kategoriya: ${product.category}</div>
        <div class="rating">
          Reyting: ${product.star}
          <div class="stars">
            ${"★".repeat(Math.round(product.star))}
            ${"☆".repeat(5 - Math.round(product.star))}
          </div>
        </div>
        <p>${product.description}</p>
        <p>Holat: ${product.status}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', '${product.image}', ${product.oldPrice}, ${product.newPrice}, '${product.category}', ${product.star})" class="add-to-cart-button">Savatchaga qo'shish</button>
      </div>
    </div>
  `;
}

function addToCart(id, name, image, oldPrice, newPrice, category, star) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.id === id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ id, name, image, oldPrice, newPrice, category, star, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Mahsulot savatchaga qo'shildi!");
}

function goToCart() {
  window.location.href = "cart.html";
}
