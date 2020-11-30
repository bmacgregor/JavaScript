// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = 23 + 5;
// console.log(x);

// --------------------------------------------------- //

/* const tempArray1 = [3, 5, 1];
const tempArray2 = [9, 0, 5];

function calcAmplitude(tempA, tempB) {
  const mergedArray = tempA.concat(tempB);
  let max = Math.max(mergedArray[0]);
  let min = Math.min(mergedArray[0]);

  for (let i = 1; i < mergedArray.length; i++) {
    const currTemp = mergedArray[i];

    if (typeof currTemp !== 'number') continue; // skip errors
    if (currTemp > max) max = currTemp;
    if (currTemp < min) min = currTemp;
  }

  return max - min;
}

console.log(calcAmplitude(tempArray1, tempArray2)); */

/* function measureKelvin() {
  const measure = {
    type: 'temp',
    unit: 'celsius',
    value: Number(prompt('Degrees Celsius:')),
  };

  const kelvin = measure.value + 273;
  return kelvin;
}

console.log(measureKelvin()); */

/* CODING CHALLENGE :

Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures.
    Example:[17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."
    
    Your tasks:
    1. Create a function 'printForecast'which takes in an array 'arr'and logs a string like the above to the console. Try it with both test datasets.
    2. Use the problem-solving framework: Understand the problem and break it up into sub-problems!
    
    Test data:
    Data1: [17, 21, 23]
    Data2: [12, 5, -5, 0, 4] */

const temp1 = [17, 21, 23];
const temp2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
  let tempString = '';

  for (let i = 0; i < arr.length; i++) {
    tempString += `${arr[i]}ºC in ${i + 1} days ... `;
  }

  return tempString;
}

console.log(printForecast(temp1));
console.log(printForecast(temp2));
