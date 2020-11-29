// Lesson 32 - Strict Mode
'use strict'; // enabling strict mode! Must be the very first statement in the file - this makes our code more secure, and will show error messages for us while running

/* let hasDriversLicense = false;
const passTest = true;
if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log(`I can drive.`); */

// const interface = "Audio"; // interface is a reserved identifier
// const private = 534; // private is a reserved identifier

// ------------------------------------------------ //

// Lesson 33 - Functions
// function logger() { console.log(`My name is Bren`); } // setting up the function
// logger(); // invoking/calling/running the function

/* function juiceMaker(apples, oranges) {
    // console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = juiceMaker(5, 0);
console.log(appleJuice);

const mixedJuice = juiceMaker(2, 4);
console.log(mixedJuice); */

/* Write a function called 'describeCountry'which takes three parameters:
    'country', 'population'and 'capitalCity'.
Based on this input, the function returns a string with this format:
    'Finland has 6 million people and its capital city is Helsinki'
    Call this function 3 times, with input data for 3 different countries.
Store the returned values in 3 different variables, and log them to the console */
/* function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people, and its capital city is ${capitalCity}.`;
}
console.log(describeCountry("Butt", 25, "Hole"));
console.log(describeCountry("Finland", 6, "Helsinki"));
console.log(describeCountry("Canada", 35, "Ottowa")); */

// ------------------------------------------------ //

// Lesson 34 - Function Declarations vs. Expressions
// function DECLARATION
/* function calcAge1(birthYear) { return (new Date().getFullYear()) - birthYear; }
const age1 = calcAge1(1984);
console.log(age1);

// function EXPRESSION, held by our calcAge2 VARIABLE
const calcAge2 = function (birthYear) { return (new Date().getFullYear()) - birthYear; }
const age2 = calcAge2(1984);
console.log(age2); */

/* The world population is 7900 million people. Create a function declaration called 'percentageOfWorld1' which receives a 'population'value, and returns the percentage of the world population that the given population represents.
For example, China has 1441 million people, so it's about 18.2% of the world population

To calculate the percentage, divide the given 'population' value by 7900 and then multiply by 100
Call 'percentageOfWorld1'for 3 populations of countries of your choice, store the results into variables, and log them to the console

Create a function expression which does the exact same thing, called 'percentageOfWorld2', and also call it with 3 country populations (can be the same populations) */
// funciton declaration calls
// function percentageOfWorld1(population) { return (population / 79).toFixed(2) + "%"; }
/* console.log(percentageOfWorld1(1441));
console.log(percentageOfWorld1(35));
console.log(percentageOfWorld1(6)); */

// function expressions calls
const percentageOfWorld2 = function (population) { return (population / 79).toFixed(2) + "%"; }
/* console.log(percentageOfWorld2(1441));
console.log(percentageOfWorld2(35));
console.log(percentageOfWorld2(6)); */

// ------------------------------------------------ //

// Lesson 35 - Arrow Functions
/* const calcAge3 = birthYear => (new Date().getFullYear()) - birthYear;
const age3 = calcAge3(1984);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = (new Date().getFullYear()) - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years.`;
}
console.log(yearsUntilRetirement(1984, 'Bren'));
console.log(yearsUntilRetirement(1954, 'Mike')); */

// Recreate the last assignment, but this time create an arrowfunctioncalled 'percentageOfWorld3'
const percentageOfWorld3 = population => (population / 79).toFixed(2) + "%";
/* console.log(percentageOfWorld3(1441));
console.log(percentageOfWorld3(35));
console.log(percentageOfWorld3(6)); */

// ------------------------------------------------ //

// Lesson 36 - Functions Calling Other Functions
/* function fruitCutter(fruit) { return fruit * 4; }

function juiceMaker(apples, oranges) {
    const cutApples = fruitCutter(apples);
    const cutOranges = fruitCutter(oranges);

    const juice = `Juice with ${cutApples} piece(s) of apples and ${cutOranges} piece(s) of oranges.`;
    return juice;
}

console.log(juiceMaker(2, 3)); */

