const shoppingCart = [
  { product: 'bread', quantity: 6 },
  { product: 'pizza', quantity: 2 },
  { product: 'milk', quantity: 4 },
  { product: 'water', quantity: 10 },
];

const allowedProducts = {
  lisbon: 5,
  others: 7,
};

const checkAllowedProducts = function (cart, numAllowed, city) {
  if (!cart.length) return [];

  const allowed = numAllowed[city] > 0 ? numAllowed[city] : numAllowed.others;

  const newCart = cart.map(item => {
    const { product, quantity } = item;
    return {
      product,
      quantity: quantity > allowed ? allowed : quantity,
    };
  });

  return newCart;
};
const allowedCart = checkAllowedProducts(
  shoppingCart,
  allowedProducts,
  'lisbon'
);
console.log(allowedCart);

const createOrderDescription = function (cart) {
  const [{ product, quantity }] = cart;

  return `Order with ${quantity} ${product}${
    cart.length > 1 ? ', etc...' : '.'
  }`;
};
const orderDescription = createOrderDescription(allowedCart);

console.log(orderDescription);
