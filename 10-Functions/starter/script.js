'use strict';

// ------------------------------------------------------------------------------- //
// LESSON 136 - MORE CLOSURE EXAMPLES
// ------------------------------------------------------------------------------- //

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // g updates our empty variable - f - to be a function
// f(); // f then multiplies the locally scoped a variable, multiplies it by 2, and outputs to the console

h(); // f is then further reassigned
// f(); // and runs as a totally different function

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, wait * 1000);

  console.log(`We will start boarding in ${wait} seconds.`);
};

const perGroup = 1000;
// console.log('GLOBAL PerGroup ' + perGroup);
// boardPassengers(120, 2);
// console.log('GLOBAL PerGroup ' + perGroup);

// ------------------------------------------------------------------------------- //
// LESSON 135 - CLOSURES
// ------------------------------------------------------------------------------- //

// a closure isn't a feature that's explicitly used, instead, they happen automatically in certain situations
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passenger(s).`);
  };
};

// booker holds the child function of secureBooking
const booker = secureBooking();
// booker();
// booker();
// booker();
// console.dir(booker);

// ------------------------------------------------------------------------------- //
// LESSON 134 - IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
// ------------------------------------------------------------------------------- //

// sometimes, we need a one-off function that runs once and then goes away - we create a function and we DON'T assign it to any variable - we need to wrap the function in brackets.  We also call it immediately by putting some brackets at the end: })();
(function () {
  // console.log('This will only ever run once');
})();

// we can do the same for an arrow function:
// (() => console.log('This will also only ever run once'))();

// we can use this to cordon off variables, encapsulating the data within the one-off scope

{
  const isPrivate = 23;
  let otherPrivate = 24;
} // isPrivate is "locked" behind this scope, and isn't accessible from the outside - VAR breaks this pattern, so we generally use const and let

// console.log(isPrivate);
// console.log(otherPrivate);

// ------------------------------------------------------------------------------- //
// LESSON 132 - THE BIND METHOD
// ------------------------------------------------------------------------------- //

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}-${flightNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode}-${flightNum}`, name });
  },
};

const euroWings = {
  airline: 'EuroWings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// bind returns a new function, with *this* pointing to the newly bound function
const bookEW = book.bind(euroWings);
// bookEW(36, 'Jed');

const bookEWf23 = book.bind(euroWings, 23); // flight is pre-set to 23
// bookEWf23('Bren');
// console.log(...euroWings.bookings);

// Binding with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

// *this* is currently set to the button, so the below won't work as expected - we need to bind to the object
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// instead, because bind returns a new function, we bind the buyPlace call to lufthanse to dynamically associate the *this* with the object
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application of the bind method - pre-setting parameters
const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.05, 200));

const addGST = addTax.bind(null, 0.05);
// console.log(addGST(10));
// console.log(addGST(23));

// create a function that returns a function to do the tax thing
const addTax2 = function (tax) {
  return function (value) {
    return value * (1 + tax);
  };
};

const addGST2 = addTax2(0.23);
// console.log(addGST2(100));
// console.log(addGST2(23));

// ------------------------------------------------------------------------------- //
// LESSON 131 - THE CALL AND APPLY METHODS
// ------------------------------------------------------------------------------- //

const lufthansa2 = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}-${flightNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode}-${flightNum}`, name });
  },
};

// lufthansa.book(420, 'Brennan MacGregor');
// lufthansa.book(6969, 'Abi MacGregor');

const euroWings2 = {
  airline: 'EuroWings',
  iataCode: 'EW',
  bookings: [],
  //book: lufthansa.book,
};

const book2 = lufthansa2.book;

// leveraging the CALL METHOD to point *this* to the correct object
// book.call(euroWings, 23, 'Toby');
// book.call(lufthansa, 789, 'Bill');

// console.log(...euroWings.bookings);
// console.log(...lufthansa.bookings);

// leveraging the APPLY METHOD
const flightData = [420, 'George'];
// book.apply(euroWings, flightData);
// console.log(...euroWings.bookings);

// call with a split is the same as just using apply
// book.call(euroWings, ...flightData);

// ------------------------------------------------------------------------------- //
// LESSON 130 - FUNCTIONS RETURNING FUNCTIONS
// ------------------------------------------------------------------------------- //

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}!`);
  };
};

const greeterHi = greet('Hi');
// greeterHi('Bren');
// greeterHi('Abi');

// greet('Hello')('Bren');

const greetArrow = greeting => name => console.log(`${greeting} ${name}!`);
// greetArrow('Sup')('Bren');

// ------------------------------------------------------------------------------- //
// LESSON 129 - FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
// ------------------------------------------------------------------------------- //

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...rest] = str.split(' ');
  return [first.toUpperCase(), ...rest].join(' ');
};

