'use strict';

/* const firstName = 'Bren';

function calcAge(birthYear) {
  const age = 2020 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // var millenial = true;
      const firstName = 'Abi'; // current scope varialbe names are found first, and are therefore used when found
      const str = `Oh, and you're also a Millenial, ${firstName}.`;
      console.log(str);


      output = 'NEW OUTPUT'; // manipulating an existing variable, which is later called outside of this scope
    }
    // console.log(str);  // can't reach non-var types
    // console.log(millenial); // CAN reach var types - they're FUNCTION scoped; var is old code
    // add(2, 3); // also can't reach this
    console.log(output);
  }

  printAge();

  return age;
}

calcAge(1984);
// console.log(age); // can't reach child-scoped variables
// printAge(); // also can't reach child-scoped functions
*/

/* ----------------------------------------------------- */

// VARIABLE HOISTING
/* console.log(me); // hoisted the VAR, but as NULL
//console.log(job); // can't hoist a LET
console.log(year); // can't hoist a CONST

var me = 'Bren';
let job = 'business analyst';
const year = 1984; */

/* ----------------------------------------------------- */

// FUNCTION HOISTING
/* console.log(addDecl(2, 3)); // can hoise a function declaration
console.log(addEpr(2, 3)); // can't hoist an expression - it's really a CONST variable
console.log(addArrow(2, 3)); // can't hoist an expression, even though it's a VAR - it's UNDEFINED (NULL)

function addDecl(a, b) {
  return a + b;
}

const addEpr = function (a, b) {
  console.log(addArrow);
  return a + b;
};

var addArrow = (a, b) => a + b; */

/* ----------------------------------------------------- */

// THIS KEYWORD
/* console.log(this); // global WINDOW object

const calcAge = function (birthYear) {
  console.log(2020 - birthYear);
  console.log(this); // undefined in STRICT mode, but is the THIS belonging to the function
};

calcAge(1984);

const calcAgeArrow = birthYear => {
  console.log(2020 - birthYear);
  console.log(this); // global WINDOW again in an ARROW FUNCTION - arrow's don't get their own THIS
};

calcAgeArrow(1984); */

/* const bren = {
  firstName: 'Bren',
  birthYear: 1984,
  calcAge: function () {
    console.log(this); // points to the BREN object
    console.log(2020 - this.birthYear); // leveraging THIS object's birthYear value
  },

  greet: () => console.log(`Hi ${this.firstName}, from greet`), // again, arrow functions don't get to use THIS keyword, and instead uses the global THIS.  If we had a global firstName variable, the global value would be used instead, so be careful here!

  greet2: function () {
    console.log(`Hi ${this.firstName}, from greet2`); // a declared function DOES have access to the scoped THIS, as we will see below
  },

  calcAge2: function () {
    console.log(this); // points to the BREN object
    console.log(2020 - this.birthYear); // leveraging THIS object's birthYear value

    const isMillenial = function () {
      console.log(this.birthYear >= 1981 && this.birthYear <= 1996); // THIS keyword is undefined within this method - it's being called by calcAge2, and not by bren
    };

    isMillenial();
  },

  calcAge3: function () {
    const self = this; // grabbing THIS from the BREN scope

    // console.log(this); // points to the BREN object
    // console.log(2020 - this.birthYear); // leveraging THIS object's birthYear value

    const isMillenial2 = function () {
      console.log(
        self.birthYear >= 1981 && self.birthYear <= 1996
          ? `${self.firstName} is a millenial.`
          : `${self.firstName} is NOT a millenial.`
      ); // using the SELF variable from the parent function, which points to the scoped object's THIS
    };

    // isMillenial2();

    const isMillenial3 = () => {
      console.log(
        self.birthYear >= 1981 && self.birthYear <= 1996
          ? `${self.firstName} is a millenial.`
          : `${self.firstName} is NOT a millenial.`
      ); // using the SELF variable from the parent function, which points to the scoped object's THIS
    };

    isMillenial3(); // the arrow function in this case uses the THIS from its PARENT SCOPE, it gets inherited, so no need to use a self variable, pointing to the parent's THIS
  },
}; */

// bren.calcAge();
// bren.calcAge2();
// bren.calcAge3();
// bren.greet(); // so when we call the arrow function, we get back a NULL value for firstName
// bren.greet2(); // but we get the scoped THIS from the declared function

/* const abi = {
  birthYear: 1985,
};

abi.calcAge = bren.calcAge; // borrowing the calcAge function from BREN
abi.calcAge(); // running the borrowed function, but using abi's birthYear due to THIS functionality

const func = bren.calcAge; // borrowing the calcAge function again
func(); // just a regular function call of the original calcAge! */

/* ----------------------------------------------------- */

/* const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 8, 12); // you can pass MORE arguments than is called for, but only in REGULAR functions, not in arrows!

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addArrow(3, 7, 9); // fails to run - can't pass uncalled for parameters
*/

/* ----------------------------------------------------- */

// PRIMITIVE TYPES
/* let age = 30;
let oldAge = age;
age = 31;

console.log(age, oldAge);

const me = {
  name: 'Bren',
  age: 36,
};

const friend = me; // creating a new variable that points to the same memory address tagged by the ME object
friend.age = 27; // pointer reference, overwrites BOTH age values because they both refer to the same address on the heap

console.log(`Friend Age: ${friend.age}, Me Age: ${me.age}`); */

/* ----------------------------------------------------- */

// PRIMITIVES VERSUS OBJECTS
// Primitive types
let lastName = 'Collins';
let maidenName = lastName;
lastName = 'MacGregor';

console.log(lastName, maidenName);

// Reference types
const abi = {
  firstName: 'Abi',
  lastName: 'Collins',
  age: '26',
};

const marriedAbi = abi;
marriedAbi.lastName = 'MacGregor'; // again, changing the object's last name changes the value in the heap
console.log('Before marriage:', abi);
console.log('Before marriage:', marriedAbi);

// Copying objects
const abi2 = {
  firstName: 'Abi',
  lastName: 'Collins',
  age: '26',
};

// object.assign only creates a shallow copy, and will NOT create NEW child objects of the copied parent (ex, arrays, child objects, etc.) - the children will still use reference pointers!
const marriedAbi2 = Object.assign({}, abi2); // creating a new address in memory (on the heap)
marriedAbi2.lastName = 'MacGregor'; // objects are pointing to seperate locations, and can be updated independantly now

console.log('Before marriage:', abi2);
console.log('Before marriage:', marriedAbi2);
