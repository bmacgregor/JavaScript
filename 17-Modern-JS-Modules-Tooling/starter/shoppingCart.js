// expoerting module
console.log('Exporting module - Shopping Cart');

// variables are scoped to the module, they're private outside of the module
const shippiingCost = 10;
export const cart = [];

// exporting the function
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart.`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// export defaults
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart.`);
}