/* Create a function called 'describePopulation'. Use the function type you like the most. This function takes in two arguments: 'country' and 'population', and returns a string like this:
    'China has 1441 million people, which is about 18.2% of the world.'
To calculate the percentage, 'describePopulation' call the 'percentageOfWorld1' you created earlier.
Call 'describePopulation' with data for 3 countries of your choice */
function describePopulation(country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)} of the world.`;
}

/* console.log(describePopulation("China", 1441));
console.log(describePopulation("Canada", 35));
console.log(describePopulation("Finland", 6)); */

// ------------------------------------------------ //

// Lesson 37 - Reviewing Functions
// const calcAge = function (birthYear) { return (new Date().getFullYear()) - birthYear; }

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) {
        return `${firstName} retires in ${retirement} years.`;
    } else { return `${firstName} has already retired.`; }
}

// console.log(yearsUntilRetirement(1984, "Bren"));
// console.log(yearsUntilRetirement(1954, "Mike"));

// ------------------------------------------------ //

// CODING CHALLENGE #1!!
/* Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least double the average score of the other team. Otherwise, no team wins!

Your tasks:
    1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
    2. Use the function to calculate the average for both teams
    3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins'and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)"
    4. Use the 'checkWinner'function to determine the winner for both Data1 and Data2
    5. Ignore draws this time
    
    Test data:    
    Data1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
    Data2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27 */

const calcAverage = (a, b, c) => ((a + b + c) / 3).toFixed(0);
function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= (avgKoalas * 2)) {
        return console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= (avgDolphins * 2)) {
        return console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    } else { return console.log(`No winner can be declared. (Dolphins ${avgDolphins} vs. Koalas ${avgKoalas})`); }
}

// checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49));
// checkWinner(calcAverage(85, 53, 41), calcAverage(23, 34, 27));

// ------------------------------------------------ //

// Lesson 38 - Arrays
/* const friends = ["Mike", "Crom", "James"];
console.log(friends);

const years = new Array(1984, 1991, 2008, 2020);
console.log(years[0]);
console.log(years.length);
console.log(years[years.length - 1]);

friends[2] = "Bryan"; // updating an index in an array
console.log(friends);

const myName = "Brennan"
const bren = [myName, "MacGregor", new Date().getFullYear() - 1984, "Business Analyst", friends];
console.log(bren);

// Exercise
const calcAge = function (birthYear) { return (new Date().getFullYear()) - birthYear; }
const birthYears = [1984, 2014, 2016];
console.log(calcAge(birthYears[0]), calcAge(birthYears[1]), calcAge(birthYears[2])); */

/* Create an array containing 4 population values of 4 countries of your choice. You may use the values you have been using previously. Store this array into a variable called 'populations'

Log to the console whether the array has 4 elements or not (true or false)

Create an array called 'percentages'containing the percentages of the world population for these 4 population values. Use the function 'percentageOfWorld1' that you created earlier to compute the 4 percentage values */

/* const populations = [1441, 36, 7, 19];
console.log(populations.length === 4);

const popPercentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])];
console.log(popPercentages); */

// ------------------------------------------------ //

// Lesson 39 = Basic Array Operations
/* const friends = ["Mike", "Crom", "James", "Bryan"];
const newLength = friends.push("Chris");
console.log(friends, newLength);

friends.unshift("Dylan");
console.log(friends);

const popped = friends.pop();
console.log(friends, popped);
const shifted = friends.shift();
console.log(shifted, friends);

console.log(friends.indexOf("Crom"));

console.log(friends.includes("Dylan")); // no longer in our array, returns true or false
console.log(friends.includes("Mike"));

if (friends.includes("James")) {
    console.log("Yep, James is a friend.");
} else { console.log("No friend with that name."); } */

/* Create an array containing all the neighbouring countries of a country of your choice. Choose a country which has at least 2 or 3 neighbours. Store the array into a variable called 'neighbours'

At some point, a new country called 'Utopia'is created in the neighbourhood of your selectedcountry. So add it to the end of the 'neighbours'array

Unfortunately, after some time, the new country is dissolved. So remove it from the end of the array

If the 'neighbours'array does not include the country ‘Germany’, log to the console: 'Probably not a central European country :D'

Change the name of one of your neighbouring countries. To do that, find the index of the country in the 'neighbours'array, and then use that index to change the array at that index position. For example, you can search for'Sweden'in the array, and then replace it with 'Republic of Sweden'. */

/* const neighbours = ["England", "Wales", "Scotland"];
console.log(neighbours);
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop();
console.log(neighbours);
if (neighbours.includes("Germany") === false) { console.log("Probably not a central European country."); }

neighbours[1] = "Ireland";
console.log(neighbours); */

// ------------------------------------------------ //

/* Coding Challenge 2
Steven is still building his tip calculator, using the same rules as before:

Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
Your tasks:
    1. Write a function 'calcTip'that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100
    2. And now let's use arrays! So create an array 'bills'containing the test data below
    3. Create an array 'tips'containing the tip value for each bill, calculated from the function you created before
    4. Bonus: Create an array 'total' containing the total values, so the bill+ tip

    Test data:125, 555 and 44

    Hint:Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) */

/* function calcTip(bill) { return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2; }

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(bills, tips, totals); */

// ------------------------------------------------ //

// Lesson 42 - Objects
/* const bren = {
    firstName: "Bren",
    lastName: "MacGregor",
    age: 2020 - 1984,
    job: "Business Analyst",
    friends: ["Mike", "Dylan", "Crom", "James"],
    bestFriend: "Abi",
    kids: ["Clash", "Oz"]
}; */

/* Create an object called 'myCountry'for a country of your choice, containing properties 'country', 'capital', 'language', 'population'and 'neighbours'(an array like we used in previous assignments) */

/* const myCountry = {
    country: "Canada",
    capital: "Ottowa",
    language: "Engligh",
    population: 36,
    neighbours: ["United States of America"]
}; */

// ------------------------------------------------ //

// Lesson 43 - Dot vs. Bracket Notation
// dot notation
// console.log(`${bren.firstName} loves ${bren.bestFriend} <3`);
// console.log(bren['job']);

// bracket notation
// const nameKey = 'Name';
// console.log(bren["first" + nameKey] + "nan", bren["last" + nameKey]);

// const choice = prompt("What do you want to know about Bren?  Choose firstName, lastName, age, job, or bestFriend");

// bren[choice] ? console.log(bren[choice]) : console.log("Choice not valid.");

// bren.location = "Canada";
// bren["email"] = "brennan.macgregor@zoho.com";
//console.log(bren);
// console.log(`${bren.firstName} has ${bren.friends.length + 1} friends, and his best friend is named ${bren.bestFriend}.`)

/* Using the object from the previous assignment, log a string like this to the console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries and a capital called Helsinki.'

2.Increase the country's population by two million using dot notation, and then decrease it by two million using brackets notation. */

/* console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring country, and a capital named ${myCountry.capital}.`)

