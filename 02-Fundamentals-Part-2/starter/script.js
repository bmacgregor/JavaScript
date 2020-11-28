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
function percentageOfWorld1(population) { return (population / 79).toFixed(2) + "%"; }
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
const calcAge = function (birthYear) { return (new Date().getFullYear()) - birthYear; }

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
