let cartItems = [];

function addToCart(productId, productName, productPrice, ...quantities) {
  const existingItem = cartItems.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantities.length > 0 ? quantities.reduce((sum, quantity) => sum + quantity) : 1;
  } else {
    const quantity = quantities.length > 0 ? quantities.reduce((sum, quantity) => sum + quantity) : 1;
    cartItems.push({
      productId,
      name: productName,
      price: productPrice,
      quantity
    });
  }
}

function removeCartItem(productId) {
  cartItems = cartItems.filter(item => item.productId !== productId);
}

function increaseQuantity(productId) {
  const item = cartItems.find(item => item.productId === productId);

  if (item) {
    item.quantity++;
  }
}

function decreaseQuantity(productId) {
  const item = cartItems.find(item => item.productId === productId);

  if (item && item.quantity > 1) {
    item.quantity--;
  }
}

function clearCart() {
  cartItems = [];
}

function getCartItems() {
  return cartItems;
}

export {
  addToCart,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  getCartItems
};