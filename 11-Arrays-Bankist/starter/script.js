'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// Variables
const accounts = [account1, account2, account3, account4];
const eurToUsd = 1.1;
let currentAccount;
let sortedState = false;

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Functions
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outgoing = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1) // no interest added on values below 1, so filter those out
    .reduce((acc, interest) => acc + interest, 0);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

const displayMovements = function (movements, sort = false) {
  // clear the container
  containerMovements.innerHTML = '';

  // using slice to create a copy of the array
  const movSorted = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // foreach through the supplied array
  movSorted.forEach(function (mov, i) {
    // check to see if this is a deposit or a withdrawl to properly set css later
    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    // building our string
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movType}">${i + 1}
       ${movType}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    // add the html element, bottom-up using afterBegin
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const updateUI = function (account) {
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
  displayMovements(currentAccount.movements);

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputLoanAmount.value = '';
};

// Event handlers
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  // console.log('LOGIN');

  // compare the inputted username to usernames in the account array
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // only read the pin if the current account exists (?.)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // if the login is successful, display the a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }.`;

    // display the UI - set the opacity from 0 to 100
    containerApp.style.opacity = 100;

    // then display balance, summary, and movements
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent = `Incorrect Login information.`;
    containerApp.style.opacity = 0;
  }

  // clear input fields
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);
  const transferToUser = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    transferAmount > 0 && // no negative transfers
    transferAmount <= currentAccount.balance && // have to have money to transfer
    currentAccount.username != transferToUser?.username && // no self-transfers
    transferToUser // receiving user needs to exist
  ) {
    // add a negative movement to the current user
    currentAccount.movements.push(-transferAmount);

    // add a positive movement to the transferred user
    transferToUser.movements.push(transferAmount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // find the account index
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // delete the account
    accounts.splice(index, 1);

    // hide the UI
    containerApp.style.opacity = 0;
  }
  // clear the close account values
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loan = Number(inputLoanAmount.value);

  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)) {
    // add loan movement
    currentAccount.movements.push(loan);

    updateUI(currentAccount);
  }
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  sortedState = !sortedState; // toggle sorted state
  displayMovements(currentAccount.movements, sortedState);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ---------------------------------------------------------------------- //
// LESSON 162 - SUMMARY: WHAT METHOD TO USE?
// ---------------------------------------------------------------------- //

// just an overview of all array methods

// ---------------------------------------------------------------------- //
// LESSON 161 - MORE WAYS OF CREATING AND FILLING ARRAYS
// ---------------------------------------------------------------------- //

const x = new Array(7); // creates an array with 7 empty elements
// console.log(x);

// and now we can FILL the array
x.fill(5, 3, 6);
x.fill(23, 6);
// console.log(x);

// array.from()
const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // underscore is a throwaway param
// console.log(z);

// console.log(Math.trunc(Math.random() * 6 + 1));
const dieRoll = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
// console.log(dieRoll);

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();

  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  ).map(el => Number(el.textContent.replace('€', '')));
  console.log(movementsUI);
});

// ---------------------------------------------------------------------- //
// LESSON 160 - SORTING ARRAYS
// ---------------------------------------------------------------------- //

// sort is a string sort - it doesn't play nicely with numbers
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // sorting MUTATES the array!
// console.log(owners);

// console.log(movements); // initial array
// a and b are nodes in our array, a == [i], and b == [i + 1]
// movements.sort((a, b) => {
//   return a > b ? 1 : -1; // 1 keeps the current order, -1 swaps the order - also works with strings
// });
// console.log(movements); // sorted array

// console.log(movements);
// using math to skip the turnary
movements.sort((a, b) => a - b); // so long as we return a positive value, we keep the order.  If the value is negative, th positions swap
// console.log(movements);

// implemented movement sort event listener

// ---------------------------------------------------------------------- //
// LESSON 159 - FLAT AND FLATMAP
// ---------------------------------------------------------------------- //

const nestedArray = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(nestedArray.flat()); // de-nests the array values into a single array

const deepNest = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(deepNest.flat(2)); // update the depth to recursively call flat

const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

