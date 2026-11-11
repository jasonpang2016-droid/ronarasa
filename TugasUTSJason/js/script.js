const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const CART_STORAGE_KEY = "rona-rasa-cart";
const WHATSAPP_NUMBER = "";
const SHIPPING_FEE = 15000;
const MAX_QUANTITY = 99;

const products = {
  "sambal-bawang": { name: "Sambal Bawang Nenek", price: 28000 },
  "sambal-matah": { name: "Sambal Matah Senja", price: 30000 },
  "sambal-cumi": { name: "Sambal Cumi Pesisir", price: 38000 },
  "bumbu-dasar": { name: "Bumbu Dasar Nusantara", price: 22000 },
  "bumbu-gulai": { name: "Bumbu Gulai Lembayung", price: 24000 },
  "bumbu-ungkep": { name: "Bumbu Ungkep Kuning", price: 22000 },
  "tote-bag": { name: "Tote Bag Cerita Rasa", price: 45000 }
};

const formatRupiah = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);

function showStatus(message) {
  document.querySelectorAll(".cart-feedback, [data-order-status]").forEach((element) => {
    element.textContent = message;
  });
}

function readCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(savedCart)) {
      throw new TypeError("Format keranjang tidak valid.");
    }

    return savedCart.filter((item) =>
      item &&
      Object.hasOwn(products, item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    ).map(({ id, quantity }) => ({ id, quantity: Math.min(quantity, MAX_QUANTITY) }));
  } catch (error) {
    console.error("Keranjang tidak dapat dibaca dari penyimpanan browser.", error);
    showStatus("Keranjang tersimpan tidak dapat dibaca. Silakan tambahkan kembali produk.");
    return [];
  }
}

let cart = readCart();

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Keranjang tidak dapat disimpan di browser.", error);
    showStatus("Penyimpanan browser tidak tersedia; keranjang hanya bertahan selama halaman ini terbuka.");
  }
  renderCart();
}

function addToCart(productId) {
  if (!Object.hasOwn(products, productId)) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity >= MAX_QUANTITY) {
      showStatus(`Batas pesanan ${MAX_QUANTITY} untuk ${products[productId].name}.`);
      return;
    }
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  showStatus(`${products[productId].name} ditambahkan ke keranjang.`);
}

function updateCartItem(productId, action) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  if (action === "remove" || (action === "decrease" && item.quantity === 1)) {
    cart = cart.filter((entry) => entry.id !== productId);
  } else if (action === "decrease") {
    item.quantity -= 1;
  } else if (action === "increase" && item.quantity < MAX_QUANTITY) {
    item.quantity += 1;
  }

  saveCart();
}

function createCartButton(text, action, productId, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = action === "remove" ? "cart-remove" : "quantity-button";
  button.dataset.cartAction = action;
  button.dataset.productId = productId;
  button.setAttribute("aria-label", label);
  button.textContent = text;
  return button;
}

function renderCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = String(count);
    element.setAttribute("aria-label", `${count} produk di keranjang`);
  });

  const itemsContainer = document.querySelector("[data-cart-items]");
  if (!itemsContainer) return;

  itemsContainer.replaceChildren();
  let subtotal = 0;

  cart.forEach(({ id, quantity }) => {
    const product = products[id];
    if (!product) return;
    const lineTotal = product.price * quantity;
    subtotal += lineTotal;

    const row = document.createElement("article");
    row.className = "cart-item";
    const details = document.createElement("div");
    details.className = "cart-item-details";
    const name = document.createElement("h3");
    name.textContent = product.name;
    const unitPrice = document.createElement("p");
    unitPrice.textContent = `${formatRupiah(product.price)} / item`;
    details.append(name, unitPrice);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";
    controls.append(
      createCartButton("−", "decrease", id, `Kurangi ${product.name}`),
      Object.assign(document.createElement("span"), { textContent: String(quantity) }),
      createCartButton("+", "increase", id, `Tambah ${product.name}`)
    );

    const total = document.createElement("strong");
    total.className = "cart-line-total";
    total.textContent = formatRupiah(lineTotal);
    const remove = createCartButton("Hapus", "remove", id, `Hapus ${product.name} dari keranjang`);
    row.append(details, controls, total, remove);
    itemsContainer.append(row);
  });

  const shipping = count ? SHIPPING_FEE : 0;
  const empty = document.querySelector("[data-cart-empty]");
  if (empty) empty.hidden = count > 0;
  itemsContainer.hidden = count === 0;

  const subtotalElement = document.querySelector("[data-subtotal]");
  const shippingElement = document.querySelector("[data-shipping]");
  const totalElement = document.querySelector("[data-total]");
  if (subtotalElement) subtotalElement.textContent = formatRupiah(subtotal);
  if (shippingElement) shippingElement.textContent = formatRupiah(shipping);
  if (totalElement) totalElement.textContent = formatRupiah(subtotal + shipping);
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Buka menu" : "Tutup menu");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
      navigation.classList.remove("is-open");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.addToCart));
});

const productSelect = document.querySelector("#product-select");
if (productSelect) {
  Object.entries(products).forEach(([id, product]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `${product.name} — ${formatRupiah(product.price)}`;
    productSelect.append(option);
  });
}

const addProductForm = document.querySelector(".add-product-form");
if (addProductForm && productSelect) {
  addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addToCart(productSelect.value);
    productSelect.value = "";
  });
}

const cartItems = document.querySelector("[data-cart-items]");
if (cartItems) {
  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (button) updateCartItem(button.dataset.productId, button.dataset.cartAction);
  });
}

document.querySelector("[data-clear-cart]")?.addEventListener("click", () => {
  cart = [];
  saveCart();
  showStatus("Keranjang sudah dikosongkan.");
});

renderCart();

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Terima kasih! Ini hanya demo; pesan belum dikirim.";
    contactForm.reset();
  });
}

const checkoutForm = document.querySelector(".checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!cart.length) {
      showStatus("Tambahkan minimal satu produk sebelum mengirim pesanan.");
      return;
    }

    if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
      showStatus("Nomor WhatsApp usaha belum diatur. Isi WHATSAPP_NUMBER di js/script.js terlebih dahulu.");
      return;
    }

    const formData = new FormData(checkoutForm);
    const lines = cart.map(({ id, quantity }) => {
      const product = products[id];
      return `- ${product.name} x${quantity}: ${formatRupiah(product.price * quantity)}`;
    });
    const subtotal = cart.reduce((total, item) => total + products[item.id].price * item.quantity, 0);
    const total = subtotal + SHIPPING_FEE;
    const message = [
      "Halo Rona Rasa, saya ingin memesan:",
      ...lines,
      `Subtotal: ${formatRupiah(subtotal)}`,
      `Estimasi ongkir: ${formatRupiah(SHIPPING_FEE)}`,
      `Estimasi total: ${formatRupiah(total)}`,
      "",
      `Nama: ${formData.get("nama")}`,
      `Nomor WhatsApp: ${formData.get("telepon")}`,
      `Alamat: ${formData.get("alamat")}`,
      `Catatan: ${formData.get("catatan") || "-"}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    showStatus("Rincian pesanan dibuka di WhatsApp. Periksa kembali lalu tekan Kirim di WhatsApp.");
  });
}
