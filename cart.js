window.onload = function() {
    displayCartItems();
    updateCartCount();
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCount === 0) {
        cartCountElement.style.display = "none"; 
    } else {
        cartCountElement.style.display = "none"; 
    }
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");

    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                    <img src="${item.image}" width="50" alt="${item.name}">
                    <span>${item.name} - Nu ${item.price}</span>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" style="width: 50px; margin-left: 10px;">
                    <button onclick="removeFromCart(${index})" style="padding: 5px 10px; background-color: #FF5733; color: white; border: none; cursor: pointer;">Remove</button>
                </div>
            `;
            cartContainer.appendChild(div);
        });
    }
}

function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);  
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function proceedToCheckout() {
    window.location.href = "checkout.html";
}

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();  
}
