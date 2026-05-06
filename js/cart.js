function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD TO CART
function addToCart(name, price) {
  let cart = getCart();

  let item = cart.find((p) => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

// COUNT
function updateCartCount() {
  let cart = getCart();
  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  let el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

// CART PAGE
function renderCart() {
  let cart = getCart();
  let container = document.getElementById("cart-items");
  let totalEl = document.getElementById("total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-box">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>

        <div class="qty">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="remove" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
}

// CHANGE QUANTITY
function changeQty(index, change) {
  let cart = getCart();

  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
  updateCartCount();
}

// REMOVE
function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);

  saveCart(cart);
  renderCart();
  updateCartCount();
}

// LOAD
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});

function showBottomNotice(message) {
  let notice = document.getElementById("notice");

  notice.textContent = message;
  notice.classList.add("show");

  setTimeout(() => {
    notice.classList.remove("show");
  }, 1500);
}
