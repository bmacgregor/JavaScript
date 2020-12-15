'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-12-10T23:36:17.929Z',
    '2020-12-14T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);
    const formattedMov = formatCurr(mov, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  // set time to 5 minutes (300 seconds)
  let time = 300;

  const tick = function () {
    // in each call, print the remaining time to UI
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    // when time === 0, stop timer and log out user
    if (time === 0) {
      clearInterval(timer); // stop the timer
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // decrease time by 1 second
    time--;
  };

  tick(); // call the function immediately, once
  const timer = setInterval(tick, 1000); // and also call the timer every second

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // if we already have a running timer, clear it
    if (timer) clearInterval(timer);
    // then set the global timer to the returned timer from the startLogoutTimer function
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }

  // reset the timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // delaying the approval by 2.5s
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // reset the timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// ------------------------------------------- //
// LECTURE 176 - IMPLEMENTING TIMERS
// ------------------------------------------- //

// logout timer implementation

// ------------------------------------------- //
// LECTURE 175 - SETTIMEOUT AND SETINTERVAL
// ------------------------------------------- //

// there are two types of timers - set timeOut and set interval
// setTimeout(() => console.log('Order up!'), 3000);

// passing arguments to the timer
// setTimeout((arg1, arg2) =>console.log(`${arg1} is the first argument, and ${arg2} is the second one.`), 3000, 'Red', 'blue');

// timeOuts can be cancelled
const argArrayL175 = ['Red', 'Blue'];
const colTimerL175 = setTimeout(
  (arg1, arg2) =>
    console.log(
      `${arg1} is the first argument, and ${arg2} is the second one.`
    ),
  3000,
  ...argArrayL175
);
if (argArrayL175.includes('Blue')) clearTimeout(colTimerL175);

// running something every second using setINTERVAL
// setInterval(function () {const now = new Date(); console.log(now);}, 1000);

const currTimeL175 = new Date();
// console.log(`${currTimeL175.getHours()}:${currTimeL175.getMinutes()}:${currTimeL175.getSeconds()}`);

// making a clock
/* setInterval(() => {
  const currTime = new Date();
  console.log(
    `${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()}`
  );
}, 1000); */

// ------------------------------------------- //
// LECTURE 174 - INTERNATIONALIZING NUMBERS (INTL)
// ------------------------------------------- //

const numL174 = 3884764.23;
const optionsL174 = {
  style: 'unit',
  unit: 'mile-per-hour',
  // useGrouping: 'false',
};
/* console.log(
  'Local format: ',
  new Intl.NumberFormat(navigator.locale, optionsL174).format(numL174)
);
console.log(
  'Germany: ',
  new Intl.NumberFormat('de-DE', optionsL174).format(numL174)
);
console.log(
  'Syria: ',
  new Intl.NumberFormat('ar-SY', optionsL174).format(numL174)
); */

// ------------------------------------------- //
// LECTURE 173 - INTERNATIONALIZING DATES (INTL)
// ------------------------------------------- //

// updated login event handler

// ------------------------------------------- //
// LECTURE 172 - OPERATIONS WITH DATES
// ------------------------------------------- //

const futureL172 = new Date(2020, 10, 19, 15, 23);
// console.log(+futureL172);

const getDateDiff = (date1, date2) =>
  Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
// console.log(getDateDiff(futureL172, new Date()).toFixed(0));

// added some more date logic (today, yesterday, x days ago)

// ------------------------------------------- //
// LECTURE 171 - ADDING DATES TO THE BANKIST APP
// ------------------------------------------- //

// added current date and transaction dates

// ------------------------------------------- //
// LECTURE 170 - CREATING DATES
// ------------------------------------------- //

// creating a date
const nowL170 = new Date(); // current date and time
// console.log(nowL170);
// console.log(new Date('Dec 15 2020 09:55:11'));
// console.log(new Date('December 25, 2020'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 15, 23, 5)); // year, month (0 based), day, hour (24h), min, second
// console.log(new Date(2077, 10, 33)); // Nov 33 == Dec 3
// console.log(new Date(0)); // initial UNIX time
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // three days past initial UNIX time

// date methods
const futureL170 = new Date(2037, 10, 19, 15, 23);
// console.log(futureL170);
// console.log(futureL170.getFullYear());
// console.log(futureL170.getMonth() + 1);
// console.log(futureL170.getDate()); // calendar date
// console.log(futureL170.getDay() + 1); // day of the week, zero based
// console.log(futureL170.getHours()); // 24h
// console.log(futureL170.getMinutes());
// console.log(futureL170.getSeconds());
// console.log(futureL170.toISOString()); // some kind of international standard

// console.log(futureL170.getTime()); // shows the milliseconds that have passed since initial UNIX time
// console.log(new Date(2142282180000)); // creating a date based solely off of the millisencds passed since initial UNIX time

// console.log(Date.now()); // time right now in milliseconds passed since initial UNIX time

// console.log(futureL170);
futureL170.setFullYear(2040); // sets the year
// console.log(futureL170);

// ------------------------------------------- //
// LECTURE 169 - WORKING WITH BIGINTS
// ------------------------------------------- //

// console.log(Number.MAX_SAFE_INTEGER);

// if we need a really, really big number, we use bigInts
// console.log(45648874861515310310341848615332035353151353);
// console.log(45648874861515310310341848615332035353151353n); // the n transforms the number to a bigInt

// bigInt Operators
// console.log(10000n + 10000n);
// console.log(1535484615321564896482131831n * 123541853153153102n);

const huge = 1153153155151210n;
const numL169 = 23;
// console.log(huge + BigInt(numL169)); // to add these, we need to convert the int to a bigInt

// math operations don't work on bigInts!

// divisions
// console.log(10n / 3n); // returns the closest whole bigInt

// ------------------------------------------- //
// LECTURE 168 - THE REMAINDER OPERATOR
// ------------------------------------------- //

// console.log(5 % 2);

// checking if a number is even or odd
const evenOrOdd = val => (val % 2 === 0 ? `${val} is even.` : `${val} is odd.`);
// console.log(evenOrOdd(7));
// console.log(evenOrOdd(10));

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();

  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'lightblue';
  });
});