myCountry.population += 2;
console.log(myCountry.population);
myCountry["population"] -= 2;
console.log(myCountry.population); */

// ------------------------------------------------ //

// Lessone 44 - Object Methods
/* const bren = {
    firstName: "Bren",
    lastName: "MacGregor",
    birthYear: 1984,
    job: "Business Analyst",
    friends: ["Abi", "Mike", "Crom", "James"],
    hasDriversLicense: true,

    // calcAge: function (birthYear) { return 2020 - birthYear; } // v1
    // calcAge: function () { return 2020 - this.birthYear; } // v2
    calcAge: function () { return this.age = 2020 - this.birthYear; }, // v3

    getSummary: function () { return (`${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he ${this.hasDriversLicense ? "has" : "does not have"} a driver's license.`); }
}; */

// console.log(bren.calcAge(bren.birthYear)); // v1
// console.log(bren["calcAge"](bren.birthYear)); // v1
// console.log(bren.calcAge()); // v2
// bren.calcAge(); // v3 call
// console.log(bren.age); // v3 age created and shown

// Challenge
// console.log(bren.getSummary());

/* Add a method called 'describe'to the 'myCountry' object. This method will log a string to the console, similar to the string logged in the previous assignment, but this time using the 'this'keyword.

2. Call the 'describe'method

3. Add a method called 'checkIsland'to the 'myCountry'object. This method will set a new property on the object, called 'isIsland'. 'isIsland'will be true if there are no neighbouring countries, and false if there are. Use the ternary operator to set the property */

