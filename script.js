/* =========================
   SHIVA OUTDOOR STORE
   Owner: Shiva Meghwall
========================= */


/* PRODUCTS */

const products = [

  {
    id: 1,
    name: "Camping Tent",
    category: "camping",
    price: 2499,
    icon: "⛺",
    description: "Comfortable tent for outdoor camping."
  },

  {
    id: 2,
    name: "Hiking Backpack",
    category: "accessories",
    price: 1799,
    icon: "🎒",
    description: "Durable backpack for hiking and travel."
  },

  {
    id: 3,
    name: "Sports Shoes",
    category: "sports",
    price: 2199,
    icon: "👟",
    description: "Comfortable shoes for outdoor activities."
  },

  {
    id: 4,
    name: "LED Flashlight",
    category: "accessories",
    price: 599,
    icon: "🔦",
    description: "Compact rechargeable outdoor flashlight."
  },

  {
    id: 5,
    name: "Camping Bottle",
    category: "camping",
    price: 449,
    icon: "🧴",
    description: "Reusable bottle for outdoor adventures."
  },

  {
    id: 6,
    name: "Sports Gloves",
    category: "sports",
    price: 699,
    icon: "🧤",
    description: "Comfortable protective sports gloves."
  },

  {
    id: 7,
    name: "Outdoor Jacket",
    category: "clothing",
    price: 1999,
    icon: "🧥",
    description: "Lightweight jacket for outdoor trips."
  },

  {
    id: 8,
    name: "Camping Sleeping Bag",
    category: "camping",
    price: 1499,
    icon: "🛌",
    description: "Warm and comfortable sleeping bag."
  }

];


/* CART */

let cart = JSON.parse(localStorage.getItem("shivaCart")) || [];


/* ELEMENTS */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const orderBtn = document.getElementById("orderBtn");

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("themeBtn");


/* FORMAT PRICE */

function formatPrice(price) {

  return "₹" + price.toLocaleString("en-IN");

}


/* DISPLAY PRODUCTS */

function displayProducts(list = products) {

  productGrid.innerHTML = "";

  if (list.length === 0) {

    productGrid.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;padding:40px;">
        No products found.
      </p>
    `;

    return;
  }


  list.forEach(product => {

    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image">
        ${product.icon}
      </div>

      <div class="product-info">

        <span class="category">
          ${product.category}
        </span>

        <h3>
          ${product.name}
        </h3>

        <p>
          ${product.description}
        </p>

        <div class="product-bottom">

          <span class="price">
            ${formatPrice(product.price)}
          </span>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            Add +
          </button>

        </div>

      </div>

    `;

    productGrid.appendChild(card);

  });

}


/* SEARCH + FILTER */

function filterProducts() {

  const search = searchInput.value.toLowerCase().trim();

  const category = categoryFilter.value;


  const filtered = products.filter(product => {

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return matchesSearch && matchesCategory;

  });


  displayProducts(filtered);

}


searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);


/* ADD TO CART */

function addToCart(productId) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;


  const existing = cart.find(
    item => item.id === productId
  );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  saveCart();

  updateCart();

  openCart();

}


/* REMOVE FROM CART */

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart();

  updateCart();

}


/* SAVE CART */

function saveCart() {

  localStorage.setItem(
    "shivaCart",
    JSON.stringify(cart)
  );

}


/* UPDATE CART */

function updateCart() {

  cartItems.innerHTML = "";


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty.
      </p>
    `;

  }


  let total = 0;
  let count = 0;


  cart.forEach(item => {

    total += item.price * item.quantity;

    count += item.quantity;


    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

      <div class="cart-item-icon">
        ${item.icon}
      </div>

      <div class="cart-item-info">

        <h4>
          ${item.name}
        </h4>

        <p>
          ${formatPrice(item.price)}
          × ${item.quantity}
        </p>

      </div>

      <button
        class="remove-item"
        onclick="removeFromCart(${item.id})"
      >
        ✕
      </button>

    `;


    cartItems.appendChild(div);

  });


  cartCount.textContent = count;

  cartTotal.textContent = formatPrice(total);

}


/* OPEN CART */

function openCart() {

  cartPanel.classList.add("open");

  cartOverlay.classList.add("open");

}


/* CLOSE CART */

function closeCartPanel() {

  cartPanel.classList.remove("open");

  cartOverlay.classList.remove("open");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener(
  "click",
  closeCartPanel
);

cartOverlay.addEventListener(
  "click",
  closeCartPanel
);


/* ORDER INQUIRY */

orderBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;

  }


  let message =
    "Hello Shiva Outdoor!%0A%0A" +
    "I am interested in these products:%0A%0A";


  let total = 0;


  cart.forEach(item => {

    message +=
      "• " +
      item.name +
      " × " +
      item.quantity +
      " - " +
      formatPrice(item.price * item.quantity) +
      "%0A";

    total += item.price * item.quantity;

  });


  message +=
    "%0ATotal: " +
    formatPrice(total) +
    "%0A%0A" +
    "Please provide more information.";


  /*
    Replace the number below with the store owner's
    WhatsApp number, including country code.

    Example:
    919876543210
  */

  const phoneNumber = "919999999999";


  const url =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    message;


  window.open(url, "_blank");

});


/* CONTACT FORM */

document
  .getElementById("contactForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
      document.getElementById("name").value;

    const email =
      document.getElementById("email").value;

    const message =
      document.getElementById("message").value;


    const subject =
      encodeURIComponent(
        "Website Inquiry - Shiva Outdoor"
      );


    const body =
      encodeURIComponent(
        "Name: " +
        name +
        "\nEmail: " +
        email +
        "\n\nMessage:\n" +
        message
      );


    window.location.href =
      "mailto:YOUR_EMAIL@example.com" +
      "?subject=" +
      subject +
      "&body=" +
      body;

  });


/* MOBILE MENU */

menuBtn.addEventListener("click", () => {

  navbar.classList.toggle("active");

});


document.querySelectorAll("#navbar a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navbar.classList.remove("active");

    });

  });


/* DARK MODE */

const savedTheme =
  localStorage.getItem("shivaTheme");


if (savedTheme === "dark") {

  document.body.classList.add("dark");

  themeBtn.textContent = "☀️";

}


themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");


  const dark =
    document.body.classList.contains("dark");


  localStorage.setItem(
    "shivaTheme",
    dark ? "dark" : "light"
  );


  themeBtn.textContent =
    dark ? "☀️" : "🌙";

});


/* INITIALIZE */

displayProducts();

updateCart();