// ------------------------------------------- //
// LECTURE 167 - MATH AND ROUNDING
// ------------------------------------------- //

// console.log(Math.sqrt(9));
// console.log(Math.max(5, 18, 23, 11, 2)); // returns the max value, also does type conversion but NOT parsing
// console.log(Math.min(5, 18, 23, 11, 2)); // returns the min value

// console.log(Math.PI); // PI the constant
// console.log(Math.PI * Number.parseFloat('10px') ** 2); // getting circumference

// console.log(Math.random()); // a random number between 0 and 1
// console.log(Math.trunc(Math.random() * 6) + 1); // random numbers between 1 and 6

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));

// rounding integers
// console.log(Math.trunc(23.3)); // removes the decimal outright
// console.log(Math.round(23.9)); // rounds to nearest
// console.log(Math.ceil(23.9)); // rounds up (away from zero when positive)
// console.log(Math.floor(23.9)); // rounds down (toward zero when positive)

// rounding decimals
// console.log((2.7).toFixed(0)); // returns a string set to the supplied precision
// console.log(+(2.345).toFixed(2)); // converting the string to a number (+) with a precision of 2

// ------------------------------------------- //
// LECTURE 166 - CONVERTING AND CHECKING NUMBERS
// ------------------------------------------- //

// console.log(0.1 + 0.2 === 0.3);
// console.log(+'23'); // converting 23 to a number the easy way

// we can parse a number from a string
// console.log(Number.parseInt('30px')); // returns the number 30
// console.log(Number.parseInt('e23')); // number doesn't lead, so we get NaN

// console.log(Number.parseFloat('2.5rem', 10)); // the 10 sets the base of the number we're parsing
// console.log(parseFloat('34.5px')); // parse operations are global, but it's best to call them with [Number.] leading

// Check if value is NaN
// console.log(Number.isNaN(20)); // is a number
// console.log(Number.isNaN('20')); // is also, technically a number
// console.log(Number.isNaN(+'20X')); // we're converting this to a number, but it's not actually a number
// console.log(Number.isNaN(20 / 0)); // Infinity is a concept, not a number

// Best way to check if a value actually is a number
// console.log(Number.isFinite(20)); // 20 is finite
// console.log(Number.isFinite('20')); // strings are not finite
// console.log(Number.isFinite(+'20X')); // strings converting to numbers are not finite
// console.log(Number.isFinite(20 / 0)); // infinity, by definition, is not finite
