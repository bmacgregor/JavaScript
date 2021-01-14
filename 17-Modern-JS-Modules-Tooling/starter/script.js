// import cloneDeep from 'lodash-es'; // parcel doesn't need the full path!
// import cloneDeep from 'lodash'; // parcel can also install stuff for us if it's on npm!
import 'core-js/stable'; // for polyfilling
import 'regenerator-runtime/runtime'; // polyfilling async functions

// page doesn't reload, parcel code
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
// LECTURE 274 - LETS FIX SOME BAD CODE!
///////////////////////////////////////
const lecture274 = function () {};
lecture274();

///////////////////////////////////////
// LECTURE 273 - MODERN, CLEAN, AND DECLARATIVE JAVASCRIPT PROGRAMMING
///////////////////////////////////////
const lecture273 = function () {
  // review lecture on writing clean code
  // write readable code, so that others can understand it (including your future self!)
  // use descriptive names, according to what they contain (variables) or do (functions)
  // don't repeat yourself, refactor stuff
  // don't use global if it can be avoided - don't use VAR
  // use strong typechecking (=== and !==)
  //
  // FUNCTIONS
  // functions should only do ONE thing
  // avoid using more than three parameters; use default parameters when possible
  //
  // OOP IN JAVASCRIPT
  // use ES6 classes
  // avoid arrow functions in class objects
  //
  // AVOID NESTED CODE
  // use guard clauses
  // use ternary operators and logical operators
  // use multiple if statements, instead of if/else chains
  //
  // ASYNCHRONOUS CODE
  // consume promises using async/await
  //
};
// lecture273();

///////////////////////////////////////
// LECTURE 272 - CONFIGURING BABEL AND POLYFILLING
///////////////////////////////////////
const lecture272 = function () {
  console.log('still works');

  // added core-js/stable and regenerator-runtime to imports
};
// lecture272();

///////////////////////////////////////
// LECTURE 271 - BUNDLING WITH PARCEL AND NPM SCRIPTS
///////////////////////////////////////
const lecture271 = function () {
  console.log('Live reload working with parcel!');
};
// lecture271();

///////////////////////////////////////
// LECTURE 270 - INTO TO NPM
///////////////////////////////////////
const lecture270 = function () {
  // do not include the node_modules folder in source control!
  // just re-install the dependencies using [npm i] in the console

  // import cloneDeep from '../../node_modules/lodash-es/cloneDeep.js';

  const state = {
    cart: [
      { product: 'bread', quantity: 5 },
      { product: 'pizza', quantity: 2 },
    ],
    user: { loggedIn: true },
  };

  const stateClone = Object.assign({}, state);
  console.log(state);
  console.log(stateClone);

  state.user.loggedIn = false;
  console.log(stateClone.user);

  const stateDeepClone = cloneDeep(state);
  console.log(stateDeepClone);
  state.user.loggedIn = true;
  console.log(stateDeepClone.user);
};
// lecture270();

///////////////////////////////////////
// LECTURE 269 - BRIEF INTRO TO COMMAND LINE
///////////////////////////////////////
const lecture269 = function () {
  // open up a new terminal in VS Code
  // you are ALWAYS in a folder in command line
  // [dir] shows the directory
  // [cd] changes the directoty
  // [cd ..] to move up one level
  // use [cd] and tab completion to make life easier
  // to move two levels [cd ../..]
  // [clear] the console
  // to create a new folder [mkdir folderName]
  // to create a file [New-Item fileName]
  // to create multiple files [NewItem -ItemType "file" fileOne.js, fileTwo.txt, fileThree.jpeg]
  // to delete a file [Remove-Item fileName]
  // moving a file [mv fileName DESTINATION]
  // deleting a folder [rmdir folderName]
};
// lecture269();

///////////////////////////////////////
// LECTURE 268 - COMMOM JAVASCRIPT MODULES
///////////////////////////////////////
const lecture268 = function () {
  // Export in node JS
  /*export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to the cart.`);
  };

// Importing
const {addToCart} = require('./shoppingCart.js');*/
};
// lecture268();

///////////////////////////////////////
// LECTURE 267 - THE MODULE PATTERN
///////////////////////////////////////
const lecture267 = function () {
  const ShoppingCart2 = (function () {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function (product, quantity) {
      cart.push({ product, quantity });
      console.log(`${quantity} ${product} was added to the cart.`);
    };

    const orderStock = function (product, quantity) {
      cart.push({ product, quantity });
      console.log(`${quantity} ${product} ordered from supplier.`);
    };

    // returning an object
    return {
      addToCart,
      cart,
      totalPrice,
      totalQuantity,
    };
  })(); // iffy function which only runs once, onLoad

  ShoppingCart2.addToCart('apple', 4);
  ShoppingCart2.addToCart('pizza', 2);
  console.log(ShoppingCart2.cart);
};
// lecture267();

///////////////////////////////////////
// LECTURE 266 - EXPORTING AND IMPORTING IN ES6 MODULES
///////////////////////////////////////
const lecture266 = function () {
  // importing a module, providing aliases
  // import { addToCart, totalPrice as price, tq, cart } from './shoppingCart.js';

  // importing everying from a module
  // import * as ShoppingCart from './shoppingCart.js';

  // importing the default
  // import add from './shoppingCart.js';

  // import statement runs furst
  console.log('Importing module - script.js');

  addToCart('bread', 5);
  console.log(price, tq);

  ShoppingCart.addToCart('pasta', 2);

  add('pizza', 4);

  // objects are live, so as stuff is being added to the cart in the module, we see the stuff in the script file
  console.log(cart);
};
// lecture266();

///////////////////////////////////////
// LECTURE 265 - OVERVIEW OF MODULES IN JAVASCRIPT
///////////////////////////////////////
const lecture265 = function () {
  // just a lecture on modules
};
// lecture265();

///////////////////////////////////////
// LECTURE 264 - OVERVIEW OF MODERN JAVASCRIPT DEVELOPMENT
///////////////////////////////////////
const lecture264 = function () {
  // just a lecture on solution development and import
};
// lecture264();