const allMovements = accountMovements.flat();
// console.log(allMovements);

const overallBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
// console.log(overallBalance);

const chainedBalance = accounts
  .map(acc => acc.movements)
  .flat() // mapping and then flattening is a pretty common thing to do
  .reduce((acc, cur) => acc + cur, 0);
// console.log(chainedBalance);

// flatMap combines both the map and flat chain
const chainedBalance2 = accounts
  .flatMap(acc => acc.movements) // only goes one level deep!
  .reduce((acc, cur) => acc + cur, 0);
// console.log(chainedBalance2);

// ---------------------------------------------------------------------- //
// LESSON 158 - SOME AND EVERY
// ---------------------------------------------------------------------- //

// some examples - if SOME elements pass, then we get true
// console.log(movements);
// console.log(movements.includes(-130)); // if -130 is in our array, we get a true result

const hasDeposits = movements.some(mov => mov > 1500); // some allows us to use a condition
// console.log(hasDeposits);

// implemented bank loan event listener

// every method - if EVERY element passes, then we get true
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0)); // account4 only has positive movements

const deposit = mov => mov > 0; // leveraging a function for the deposit logic
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// ---------------------------------------------------------------------- //
// LESSON 157 - THE FINDINDEX METHOD
// ---------------------------------------------------------------------- //

// implemented delete account event listener

// ---------------------------------------------------------------------- //
// LESSON 156 - IMPLEMENTING BANK TRANSFERS
// ---------------------------------------------------------------------- //

// implemented bank transfer event listener

// ---------------------------------------------------------------------- //
// LESSON 155 - IMPLEMENTING THE LOGIN
// ---------------------------------------------------------------------- //

// created login event listener

// ---------------------------------------------------------------------- //
// LESSON 154 - THE FIND METHOD
// ---------------------------------------------------------------------- //

// find all withdrawals - find returns the first element found
const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements, firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

let foundAccount = {};
for (const [key, value] of accounts.entries()) {
  if (value.owner === 'Jessica Davis') foundAccount = value;
}

// ---------------------------------------------------------------------- //
// LESSON 152 - CHAINING METHODS
// ---------------------------------------------------------------------- //

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

const totalWithdrawalsUSD = movements
  .filter(mov => mov < 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

// ---------------------------------------------------------------------- //
// LESSON 150 - REDUCE METHOD
// ---------------------------------------------------------------------- //

// reduce aggregates array values together and returns a single value
const balance = movements.reduce(function (
  accumulator,
  currentValue,
  i,
  array
) {
  return accumulator + currentValue;
},
0 /* the initial VALUE that we want to start the ACCUMULATOR at */);
// console.log(balance);

// Get the MAXIMUM value in an array with reduce
const max = movements.reduce((acc, cur) => {
  if (acc > cur) return acc;
  else return cur;
}, movements[0]);
// console.log(max);

// ---------------------------------------------------------------------- //
// LESSON 149 - FILTER METHOD
// ---------------------------------------------------------------------- //

// creating an array that ONLY contains deposits (>0)
const deposits = movements.filter(function (val, i, arr) {
  return val > 0;
});
const withdrawals = movements.filter(val => val < 0);
// console.log(movements, deposits, withdrawals);

// doing this in a forOf loop
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}

// ---------------------------------------------------------------------- //
// LESSON 148 - COMPUTING USERNAMES
// ---------------------------------------------------------------------- //

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner // create a new property called username
      .toLowerCase() // convert the incoming string to lowercase
      .split(' ') // split the string into an array on the spaces
      .map(name => name[0]) // create a new array with just the first letter of each value
      .join(''); // join the arrays together into a single string
  });
};

createUsername(accounts);

// ---------------------------------------------------------------------- //
// LESSON 147 - MAP METHOD
// ---------------------------------------------------------------------- //

// map produces a new array

// converting movements from EU to USD
const moveUSD = movements.map(function (movement) {
  return movement * eurToUsd;
});
// console.log(movements, moveUSD);

// doing the same with a for of loop
const moveUSDfor = [];
for (const mov of movements) {
  moveUSDfor.push(mov * eurToUsd);
}
// console.log(moveUSD, moveUSDfor);

