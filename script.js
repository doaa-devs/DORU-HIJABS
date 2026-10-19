let cart = [];

function addToCart(name, price) {
    const existingProduct = cart.find(function(product) {
        return product.name === name;
    });

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const product = {
            name: name,
            price: price,
            quantity: 1
        };

        cart.push(product);
    }

    updateCartCount();
    displayCart();
}
function updateCartCount() {
    let totalQuantity = 0;

    cart.forEach(function(product) {
        totalQuantity += product.quantity;
    });

    document.getElementById("cart-count").textContent = totalQuantity;
}
function removeFromCart(index) {
    cart.splice(index, 1);

    updateCartCount();
    displayCart();
}


function increaseQuantity(index) {
    cart[index].quantity += 1;

    updateCartCount();
    displayCart();
}


function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    updateCartCount();
    displayCart();
}
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    const cartPanel = document.querySelector(".cart-panel");

if (cart.length === 0) {
    cartPanel.style.display = "none";
} else {
    cartPanel.style.display = "";
}

    let total = 0;

    cart.forEach(function(product, index) {
        const item = document.createElement("div");

        item.classList.add("cart-item");

        const productTotal = product.price * product.quantity;

        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>
                <br>
                <span>${product.price} SAR × ${product.quantity}</span>
                <br>
                <span>Product Total: ${productTotal} SAR</span>
            </div>

            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${product.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>
            </div>

            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(item);

        total += productTotal;
    });

    cartTotal.textContent = total;
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Thank you for shopping with DORU HIJABS!");

    cart = [];

    document.getElementById("cart-count").textContent = 0;

    displayCart();
    document.querySelector(".cart").classList.remove("open");
}
let selectedProduct = {};

function openProductModal(name, price, image, description) {
    selectedProduct = {
        name: name,
        price: price
    };

    document.getElementById("modal-image").src = image;
    document.getElementById("modal-name").textContent = name;
    document.getElementById("modal-price").textContent = price + " SAR";
    document.getElementById("modal-description").textContent = description;

    document.getElementById("product-modal").style.display = "flex";
}

function closeProductModal() {
    document.getElementById("product-modal").style.display = "none";
}

document.getElementById("modal-cart-btn").addEventListener("click", function() {
    const quantity = Number(
        document.getElementById("product-quantity").value
    );

    for (let i = 0; i < quantity; i++) {
        addToCart(selectedProduct.name, selectedProduct.price);
    }

    closeProductModal();
});
const cartButton = document.querySelector(".cart");
const cartPanel = document.querySelector(".cart-panel");

cartButton.addEventListener("click", function(event) {

    if (cartPanel.contains(event.target)) {
        return;
    }

    if (cart.length > 0) {
        cartPanel.style.display = "block";
        cartButton.classList.add("open");
    }
});