document.addEventListener("DOMContentLoaded", fetchProducts);

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://cars-pagination.onrender.com/products"
    );
    const data = await response.json();
    const productsSlice = data.slice(0, );
    displayProducts(productsSlice);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="category">Category: ${product.category}</div>
            <div class="new-price">New Price: $${product.newPrice.toFixed(
              2
            )}</div>
            <div class="old-price">Old Price: $${product.oldPrice.toFixed(
              2
            )}</div>
            <div class="rating">
                Rating: ${product.star}
                <span class="stars">${"★".repeat(Math.round(product.star))}
                ${"☆".repeat(5 - Math.round(product.star))}</span>
            </div>
            <button onclick="viewProduct(${product.id})">View Details</button>
        `;
    productsContainer.appendChild(productCard);
  });
}

function viewProduct(productId) {
  window.location.href = `detail.html?id=${productId}`;
}

document
  .getElementById("price-filter")
  .addEventListener("change", filterProductsByPrice);

function filterProductsByPrice() {
  const priceRange = document.getElementById("price-filter").value;
 
}