//const moveUSDarrow = movements.map(move) => move * eurToUsd;
const moveUSDarrow = movements.map(movement => movement * eurToUsd);
// console.log(moveUSD, moveUSDarrow);

// map can also access the current index, as well as the whole array
const movDescriptions = movements.map((mov, i, arr) => {
  return `(Index ${i + 1}) You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } $${Math.abs(mov)}.00.`;
});
// console.log(movDescriptions);

// ---------------------------------------------------------------------- //
// LESSON 146 - DATA TRANSFORMATIONS: MAP, FILTER, AND REDUCE
// ---------------------------------------------------------------------- //

// a lecture on array functions - map, filter, and reduce

// ---------------------------------------------------------------------- //
// LESSON 144 - CREATING DOM ELEMENTS
// ---------------------------------------------------------------------- //

// receives an array of movements and then display them
const showMovements = function (movements) {
  // clear the container
  containerMovements.innerHTML = '';

  // foreach through the supplied array
  movements.forEach(function (mov, i) {
    // check to see if this is a deposit or a withdrawl to properly set css later
    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    // building our string
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movType}">${i + 1}
       ${movType}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    // add the html element, bottom-up using afterBegin
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// ---------------------------------------------------------------------- //
// LESSON 143 - PROJECTS: BANKIST APP
// ---------------------------------------------------------------------- //

// just a demo

// ---------------------------------------------------------------------- //
// LESSON 142 - FOREACH WITH MAPS AND SETS
// ---------------------------------------------------------------------- //

// forEach on a Map
currencies.forEach(function (value, key, map) {
  // console.log(`${key}: ${value}`);
});

// forEach on a Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// the key and the value in a set on forEach is the same thing
currenciesUnique.forEach(function (value, _value, set) {
  // console.log(`${_value}: ${value}`);
});

// ---------------------------------------------------------------------- //
// LESSON 141 - LOOPING ARRAYS WITH FOREACH
// ---------------------------------------------------------------------- //

for (const movement of movements) {
  //console.log(movement > 0 ? `You deposited $${movement}.00` : `You withdrew $${Math.abs(movement)}.00`);
}

// forEach calls the supplied callback function on each index of the supplied array
movements.forEach(function (transaction) {
  //console.log(transaction > 0 ? `You deposited $${transaction}.00` : `You withdrew $${Math.abs(transaction)}.00`);
});

// what if we need a counter inside a forEach?
// recalling how to do this with for of
for (const [i, movement] of movements.entries()) {
  // console.log(movement > 0 ? `(Index ${i + 1}) You deposited $${movement}.00` : `(Index ${i + 1}) You withdrew $${Math.abs(movement)}.00`);
}

// order for params are ALWAYS value, index, then full array
movements.forEach(function (transaction, index, array) {
  // console.log(transaction > 0 ? `(Index ${index + 1}) You deposited $${transaction}.00` : `(Index ${index + 1}) You withdrew $${Math.abs(transaction)}.00`);
});

// ---------------------------------------------------------------------- //
// LESSON 140 - SIMPLE ARRAY METHODS
// ---------------------------------------------------------------------- //

let arr = ['a', 'b', 'c', 'd', 'e'];

// slicing an array - we can extract part of the source array without changing it - returning a new array
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4)); // slicing between index 2 (included) and 4 (excluded)
// console.log(arr.slice(-1)); // grabbing from the back of the array
// console.log(arr.slice(1, -2)); // starting at index 1, excluding the last two elements
// console.log(arr.slice()); // no arguments returns a shallow copy, the same as spread
// console.log([...arr]);

// SPLICING - NOTICE THE 'P'
// splicing DOES mutate the source array - generally this is used to delete elements from an array
// console.log(arr.splice(2)); // EXTRACTS parts of the array and returns it
// console.log(arr.splice(-1)); // extracting off the last element in the array

// MORE SPLICING
// console.log(arr); // showing the base array
// arr.splice(-1); // removing the last element
// console.log(arr); // e is now gone
// arr.splice(1, 2); // removing elements between indexes 1 and 2 (inclusive)
// console.log(arr); // b and c are now gone

