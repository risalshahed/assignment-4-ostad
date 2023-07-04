import products from './product.js';
import * as cart from './cart.js';

document.addEventListener("DOMContentLoaded", () => {
  const productButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const clearButton = document.querySelector(".clear-button");

  productButtons.forEach(button => {
    button.addEventListener("click", event => {
      const productId = event.target.dataset.productId;
      const product = products.find(item => item.id === productId);

      cart.addToCart(productId, product.name, product.price);
      updateCart();
    });
  });

  clearButton.addEventListener("click", () => {
    cart.clearCart();
    updateCart();
  });

  function updateCart() {
    cartItemsElement.innerHTML = "";
    let total = 0;

    const cartItems = cart.getCartItems();
    const len = cartItems.length;

    for (let i = 0; i < len; i++) {
      const item = cartItems[i];
      const itemTotal = item.price * item.quantity;

      cartItemsElement.innerHTML += `
        <div>
          ${item.name} | (Quantity: <b>${item.quantity}</b>) | Unit: <b>$${item.price}</b> | Total: <b>$${itemTotal}</b>
          <button data-product-id="${item.productId}" class="increase-quantity">+</button>
          <button data-product-id="${item.productId}" class="decrease-quantity">-</button>
          <button data-product-id="${item.productId}" class="remove-item">x</button>
        </div>
      `;

      total += itemTotal;
    }

    totalElement.innerHTML = `Grand Total: <strong>$${total}</strong>`;

    const increaseQuantityButtons = document.querySelectorAll(".increase-quantity");
    const decreaseQuantityButtons = document.querySelectorAll(".decrease-quantity");
    const removeItemButtons = document.querySelectorAll(".remove-item");

    increaseQuantityButtons.forEach(button => {
      button.addEventListener("click", event => {
        const productId = event.target.dataset.productId;
        cart.increaseQuantity(productId);
        updateCart();
      });
    });

    decreaseQuantityButtons.forEach(button => {
      button.addEventListener("click", event => {
        const productId = event.target.dataset.productId;
        cart.decreaseQuantity(productId);
        updateCart();
      });
    });

    removeItemButtons.forEach(button => {
      button.addEventListener("click", event => {
        const productId = event.target.dataset.productId;
        cart.removeCartItem(productId);
        updateCart();
      });
    });
  }

  updateCart();
});