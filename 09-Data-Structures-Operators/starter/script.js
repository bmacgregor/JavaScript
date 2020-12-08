'use strict';

const daysOfTheWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const openingHours2 = {
  [daysOfTheWeek[4]]: {
    open: 12,
    close: 22,
  },
  [daysOfTheWeek[5]]: {
    open: 11,
    close: 23,
  },
  [daysOfTheWeek[2 + 4]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starter, main) {
    // returing an array with two elements in it
    return [this.starterMenu[starter], this.mainMenu[main]];
  },

  // destructuring a passed object within the function's parameter block - remember to use curly braces!
  // Just as before, default values can be set
  orderDelivery: function ({ starterIndex = 0, mainIndex = 0, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  // receiving a split array and popping the individual arguments into the three parameters
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is a pasta, made with ${ing1}, ${ing2}, and ${ing3}.`);
  },

  // stores the main ingredient as a variable, and the rest as an array
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // putting the new openingHours2 object into the restaurant object
  openingHours2,
};

// ------------------------------------------------------------------------------- //
// LESSON 103 - [DESTRUCTURING ARRAYS]
// ------------------------------------------------------------------------------- //

const myArray = [2, 3, 4];

// destructuring the array - unpacking it into individual variables
const [a, b, c] = myArray;
// console.log(a, b, c);

const [first, second] = restaurant.categories;
// console.log(first, second);

let [cat1, , cat3] = restaurant.categories; // skipping the second element
// console.log(cat1, cat3);

// swapping values using an array and skipping the use of temp
[cat1, cat3] = [cat3, cat1];
// console.log(cat1, cat3);

// returning a value from a function, and the destructuring it into multiple variables
const [starter, main] = restaurant.order(2, 0);
// console.log(starter, main);

// what about nested arrays?
const nested = [2, 4, [5, 6]];
const [x, , y] = nested;
// console.log(x, y);

// what about the individual values from the nested array?
const [i, , [j, k]] = nested;
// console.log(i, j, k);

// setting default values while destructuring
const [p = -1, q = -1, r = -1] = [8, 9];
// console.log(p, q, r);

// ------------------------------------------------------------------------------- //
// LESSON 104 - {DESTRUCTURING OBJECTS}
// ------------------------------------------------------------------------------- //

// destructuring object elements into variables - similar to arrays, but order doesn't matter, and we use curly braces instead of square braces
const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// chaging the variable names so that they're not the same as the source object
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
// console.log(restaurantName, hours, tags);

// also setting default values while destructuring
const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// mutating variables - swapping values around
let a = 111;
let b = 999;
const myObj = { a: 23, b: 7, c: 14 };

// need to wrap curly braces in round braces - curly braces alone will throw an error
({ a, b } = myObj);
// console.log(a, b);

// nested objects - destructuring openingHours object which holds ANOTHER object into individual variables
const {
  fri: { open, close },
} = openingHours;
// console.log(open, close);

// nested objects AND renaming
const {
  sat: { open: o, close: c },
} = openingHours;
// console.log(o, c);

// passing an object to a function that will later get destructured
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sol 21',
  mainIndex: 2,
  starterIndex: 1,
});

// passing an object and missing a few parameters, letting the function's defaults handle this for us
restaurant.orderDelivery({
  address: '222 Renfello Drive',
  time: '11:00',
});

// ------------------------------------------------------------------------------- //
// LESSON 105 - SPREAD OPERATOR [ ... ]
// ------------------------------------------------------------------------------- //

// using the spread operator to expand an array into individual elements
const arr = [7, 8, 9];
const badArray = [1, 2, arr[0], arr[1], arr[2]];
const goodArray = [1, 2, ...arr];
// console.log(badArray);
// console.log(goodArray); // same result as above, but much cleaner
// console.log(...goodArray); // spreading the array out to show as individual elements

// expanding an array and adding a new element to it
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(restaurant.mainMenu);
// console.log(newMenu);

// spread is similar to destructuring, but it takes EVERYTHING from the array, and does NOT create new variables.  It can only be used when we're writing values when seperated by commas!

// creating a copy of an array with spread
const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// merging multiple arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// spread works on ALL iterables - arrays, strings, maps, or sets, but NOT objects!

// spreading a string into an array and adding a few new characters
const myString = 'Bren';
const letters = [...myString, ' ', 'M', '.'];
// console.log(letters);
// console.log(...myString);

// setting up an array to pass to a function, and spreading the array into individual variables on the pass
// const ingredients = [
//  prompt(`Let's make a pasta!  Ingredient !?`),
//  prompt(`Ok, ingredient 2?`),
//  prompt(`Great!  Last ingredient?`),
//];
// restaurant.orderPasta(...ingredients);

// spread also works on objects, even though they're not iterables
// creating a copied object, and adding a few new properties
const newRestaurant = {
  foundingYear: 1998,
  ...restaurant,
  founder: 'Guiseppe',
};
// console.log(restaurant);
// console.log(newRestaurant);

// copying an object and updating a property
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Pharos Pizza';
// console.log(restaurantCopy);

// ------------------------------------------------------------------------------- //
// LESSON 106 - REST PATTERN ( ... )
// ------------------------------------------------------------------------------- //

// Rest uses the same syntax as spread, but instead of unpacking an array, it packs it up!  Spread goes on the right side of assignment, and Rest goes on the left side during assignment

// assigning 1 to a, 2 to b, and then everything else into c, which will be an array instead of a number
const [a, b, ...c] = [1, 2, 3, 4, 5];
// console.log(a, b, c);

// using both rest and spread, skipping an unwanted element
const [pizza, pasta, , ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
// console.log(pizza, pasta, otherFood);

// using rest with objects - order does not matter, rest just takes everything that remains if it was not skipped
const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

// using rest with functions on the parameter - the rest collects the individual numbers into an array
const add = function (...numbers) {
  let sum = 0;

  for (const x of numbers) {
    sum += x;
  }

  // console.log(sum);
};

// passing the function an random number of variables which will packaged together using rest
add(2, 3);
add(2, 3, 5);
add(2, 4, 6, 8, 10);

// passing an array over and splitting it into individual numbers before it is packaged together with rest on the function-side
const arrToAdd = [25, 5, 15];
add(...arrToAdd);

// passing multiple arguments to the orderPizza function
restaurant.orderPizza('Mushrooms', 'Onions', 'Olives', 'Spinach');

// passing only one argument, which will result in the mainIngredient variable being set, and an empty array created
restaurant.orderPizza('Cheese');

// ------------------------------------------------------------------------------- //
// LESSON 107 - SHORT CIRCUITING || AND &&
// ------------------------------------------------------------------------------- //

// short circuiting the OR operand
// console.log(3 || 'Bren'); // 3 is truthy, so the OR operator will pass this to console.log to be used
// console.log(0 || 'Bren'); // 0 is falsy, so the OR operator skips it and passes Bren to console.log
// console.log(undefined || 0 || '' || 'Hello'); // we fall all the way through to Hello because it is the first truthy value that OR finds

// short circuiting the AND operand
// console.log(3 && 'Bren'); // 3 is truthy, so the AND operator will bypass it and send Bren to console.log
// console.log(0 && 'Bren'); // 0 is falsy, so the AND operator passes it to console.log
// console.log(23 && 'Hello' && true && undefined); // we fall all the way through to UNDEFINED because it is the first falsy value that AND finds

// setting default values using short circuiting
const guests1 = restaurant.numGuests || 10;
// console.log(guests1); // numGuests doesn't exist, so we short circuit the OR over to the default of 10

// using the AND operator to check if a function exists, and if it does, we short circuit to call the function
// restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'Spinach');
restaurant.giveMeAPizza && restaurant.orderPizza('Mushrooms', 'Spinach'); // does not exist, so nothing happens

// ------------------------------------------------------------------------------- //
// LESSON 108 - NULLISH COALESCING OPERATOR (??)
// ------------------------------------------------------------------------------- //

// 0 is falsy but not NULLISH, so we can use the nullish operator to grab it anyway instead of jumping over to the short circuited 10
restaurant.numGuests = 0;
const guests2 = restaurant.numGuests ?? 10;
// console.log(guests2);

// ------------------------------------------------------------------------------- //
// LESSON 110 - FOR/OF LOOPS
// ------------------------------------------------------------------------------- //

// looping over an array using a for/of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const item of menu) console.log(item);

// getting the index out of a for/of loop - the KEY function gives us the index of the element
//for (const item of menu.keys()) console.log(item);

// getting both the KEY and the VALUE from the object using a for/of loop
// the item is a KEY/VALUE pair - or an array!  The key lives at [0] and the value lives at [1] for each entry
// for (const item of menu.entries()) {
//  console.log(`${item[0] + 1}: ${item[1]}`);
//}

// now destructuring the item array from above
// for (const [key, value] of menu.entries()) {
//  console.log(`${key + 1}: ${value}`);
//}

// less abstract version of the above
const [key, value] = menu.entries();
// console.log(key, value);

// ------------------------------------------------------------------------------- //
// LESSON 111 - ENHANCED OBJECT LITERALS
// ------------------------------------------------------------------------------- //

// restaurant is an object literal - we literally wrote out the object syntax, defining everything about it
// we can create an openingHours2 object and then pop it into the restaurant object directly
// we can write functions in objects without explicitly declaring the function - we just need the argument parenthesis and the curly braces
// we can also calculate object names

// console.log(openingHours2);

// ------------------------------------------------------------------------------- //
// LESSON 112 - OPTIONAL CHAINING (?.)
// ------------------------------------------------------------------------------- //

// we can use the optional chaining operator in place of an if to see if a property EXISTS - it's nullish
// console.log(restaurant.openingHours2.monday?.open); // we don't have an opening hours property for Monday
// console.log(restaurant.openingHours2.friday?.open); // but we DO have an opening hours for Friday

// multiple optional chaining
// console.log(restaurant.openingHours2?.mon?.open); // mon doesn't exist, so we stop there

// looping through an array and checking if the restaurant is open or closed on that day
// for (const day of daysOfTheWeek) {
//   console.log(`On ${day}, we open at ${restaurant.openingHours2[day]?.open}.`);
// }

// same loop as above, but also setting a default value of closed, and also using the nullish operator to let the 0 short circuit in
// for (const day of daysOfTheWeek) {
//   const openString = restaurant.openingHours2[day]?.open ?? 'closed';
//   openString === 'closed'
//     ? console.log(`On ${day}, we are closed. So sorry!`)
//     : console.log(
//         `On ${day}, we open at ${restaurant.openingHours2[day].open}. Come on in!`
//       );
// }

// we can also check if a function exists, and if it does, we call it with the following arguments
// console.log(restaurant.order?.(0, 0) ?? 'Method does not exist');
// console.log(restaurant.orderSomeFood?.(0, 0) ?? 'Method does not exist.');

// we can also use optional chaining to see if it's empty
const users = [{ name: 'Bren', email: 'bren@me.com' }];

// console.log(users[0]?.name ?? 'User array is empty at the specific index.');
// console.log(users[5]?.name ?? 'User array is empty at the specific index.');

// ------------------------------------------------------------------------------- //
// LESSON 113 - LOOPING OBJECTS: KEYS, VALUES, AND ENTRIES
// ------------------------------------------------------------------------------- //

// getting property names based on their KEY
const properties = Object.keys(openingHours2);
// console.log(openingHours2);
let openStr = `We are open ${properties.length} days a week; `;

for (const day of properties) {
  openStr += `${day}, `;
}
// console.log(openStr);

// getting property VALUES
const values = Object.values(openingHours2);
// console.log(values);

// property ENTRIES (Key Value pairs)
const entries = Object.entries(openingHours2);
// console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key}, we open at ${open}:00 and close at ${close}:00.`);
}

// ------------------------------------------------------------------------------- //
// LESSON 115 - SETS
// ------------------------------------------------------------------------------- //

// a set is a collection of unique values
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

// console.log(ordersSet); // all duplicates are gone
// console.log(new Set('Bren')); // iterating through the string
// console.log(ordersSet.size); // like length, size gives us a number back
// console.log(ordersSet.has('Sandwich'), ordersSet.has('Pizza')); // checking contains
ordersSet.add('Garlic Bread', 'Garlic Bread'); // adding a duplicate value
// console.log(ordersSet); // but the dupe is still ignored
ordersSet.delete('Risotto');
// console.log(ordersSet); // Risotto is now gone

// can't retrieve values from a set - there's no index, but you generally use them to see if something exists within a set

// clearing down the set
// ordersSet.clear();
// console.log(ordersSet);

// looping is possible
// for (const order of ordersSet) console.log(order);

// the main use of a set is to remove dupes from arrays
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffSet = new Set(staff);
// console.log(staff, staffSet);
const unpackedStaffSet = [...new Set(staff)];
// console.log(unpackedStaffSet);
// getting a dupe-free array.length
// console.log(new Set(staff).size);

// how many unique characters are in a string?
// console.log(new Set('BrennanMacGregor').size);

// ------------------------------------------------------------------------------- //
// LESSON 116 - MAPS - FUNDAMENTALS
// ------------------------------------------------------------------------------- //

// used to map values to keys - data is stored in key/value pairs

const rest = new Map(); // easiest to just create an empty map
rest.set('name', 'Pharos Pizza'); // name is the key, Pharos Pizza is the value
rest.set(1, 'Whyte Ave.');
rest.set(2, 'Downtown');

rest
  .set('categories', ['Italian', 'Pizzeria', 'Local'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open!')
  .set(false, "Sorry, we're closed.");

// getting map values
// console.log(rest.get('name'));
// console.log(rest.get(true));

// with a bool as a key, we can evaluate it like this:
const time = 10;
// console.log(rest.get(time >= rest.get('open') && time < rest.get('close')));

// checking if a key exists
// console.log(rest.has('categories'));

// removing a key/value pair
rest.delete(2);

// getting the map size
// console.log(rest.size);

// clearing the map
// rest.clear();

const arrMap = [1, 2];
rest.set(arrMap, 'Test');
// console.log(rest.get(arrMap));

rest.set(document.querySelector('h1', 'Heading'));

// ------------------------------------------------------------------------------- //
// LESSON 117 - MAPS - ITERATION
// ------------------------------------------------------------------------------- //

// creating a new map without using set - we make an array of arrays
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again.'],
]);
// console.log(question);

// converting an object to a map
const hoursMap = new Map(Object.entries(openingHours2));
// console.log(openingHours2);
// console.log(hoursMap);

//console.log(typeof question.get('correct'));

// Quiz app
// console.log(question.get('question'));
// maps are iterables, so you can use a for loop!
for (const [key, value] of question) {
  if (typeof key === 'number') {
    // console.log(`Anwser #${key}: ${value}`);
  }
}
// const answer = Number(prompt('Your answer:'));
// console.log(question.get(answer === question.get('correct')));

// converting a map to an array
const convertedFromMap = [...question];
// console.log(question);
// console.log(convertedFromMap);

// ------------------------------------------------------------------------------- //
// LESSON 120 - WORKING WITH STRINGS 1
// ------------------------------------------------------------------------------- //

const airline = 'TAP Air Portugal';
const plane = 'A320';

// a string is really just a character array
// console.log(airline.length);

// string methods
// console.log(airline.indexOf('r')); // indexOf returns the first index of a given character
// console.log(airline.lastIndexOf('r')); // this gives us the LAST idex of a given character
// console.log(airline.indexOf('Portugal')); // grabbing the index of a subString

// slicing a string
// console.log(airline.slice(4)); // slicing characters in indexes 0 - 3 and returning a substring
// console.log(airline.slice(4, 7)); // slicing 0 - 3 and then 7 to the end of the string
// console.log(airline.slice(0, airline.indexOf(' '))); // slicing out the first word
// console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // slicing out the last word
// console.log(airline.slice(-2)); // slicing out the LAST TWO letters in the string
// console.log(airline.slice(1, -1)); // slicing off the FIRST and LAST characters in the string

const checkMiddleSeat = function (seat) {
  // B and E are middle seats - slice out the last character in the string to check
  return seat.slice(-1) === 'B' || seat === 'E'
    ? 'Middle Seat.'
    : 'Not a Middle Seat.';
};
// console.log(checkMiddleSeat('11C'));

// ------------------------------------------------------------------------------- //
// LESSON 121 - WORKING WITH STRINGS 2
// ------------------------------------------------------------------------------- //

// changing a string's case
const airline = 'TAP Air Portugal';

// console.log(airline.toLocaleLowerCase());
// console.log(airline.toLocaleUpperCase());

// Fixing capitalization in a name
let passenger = 'bReNNan';
passenger = passenger.toLowerCase(); // convert everything to lower
passenger = passenger[0].toUpperCase() + passenger.slice(1); // make the first letter upper case and everything else lower
// console.log(passenger);

// comparing an email
const email = 'bren@me.ca';
let loginEmail = '   Bren@Me.Ca \n'.toLowerCase().trim();
// console.log(email === loginEmail);

// replacing part of a string
const priceGB = '288,97£';
let priceCAD = priceGB.replace('£', '$').replace(',', '.');
priceCAD = priceCAD.slice(-1) + priceCAD.slice(0, -1);
// console.log(priceCAD);

const announcement =
  'All passengers come to boarding door 23.  Boarding door 23.';
// console.log(announcement.replaceAll('door', 'gate')); // version 1
// console.log(announcement.replace(/door/g, 'gate')); // regex version

// Getting a bool back on a return
const plane = 'Airbus A3210neo';
// console.log(plane.includes('A320'));
// console.log(plane.startsWith('Air'));
// console.log(plane.startsWith('Airbus') && plane.endsWith('neo'));

const checkBaggage = function (items) {
  const itemCheck = items.toLowerCase();
  return !(
    itemCheck.includes('bomb') ||
    itemCheck.includes('gun') ||
    itemCheck.includes('knife')
  );
};

// console.log(checkBaggage('I have a laptop, some food, and 36 Bombs.'));
// console.log(checkBaggage('Socks and a camera.'));
// console.log(checkBaggage('gUns and a knIfe.'));

// ------------------------------------------------------------------------------- //
// LESSON 122 - WORKING WITH STRINGS 3
// ------------------------------------------------------------------------------- //

// console.log('a+very+nice+string'.split('+')); // splitting a string

// splitting a string on a given character
const [firstName, lastName] = 'Brennan MacGregor'.split(' ');

// joining strings together
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

const capitalizeName = function (name) {
  const splitName = [...name.split(' ')];
  let fixedName = '';
  for (const n of splitName) {
    fixedName += n[0].toUpperCase() + n.slice(1) + ' ';
  }
  console.log(fixedName.trim());

  // alternate version
  const names = name.split(' ');
  const namesUpper = [];
  for (const n2 of names) {
    namesUpper.push(n2[0].toUpperCase() + n2.slice(1));
  }
  console.log(namesUpper.join(' '));

  // another way to solve this
  const replaceName = name.split(' ');
  const namesUpper2 = [];
  for (const n3 of replaceName) {
    namesUpper2.push(n3.replace(n3[0], n3[0].toUpperCase()));
  }
  console.log(namesUpper2.join(' '));
};

// capitalizeName('abigail janet collins macGregor');

// Padding a string
const message = 'Go to gate 23';
// console.log(message.padStart(25, '+').padEnd(30, '+'));
// console.log('Bren'.padStart(25, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const last = String(number).slice(-4);
  return last.padStart(String(number).length, '*');
};

// console.log(maskCreditCard(1234567891234567));
// console.log(maskCreditCard(12345));
// console.log(maskCreditCard('123155646786156189415153486115520'));

// repeating
const badWeather = 'Bad weather... All Departures Delayed... ';
// console.log(badWeather.repeat(5));
const planesInQueue = function (n) {
  console.log(`There are ${n} planes in line ${'*'.repeat(n)}`);
};
// planesInQueue(25);

// ------------------------------------------------------------------------------- //

// CODE CHALLENGES

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// CHALLENGE 1
// 1. Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = [...game.players];
// console.log(players1);
// console.log(players2);

// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;
// console.log(gk);
// console.log(fieldPlayers);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// 5. Based on the game.oddsobject, create one variable for each odd (called 'team1', 'draw'and 'team2')
const { team1, x: draw, team2 } = game.odds;
// console.log(team1, team2, draw);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in).  First, use players 'Davies', 'Muller', 'Lewandowski', 'Kimmich'. Then, call the function again with players from game.scored
const printGoals = function (...players) {
  for (const x of players) {
    console.log(x);
  }
  console.log(`${players.length} goals were scored.`);
};

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, withoutusing an if/elsestatement or the ternary operator.

/* game.odds.team1 > game.odds.team2 ||
  console.log(
    `${game.team1} is more likely to win (${game.odds.team1} v. ${game.odds.team2}).`
  );
game.odds.team1 < game.odds.team2 ||
  console.log(
    `${game.team2} is more likely to win.(${game.odds.team2} v. ${game.odds.team1})`
  ); */

// ------------------------------------------------------------------------------- //

// CHALLENGE 2
// 1. Loop over the game.scoredarray and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
/* for (const [goal, player] of Object.entries(game.scored)) {
  console.log(`Goal ${Number(goal) + 1}: ${player}`);
} */

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let avg = 0;
for (const num of Object.values(game.odds)) {
  avg += num;
}
// console.log(avg / Object.values(game.odds).length);

/* 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
  Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint:Note how the odds and the game objects have the same property names */
/* for (const [teamName, odd] of Object.entries(game.odds)) {
  teamName === 'x'
    ? console.log(`Odd of draw: ${odd}`)
    : console.log(`Odd of victory ${game[teamName]}: ${odd}`);
} */

// ------------------------------------------------------------------------------- //

// CHALLENGE 3

const gameEvents = new Map([
  [17, 'GOAL'],
  [36, 'Substitution'],
  [47, 'GOAL'],
  [61, 'Substitution'],
  [64, 'Yellow Card'],
  [69, 'Red Card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, 'GOAL'],
  [80, 'GOAL'],
  [92, 'Yellow Card'],
]);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
const eventSet = new Set();
for (const [, value] of gameEvents) {
  eventSet.add(value);
}
const events = [...eventSet];
const events2 = [...new Set(gameEvents.values())]; // better solution
//console.log(events);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);
//console.log(gameEvents);

// 3. Compute and logthe following string to the console: "An event happened, on average, every 9 minutes"(keep in mind that a game has 90 minutes)
const time = [...gameEvents.keys()];
/* console.log(
  `An event happened, on average, every ${
    time[time.length - 1] / gameEvents.size
  } minutes.`
); */

// 4. Loop over 'gameEvents'and log each elementto the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:[FIRST HALF] 17: GOAL
/* for (const [key, value] of gameEvents) {
  key <= 45
    ? console.log(`[FIRST HALF] ${key}: ${value}`)
    : console.log(`[SECOND HALF] ${key}: ${value}`);
} */

// ------------------------------------------------------------------------------- //

// CHALLENGE 4

/* Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code belowto insert the elements), and conversion will happen when the button is pressed.

Test data(pasted to textarea, including spaces):
  underscore_case
    first_name
  Some_Variable
    calculate_AGE
  delayed_departure
  
Should produce this output (5 separate console.log outputs):
  underscoreCase   +
  firstName        ++
  someVariable     +++
  calculateAge     ++++
  delayedDeparture +++++
  
  Hints:
    Remember which character defines a new line in the textarea
    The solution only needs to work for a variable made out of 2 words, like a_b
    Start without worrying about the +. Tackle that only after you have the variable name conversion working
    This challenge is difficult on purpose, so start watching thesolution in case you're stuck. Then pause and continue!
    
Afterwards, test with your own test data! */

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// my brutal version of this solve
/*
document.querySelector('button').addEventListener('click', function () {
  const words = document.querySelector('textarea').value.toLowerCase();
  let wordArray = words.split('\n');
  let splitWords = [];

  for (let i = 0; i < wordArray.length; i++) {
    wordArray[i] = wordArray[i].trim();
    splitWords[i] = wordArray[i].split('_');
  }

  wordArray = [];

  for (let i = 0; i < splitWords.length; i++) {
    let secondWord = splitWords[i][1];
    wordArray = splitWords[i][0];
    const outString =
      (wordArray + secondWord[0].toUpperCase() + secondWord.slice(1)).padEnd(
        20
      ) + `${'+'.repeat(i + 1)}`;

    console.log(outString);
  }
});
*/

// better version
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;

  // seperate into five different strings on the newline
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )} ${'+'.repeat(row)}`;

    console.log(`${output.padEnd(20)}${'+'.repeat(i + 1)}`);
  }
});