// REVERSING ARRAYS
const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2);
arr2.reverse();
// console.log(arr2); // after reversing, the source array is mutated!

// CONCAT
const letters = arr.concat(arr2); // concatenates [arr] with [arr2]
// console.log(letters);

// JOIN
const joined = letters.join(', ');
// console.log(joined);

/////////////////////////////////////////////////

// CODING CHALLENGES

// ---------------------------------------------------------------------- //
// CHALLENGE 1
// ---------------------------------------------------------------------- //

/* Julia and Kate are doing a study on dogs. So each of them asked5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old. */

const julia1 = [3, 5, 2, 12, 7];
const julia2 = [9, 16, 6, 8, 3];
const kate1 = [4, 1, 15, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

/* Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia'and 'dogsKate'), and does the following things:

  1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
  2. Create an array with both Julia's (corrected) and Kate's data
  3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
  4. Run the function for both test datasets
  
  Test data:
  Data1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
  Data2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4] */

const checkDogs = function (dogsJulia, dogsKate) {
  const allDogs = dogsJulia.slice(1, -2).concat(dogsKate);

  allDogs.forEach(function (dog, i) {
    const age =
      dog >= 3 ? `an adult, and is ${dog} years old.` : `still a puppy.`;
    console.log(`Dog number ${i + 1} is ${age}`);
  });
};

// checkDogs(julia1, kate1);
// checkDogs(julia2, kate2);

// ---------------------------------------------------------------------- //
// CHALLENGE 2
// ---------------------------------------------------------------------- //

/* Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:

  Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
    1. Calculate the dog age in human years using the following formula:
      If the dog is <= 2 years old, humanAge = 2 * dogAge.
      If the dog is > 2 years old, humanAge = 16 + dogAge * 4
    2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
    3. Calculate the average human age of all adult dogs */

const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

/* const deposits = movements.filter(function (val, i, arr) {
  return val > 0;
});
const withdrawals = movements.filter(val => val < 0); */
// console.log(movements, deposits, withdrawals);

const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(function (age) {
      if (age <= 2) return 2 * age;
      else return 16 + age * 4;
    })
    .filter(function (age) {
      return age >= 18;
    });

  return (
    humanAge.reduce(function (acc, val) {
      return acc + val;
    }, 0) / humanAge.length
  );
};

// ---------------------------------------------------------------------- //
// CHALLENGE 3
// ---------------------------------------------------------------------- //

/* Rewrite the 'calcAverageHumanAge' function from Challenge#2, but this time as an arrow function, and using chaining! */

const calcAverageHumanAge2 = ages => {
  return ages
    .map(age => {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter(age => {
      return age >= 18;
    })
    .reduce((acc, val, _, ageArray) => {
      return acc + val / ageArray.length;
    }, 0);
};

// ---------------------------------------------------------------------- //
// CHALLENGE 4
// ---------------------------------------------------------------------- //

/* Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little. Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite. Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion. */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

/*Your tasks:
  1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array.
 
    Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg) */

dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
const dogSara = dogs.find(dog => dog.owners.includes('Sarah'));
/* console.log(
  `Sarah's dog is eating ${
    dogSara.curFood > dogSara.recommendedFood * 1.1 ? 'too much' : 'too litte'
  }.`
); */

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
  .flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
  .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

/* 4. Log a string to the console for each array created in 3, like this: 
  
    "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!" */

// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5. Log to the console whether there is any dog eating exactlythe amount of food that is recommended (just trueor false)
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6. Log to the console whether there is any dog eating an okayamount of food (just true or false)
/* console.log(
  dogs.some(
    dog =>
      dog.curFood < dog.recommendedFood * 1.1 &&
      dog.curFood > dog.recommendedFood * 0.9
  )
); */

// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
const okayFood = dogs.filter(
  dog =>
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
);
// console.log(okayFood[0].owners);

// 8. Create a shallow copy of the 'dogs'array and sort it by recommended food portion in an ascending order */
const dogSort = dogs
  .slice()
  .sort((dogA, dogB) => dogA.recommendedFood - dogB.recommendedFood);