const myCountry = {
    country: "Canada",
    capital: "Ottowa",
    language: "Engligh",
    population: 36,
    neighbours: ["United States of America"],

    describe: function () { console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring country, and a capital named ${this.capital}.`) },

    checkIsland: function () { return this.isIsland = this.neighbours.length === 0; }
};

// myCountry.describe();
// myCountry.checkIsland();
// console.log(myCountry.isIsland);

// ------------------------------------------------ //

// Coding Challenge 3
/* Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations!

Remember: BMI = mass / height ** 2 = mass / (height * height)(mass in kg and height in meter)

Your tasks:
    1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
    2. Create a 'calcBMI'method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method
    3. Log to the console who has the higher BMI, together with the full name and the respective BMI.

    Example: "John's BMI (28.3) is higher than Mark's (23.9)!"

    Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall. */

/* const mark = {
    firstName: "Mark",
    lastName: "Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function () { return this.bmi = this.mass / this.height ** 2; }
};
const john = {
    firstName: "John",
    lastName: "Smith",
    mass: 92,
    height: 1.95,
    calcBMI: function () { return this.bmi = this.mass / this.height ** 2; }
};

mark.calcBMI() > john.calcBMI() ?
    console.log(`${mark.firstName}'s BMI (${mark.bmi.toFixed(1)}) is higher than ${john.firstName}'s BMI (${john.bmi.toFixed(1)}).`) :
    console.log(`${john.firstName}'s BMI (${john.bmi.toFixed(1)}) is higher than ${mark.firstName}'s BMI (${mark.bmi.toFixed(1)}).`); */

// ------------------------------------------------ //

// Lesson 46: The For Loop
// for (let i = 1; i <= 10; i++) { console.log("Lifting weights : rep " + i); }

/* There are elections in your country! In a small town, there are only 50 voters. Use a forloop to simulate the 50 people voting, by logging a string like this to the console (for numbers 1 to 50): 'Voter number 1 is currently voting' */
// for (let i = 1; i <= 50; i++) { console.log(`Voter number ${i} is currently voting.`); }

// ------------------------------------------------ //

// Lesson 47: Looping Arrays, Breaking, and Continuing
/* const bren = {
    firstName: "Bren",
    lastName: "MacGregor",
    age: 2020 - 1984,
    job: "Business Analyst",
    friends: ["Mike", "Dylan", "Crom", 23, "James"],
    bestFriend: "Abi",
    kids: ["Clash", "Oz"]
}; */

/* for (let i = 0; i <= bren.friends.length - 1; i++) {
    console.log(bren.friends[i]);
} */

/* const someYears = [1991, 2007, 1969, 2020];
const someAges = [];

for (let i = 0; i <= someYears.length - 1; i++) {
    someAges.push(2020 - someYears[i]);
}
console.log(someYears, someAges); */

// Continue and Break
/* console.log("SHOW ALL ARRAY VALUES");
for (let i = 0; i <= bren.friends.length - 1; i++) {
    console.log(bren.friends[i]);
}

console.log("ONLY STRINGS");
for (let i = 0; i <= bren.friends.length - 1; i++) {
    if (typeof bren.friends[i] !== "string") continue; // int 23 gets skipped or CONTINUED past
    console.log(bren.friends[i]);
}

console.log("BREAK ON A NUMBER AND QUIT LOOP");
for (let i = 0; i <= bren.friends.length - 1; i++) {
    if (typeof bren.friends[i] !== "string") break; // int 23 is found and the loop ENDS
    console.log(bren.friends[i]);
} */

/* Let's bring back the 'populations' array from a previous assignment
2. Use a forloop to compute an array called 'percentages2' containing the percentages of the world population for the 4 population values. Use the function 'percentageOfWorld1'that you created earlier
3. Confirm that 'percentages2'contains exactly the same values as the 'percentages'array that we created manually in the previous assignment, and reflect on how much better this solution is */

/* const populations = [1441, 36, 7, 19];
function percentageOfWorld1(population) { return (population / 79).toFixed(2) + "%"; }
const percentages2 = []; */

/* for (let i = 0; i <= populations.length - 1; i++) {
    //percentages2[i] = percentageOfWorld1(populations[i]);
    percentages2.push(percentageOfWorld1(populations[i])); // better way to do this
}

console.log(populations, percentages2); */

// ------------------------------------------------ //

// Lesson 48: Looping Backwards and Loops Within Loops
/* const brenArray = [
    "Brennan",
    "MacGregor",
    2020 - 1984,
    "Business Analyst",
    ["Mike", "Crom", "James"]
]; */

/* for (let i = brenArray.length - 1; i >= 0; i--) {
    console.log(brenArray[i]);
} */

/* for (let i = 1; i <= 3; i++) {
    console.log(`Starting Set ${i}.`);

    for (let j = 1; j <= 5; j++) {
        console.log(` - Working on Rep ${j}`);
    }
} */

/* Store this array of arrays into a variable called 'listOfNeighbours'[['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
2. Log only the neighbouring countries to the console, one by one, not the entire arrays. Log a string like 'Neighbour: Canada'for each country
3. You will need a loop inside a loop for this. This is actually a bit tricky, so don't worry if it's too difficult for you! But you can still try to figure this out anyway */

const listOfNeighbours = [["Canada", "Mexico"], ["Spain"], ["Norway", "Sweden", "Russia"]];

//console.log(listOfNeighbours[0][0]);

/* for (let i = 0; i < listOfNeighbours.length; i++) {
    for (let j = 0; j <= listOfNeighbours[i].length - 1; j++) {
        console.log("Neighbour: " + listOfNeighbours[i][j]);
    }
} */

// ------------------------------------------------ //

// Lesson 49: The While Loop
/* let i = 1;
while (i <= 10) {
    console.log(`Lifting rep number ${i}.`);
    i++;
} */

/* let die = Math.trunc(Math.random() * 6) + 1;
let counter = 1;
while (die !== 6) {
    die = Math.trunc(Math.random() * 6) + 1;
    counter++;
}
console.log(`You rolled a ${die} after ${counter === 1 ? "1 try" : counter + " tries"}.`); */

/* Recreate the challenge from the lecture 'Looping Arrays, Breaking and Continuing', but this time using a whileloop (call the array 'percentages3')
2. Reflect on what solution you like better for this task: the forloop or the whileloop? */

/* const populations = [1441, 36, 7, 19];
function percentageOfWorld1(population) { return (population / 79).toFixed(2) + "%"; }
const percentages2 = [];

let i = 0;
while (i !== populations.length) {
    percentages2.push(percentageOfWorld1(populations[i]));
    i++;
}

console.log(populations, percentages2); */

// ------------------------------------------------ //

// Coding Challenge 4!
/* Let's improve Steven's tip calculator even more, this time using loops!
    Your tasks:
    1. Create an array 'bills'containing all 10 test bill values
    2. Create empty arrays for the tips and the totals ('tips'and 'totals')
    3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a forloop to perform the 10 calculations!

    Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

    Hints:Call ‘calcTip ‘in the loop and use the push method to add values to the tips and totals arrays

    Bonus: 4. Write a function 'calcAverage'which takes an array called 'arr'as an argument. This function calculates the average of all numbers in the given array. This is a difficult challenge (we haven't done this before)! Here is how to solve it:

    4.1.First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum'that starts at 0. Then loop over the array using a forloop. In each iteration, add the current value to the 'sum'variable. This way, by the endof the loop, you have all values added together

    4.2.To calculate the average, divide the sum you calculated before by the lengthof the array (because that's the number of elements)4.3.Call the function with the 'totals'array */

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

function calcTip(bill) { return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2; }

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(tips[i] + bills[i]);
}

function calcAverage2(arr) {
    let avg = 0;
    for (let i = 0; i < arr.length; i++) {
        avg += arr[i];
    }
    return avg / arr.length;
}

console.log(`Average Bill is $${calcAverage2(totals)}.`)