// Higher-order function, which calls another function - it operates at a higher level of abstraction than the function it calls
const transformer = function (str, func) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${func(str)}`);
  console.log(`Transformed by: ${func.name}`);
};

const testString = 'there arE fOUr lights';

// calling transformer, passing a string and our CALLBACK function
// transformer(testString, upperFirstWord);
// transformer(testString, oneWord);

const highFive = function () {
  console.log('High five, bro!');
};

// document.body.addEventListener('click', highFive);

// ['Bren', 'Abi', 'Clash', 'Oz'].forEach(highFive);

// ------------------------------------------------------------------------------- //
// LESSON 128 - FIRST CLASS AND HIGHER ORDER FUNCTIONS (ONLY A LECTURE)
// ------------------------------------------------------------------------------- //

// functions are just another type of value in JavaScript - they're just another object
// Because of this, we can actually return a function from another function - this is a type of HIGHER ORDER function
// Additionally, functions that receives a function as an argument is ALSO a higher order function - event listeners are a good example of this

// ------------------------------------------------------------------------------- //
// LESSON 127 - PASSING ARGUMENTS - VALUES AND REFERENCES
// ------------------------------------------------------------------------------- //

const flight = 'LH234'; // flight is a string, so a primitive type
const passenger = {
  name: 'Brennan MacGregor',
  passport: 24739479284,
};

const checkIn = function (flightNum, passengerObj) {
  flightNum = 'LH999'; // so the reassignment is to a copy of the original, not the actual original - it's a temp variable
  passengerObj.name = 'Mr. ' + passengerObj.name; // however, the object is a reference type, so it points to an address in memory.  There's no temp created, we're writing to the same address

  // console.log(flightNum);

  console.log(
    passengerObj.passport === 24739479284 ? 'Check In' : 'Wrong passport!'
  );
};

// checkIn(flight, passenger);
// console.log(flight, passenger);

const newPassport = function (passengerObj) {
  // we're able to change the passport here because we're passing the object address, which then updates the passport number
  passengerObj.passport = Math.trunc(Math.random() * 100000000);
};

// console.log(passenger.passport);
// newPassport(passenger);
// console.log(passenger.passport);
// checkIn(flight, passenger); // and now the passport is wrong!

// ------------------------------------------------------------------------------- //

// CODING CHALLENGES

// CHALLENGE 1
/* Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter 'poll' object below.

Your tasks:
    1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
        1.1. Display a promptwindow for the user to input the number of the selected option. The prompt should look like this:
            What is your favourite programming language?
            0: JavaScript
            1: Python
            2: Rust
            3: C++
            (Write option number)
        
        1.2. Based on the input number, update the 'answers' arrayproperty. For example, if the option is 3, increase the value at position3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g.answer 52 wouldn't make sense, right?)
        
    2. Call this method whenever the user clicks the "Answer poll" button.
    
    3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
    
    4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
    
    5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?
        Test data for bonus:
            Data1: [5, 2, 3]
            Data2: [1, 5, 3, 9, 6, 1]
            
    Hints:Use many of the tools you learned about in this and the last section */

// BRUTALIST VERSION
const displayResults = function (type) {
  console.log(
    typeof type === 'string'
      ? `Poll results are ${poll.answer[0]}, ${poll.answer[1]}, ${poll.answer[2]}, ${poll.answer[3]}.`
      : poll.answer
  );
};

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0].  More on that in the next section!
  answer: new Array(4).fill(0),

  registerNewAnswer() {
    // use JOIN in the future!
    const pollAnswer = prompt(
      `${this.question}
    ${this.options[0]}
    ${this.options[1]}
    ${this.options[2]}
    ${this.options[3]}
    (Write option number)`
    );

    // better to use length of the array, rather than hardcoding it in
    if (pollAnswer <= 3 && typeof pollAnswer === 'number') {
      this.answer[pollAnswer]++;
    }

    displayResults(pollAnswer);
    displayResults(this.answer);
  },
};

/* document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); */

// NICE VERSION
const nicePoll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0].  More on that in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer2() {
    // get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    // short circuiting to add one to the answers array
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayNiceResults();
    this.displayNiceResults('string');
  },
  displayNiceResults(type = 'array') {
    if (type === 'array') {
      // console.log(this.answers);
    } else if (type === 'string') {
      // console.log(`Poll results are ${this.answers.join(', ')}.`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', nicePoll.registerNewAnswer2.bind(nicePoll));

// bonus - re-point *this* by using the call, and passing the new array inside of the new answers object
nicePoll.displayNiceResults.call({ answers: [5, 2, 3] });

// CHALLENGE 2

/* This is more of a thinking challenge than a coding challenge Your tasks:

  1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do notselect the h1 element again!
  
  2. And now explain to yourself (or someone around you) why this worked! Take all the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example */

// this function runs immediately onLoad
(function () {
  const header = document.querySelector('h1'); // we save the header in a local variable
  header.style.color = 'red'; // and then update the h1's colour to red

  // but in the same function that runs onLoad, we ALSO add a querySelector to the body, and add an eventListener to the click event
  document.querySelector('body').addEventListener('click', function () {
    // and when this fires, the header colour gets updated to white - this just looks nicer than the blue
    header.style.color = 'white';
  });
})();

// the reason we're able to do this using an IIFE is because - even though the function only runs once onLoad - we've saved not only the header local variable in the body element of the page's "backpack" but we've also saved the onClickEvent listener and the associated function.  This is all handled through the use of a closure, which just happens automatically
