'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}M People</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////
// CODING CHALLENGE #3
///////////////////////////////////////
// PART 1
// 1. Write an asyncfunction 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G” in the dev tools Network tab
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs'array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array
// 5. Add the 'parallel'class to all the images (it has some CSS styles)
// Test data Part 2:
// ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function
const codingChallenge3 = function () {
  const imgContainer = document.querySelector('.images');

  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;

      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });

      img.addEventListener('error', function () {
        reject(new Error('Image not found!'));
      });
    });
  };

  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

  const loadAll = async function (imgArr) {
    try {
      const imgs = imgArr.map(async img => await createImage(img));
      console.log(imgs); // we get three promises back from the async function

      // getting the images from the promise array
      const imgEl = await Promise.all(imgs);
      console.log(imgEl);

      imgEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
      console.error(err.message);
    }
  };

  loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

  const loadAndPause = async function () {
    try {
      // await image 1 load
      let image = await createImage('img/img-1.jpg');
      console.log('Image 1 loaded');

      // await wait 2s
      await wait(2);
      console.log('Waited 2 seconds');

      // clear canvas
      image.style.display = 'none';
      console.log('Cleared canvas once');

      // await image 2
      image = await createImage('img/img-2.jpg');
      console.log('Image 2 loaded');

      // await wait 2s
      await wait(2);
      console.log('Waited another 2 seconds');

      // clear canvas again
      image.style.display = 'none';
      console.log('Cleared canvas again');
    } catch (err) {
      console.error(err.message);
    }
  };

  // loadAndPause();
};
codingChallenge3();

///////////////////////////////////////
// LECTURE 260 - OTHER PROMISE COMBINATORS: RACE, ALLSETTLED, AND ANY
///////////////////////////////////////
const lecture260 = function () {
  (async function () {
    const res = await Promise.race([
      getJson(`https://restcountries.eu/rest/v2/name/ireland`),
      getJson(`https://restcountries.eu/rest/v2/name/egypt`),
      getJson(`https://restcountries.eu/rest/v2/name/mexico`),
    ]);
    console.log('Promise.Race():', res[0]);
  })();

  const timeout = function (sec) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error('Request timed out.'));
      }, sec * 1000);
    });
  };

  Promise.race([
    getJson(`https://restcountries.eu/rest/v2/name/tanzania`),
    timeout(0.35),
  ])
    .then(res => console.log('Race with timeout:', res[0]))
    .catch(err => console.error('Race with timeout:', err.message));

  Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Success'),
  ]).then(res => console.log('Promise.AllSettled:', res));

  Promise.all([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Success'),
  ])
    .then(res => console.log('Promise.All:', res))
    .catch(err => console.error('Promise.All:', err.message));

  Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Success'),
  ])
    .then(res => console.log('Promise.Any:', res))
    .catch(err => console.error('Promise.Any:', err.message));
};
// lecture260();

///////////////////////////////////////
// LECTURE 259 - RUNNING PROMISES IN PARALLEL
///////////////////////////////////////
const lecture259 = function () {
  const getThreeCountries = async function (c1, c2, c3) {
    try {
      /* const [data1] = await getJson(
        `https://restcountries.eu/rest/v2/name/${c1}`
      );
      const [data2] = await getJson(
        `https://restcountries.eu/rest/v2/name/${c2}`
      );
      const [data3] = await getJson(
        `https://restcountries.eu/rest/v2/name/${c3}`
      ); */

      const data = await Promise.all([
        getJson(`https://restcountries.eu/rest/v2/name/${c1}`),
        getJson(`https://restcountries.eu/rest/v2/name/${c2}`),
        getJson(`https://restcountries.eu/rest/v2/name/${c3}`),
      ]);

      //console.log(data1.capital, data2.capital, data3.capital);
      // console.log(data);
      console.log(data.map(d => d[0].capital));
    } catch (err) {
      console.error(err.message);
    }
  };

  getThreeCountries('portugal', 'canada', 'ireland');
};
// lecture259();

///////////////////////////////////////
// LECTURE 258 - RETURNING VALUES FROM ASYNC FUNCTIONS
///////////////////////////////////////
const lecture258 = function () {
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const whereAmI = async function (country) {
    try {
      // GeoLocation
      const pos = await getPosition();
      const { latitude: lat, longitude: lng } = pos.coords;

      // Reverse Geocoding
      const resGeo = await fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json`
      );
      if (!resGeo.ok) throw new Error('Problem getting location data');

      const dataGeo = await resGeo.json();

      // Country data
      const res = await fetch(
        `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
      );
      if (!resGeo.ok) throw new Error('Problem with supplied country');

      const data = await res.json();
      renderCountry(data[0]);
      countriesContainer.style.opacity = 1;

      return `You are located in ${dataGeo.city}, ${dataGeo.country}.`;
    } catch (err) {
      console.error(err.message);
      renderError(`Something went wrong - ${err.message}`);
      countriesContainer.style.opacity = 1;

      // Rejecting the promise from the async function
      throw err;
    }
  };

  console.log('1: Getting location');
  /* whereAmI()
    .then(city => console.log('2:', city))
    .catch(err => console.error('2:', err.message))
    .finally(() => console.log('3: Finished getting location')); */

  (async function () {
    try {
      const city = await whereAmI();
      console.log(`2: ${city}`);
    } catch (err) {
      console.error(`2: ${err.message}`);
    }
    console.log('3: Finished getting location');
  })();
};
// lecture258();

///////////////////////////////////////
// LECTURE 257 - ERROR HANDLING WITH TRY/CATCH
///////////////////////////////////////
const lecture257 = function () {
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const whereAmI = async function (country) {
    try {
      // GeoLocation
      const pos = await getPosition();
      const { latitude: lat, longitude: lng } = pos.coords;

      // Reverse Geocoding
      const resGeo = await fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json`
      );
      if (!resGeo.ok) throw new Error('Problem getting location data');

      const dataGeo = await resGeo.json();

      // Country data
      const res = await fetch(
        `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
      );
      if (!resGeo.ok) throw new Error('Problem with supplied country');

      const data = await res.json();
      renderCountry(data[0]);
      countriesContainer.style.opacity = 1;
    } catch (err) {
      console.error(err.message);
      renderError(`Something went wrong - ${err.message}`);
      countriesContainer.style.opacity = 1;
    }
  };

  whereAmI();
  whereAmI();
  whereAmI();
  whereAmI();
};
// lecture257();

///////////////////////////////////////
// LECTURE 256 - CONSUMING PROMISES WITH ASYNC/AWAIT
///////////////////////////////////////
const lecture256 = function () {
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const whereAmI = async function (country) {
    // GeoLocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    const data = await res.json();
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;
  };

  whereAmI();
};
// lecture256();

///////////////////////////////////////
// CODING CHALLENGE #2
///////////////////////////////////////
// For this challenge you will actually have to watch the video! Then, build the image loading functionality that I just showed you on the screen.
// Tasks are not super-descriptive this time, so that you can figure out some stuff by yourself. Pretend you're working on your own
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .srcattribute to the provided image path
// 2. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error'event), reject the promise
// If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set displayCSS property to 'none'), and load a second image (Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data:
// Images in the imgfolder. Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast
const codingChallenge2 = function () {
  const imgContainer = document.querySelector('.images');
  let currentImg;

  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;

      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });

      img.addEventListener('error', function () {
        reject(new Error('Image not found!'));
      });
    });
  };

  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

  createImage('img/img-1.jpg')
    .then(img => {
      currentImg = img;
      console.log('Image 1 loaded');
      return wait(2);
    })
    .then(() => {
      console.log('2 seconds passed');
      currentImg.style.display = 'none';
      return createImage('img/img-2.jpg');
    })
    .then(img => {
      currentImg = img;
      console.log('Image 2 loaded');
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = 'none';
      console.log('Another 2 seconds passed');
      console.log('Canvas Cleared');
    })
    .catch(err => console.error(err));
};
// codingChallenge2();

///////////////////////////////////////
// LECTURE 254 - PROMISIFYING THE GEOLOCATION API
///////////////////////////////////////
const lecture254 = function () {
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getPosition()
    .then(pos => console.log(pos))
    .catch(err => console.error(err));

  const whereAmI = function () {
    getPosition()
      .then(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;

        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      })
      .then(res => {
        if (!res.ok)
          throw new Error(
            `Something went wrong: ${res.statusText} - ${res.status}`
          );
        return res.json();
      })
      .then(data => {
        console.log(`You are in ${data.city}, ${data.country}.`);

        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
      })
      .then(res => {
        if (!res.ok)
          throw new Error(
            `Country not found: ${res.statusText} - ${res.status}`
          );
        return res.json();
      })
      .then(data => renderCountry(data[0]))
      .catch(err => console.error(`Error: ${err.message}`))
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', whereAmI);
};
// lecture254();

///////////////////////////////////////
// LECTURE 253 - BUILDING A SIMPLE PROMISE
///////////////////////////////////////
const lecture253 = function () {
  // creating the promise
  const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery draw in progress...');
    setTimeout(function () {
      if (Math.random() >= 0.5) {
        resolve('You WIN!'); // success
      } else {
        reject(new Error('Please Play Again.')); // failure
      }
    }, 2000);
  });

  // consuming the promise
  lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

  // promisifying setTimeout
  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

  wait(2)
    .then(() => {
      console.log('I waited for two seconds.');
      return wait(1);
    })
    .then(() => console.log('I waited for one second.'));

  Promise.resolve('Resolves Immediately').then(x => console.log(x));
  Promise.reject(new Error('Rejected Immediately')).catch(x =>
    console.error(x)
  );
};
// lecture253();

///////////////////////////////////////
// LECTURE 252 - THE EVENT LOOP IN PRACTICE
///////////////////////////////////////
const lecture252 = function () {
  console.log('Test Start'); // top level code will run first
  setTimeout(() => console.log('Zero second timer'), 0); // timer is not a microtask, so it gets bumped in the queue by the promises
  Promise.resolve('Resolved Promise 1').then(res => console.log(res)); // microtask runs before the timer
  Promise.resolve('Resolved Promise 2').then(res => {
    for (let i = 0; i < 1000000000; i++) {}
    console.log(res);
  }); // this microtask takes a LONG time to complete, delaying our downstream zero second timer
  console.log('Test Ended'); // top level code will run first, IN ORDER
};
// lecture252();

///////////////////////////////////////
// LECTURE 251 - ASYNCRONOUS BEHIND THE SCENES: THE EVENT LOOP
///////////////////////////////////////
const lecture251 = function () {
  // just a lecture on runtime and the event loop
};
// lecture251();

///////////////////////////////////////
// CODING CHALLENGE #1
///////////////////////////////////////
// In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. So in this challenge, you’ll use an API on your own for the first time
// PART 1
//  1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples arein test databelow).
//  2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetchAPI and promises to get the data. Do not use the 'getJSON' function we created, that is cheating
//  3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console:
//  - “You are in Berlin, Germany”
//  4. Chain a .catch method to the end of the promise chain and log errors to the console
//  5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch()does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
// PART 2
//  6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
//  7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
// Test data:
//  Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
//  Coordinates 2: 19.037, 72.873
//  Coordinates 3: -33.933, 18.474
const codingChallenge1 = function () {
  const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(response => {
        if (!response.ok)
          throw new Error(
            `Something went wrong (${response.statusText} - ${response.status})`
          );
        return response.json();
      })
      .then(data => {
        console.log(`You are in ${data.city}, ${data.country}.`);

        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
      })
      .then(response => response.json())
      .then(data => renderCountry(data[0]))
      .catch(err => console.error(`Error: ${err.message}`))
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  whereAmI(52.508, 13.381); // berlin
  // whereAmI(19.037, 72.873); // mumbai
  // whereAmI(-33.933, 18.474); // cape town
};
// codingChallenge1();

///////////////////////////////////////
// LECTURE 249 - THROWING ERRORS MANUALLY
///////////////////////////////////////
const lecture249 = function () {
  const getCountryData = function (country) {
    getJson(
      `https://restcountries.eu/rest/v2/name/${country}`,
      'country not found'
    )
      .then(data => {
        renderCountry(data[0]);

        const neighbour = data[0].borders[0];
        // const neighbour = 'scotland'; // forcing an error

        if (!neighbour) throw new Error('no neighbour found');

        return getJson(
          `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
          'country not found'
        );
      })
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err}`);
        renderError(`Something went wrong - ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', function () {
    // getCountryData('el salvador');
    // getCountryData('scotland'); // forcing an error
    getCountryData('australia'); // real country, no neighbour
  });
};
// lecture249();

///////////////////////////////////////
// LECTURE 248 - HANDLING REJECTED PROMISES
///////////////////////////////////////
const lecture248 = function () {
  const getCountryDataClean = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(
        response => response.json()
        // ,err => alert(err) // handling an error on the initial fetch
      )
      .then(data => {
        renderCountry(data[0]);

        const neighbour = data[0].borders[0];

        if (!neighbour) return;

        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
      })
      .then(response => response.json())
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`Error encountered! ${err}`);
        renderError(`Something went wrong! ${err.message}. Please try again.`);
      }) // handling ALL errors in the entire chain
      // then is only called when the promise is true, catch runs on errors, finally ALWAYS runs
      .finally(() => {
        // always fade the container in - commented out of global functions
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', function () {
    // getCountryDataClean('el salvador');
    // getCountryDataClean('scotland'); // forcing an error
    // getCountryDataClean('south africa');
  });
};
// lecture248();

///////////////////////////////////////
// LECTURE 247 - CHAINING PROMISES
///////////////////////////////////////
const lecture247 = function () {
  const getCountryDataClean = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(response => response.json())
      .then(data => {
        renderCountry(data[0]);

        // once we've grabbed the rendered country, additional logic to grab the neighbour
        const neighbour = data[0].borders[0];

        if (!neighbour) return;

        // get neighbouring country
        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
      })
      // do not include callback then's in the promise, handle it outside
      .then(response => response.json())
      .then(data => renderCountry(data, 'neighbour'));
  };
  getCountryDataClean('lesotho');
};
// lecture247();

///////////////////////////////////////
// LECTURE 246 - CONSUMING PROMISES
///////////////////////////////////////
const lecture246 = function () {
  // left here for example purposes
  const getCountryDataOld = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(function (response) {
        //console.log(response);
        // we want the data, which we need to use JSON to get
        return response.json(); // this method ALSO returns a promise
      })
      .then(function (data) {
        console.log(data); // back to the same data as before!
        renderCountry(data[0]);
      });
  };

  // simplified version of the above function using arrows
  const getCountryDataClean = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(response => response.json())
      .then(data => renderCountry(data[0]));
  };
  getCountryDataClean('poland');
};
// lecture246();

///////////////////////////////////////
// LECTURE 245 - PROMISES AND THE FETCH API
///////////////////////////////////////
const lecture245 = function () {
  // modern way of doing AJAX calls using FetchAPI
  const country = 'ireland';
  // creating a promise
  const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`);

  // promises are containers for async values, waiting to receive them in the future
  // promises allow us to skip events and callback functions, making our code much cleaner
  // promises can be chained, instead of nested
  // promises change over time: pending -> settled (fulfilled or rejected)
  // - promises are only ever settled once
  // promises can be consumed once they are returned
};
// lecture245();

///////////////////////////////////////
// LECTURE 244 - WELCOME TO CALLBACK HELL
///////////////////////////////////////
const lecture244 = function () {
  // we want to create a sequence on AJAX calls
  const getCountryAndNeighbour = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);

      // render country one
      renderCountry(data);

      // getting the neighbour country
      const [neighbour] = data.borders;

      if (!neighbour) return;

      const request2 = new XMLHttpRequest();
      request2.open(
        'GET',
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`
      );
      request2.send();

      // nested callback
      request2.addEventListener('load', function () {
        const data2 = JSON.parse(this.responseText);
        renderCountry(data2, 'neighbour');
      });
    });
  };

  getCountryAndNeighbour('germany');
};
// lecture244();

///////////////////////////////////////
// LECTURE 243 - HOW THE WEB WORKS: REQUESTS AND RESPONSES
///////////////////////////////////////
const lecture243 = function () {
  // just a lecture on how the web works
  // - clients send REQUESTS, servers send back RESPONSES
  // - this is client/server architecture
  // http or https is the PROTOCOL
  // "google.com" or "whatever.gov" is the DOMAIN NAME
  // ../stuffAfterTheDomain is the RESOURCE
  // DNS converts the domain to the real IP (104.27.142.889) and the POST (:443)
  // - https://104.27.142.889:443 - complete address
  // TCP/IP determines how data moves across the internet
  // - client makes an http request (request/response)
  // - request gets formed and hits the server, and is sent back with an HTTP response
  // - when everything arrives, the page can be rendered based on html and css
  // TCP breaks the requests and responses into packets
  // When they arrive, they are reassembled by TCP, allowing packets to take numerous routes across the internet to make everything run faster
  // The IP protocol sends stuff to the right place(s)
};
// lecture243();

///////////////////////////////////////
// LECTURE 242 - OUR FIRST AJAX CALL - XMLHTTPREQUEST
///////////////////////////////////////
const lecture242 = function () {
  // lecture on the old way to do AJAX

  const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    // google github public api's, grab the api endpoint
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    // once the request loads, then we want to do something with the retrieved data
    request.addEventListener('load', function () {
      // console.log(this.responseText); // we get a JSON string back

      const [data] = JSON.parse(this.responseText); // converting the JSON to an object and destructing it
      console.log(data);

      const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M People</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  };

  getCountryData('ireland');
  getCountryData('canada');
};
// lecture242();

///////////////////////////////////////
// LECTURE 241 - ASYNCRONOUS JAVASCRIPT, AJAX, AND API'S
///////////////////////////////////////
const lecture241 = function () {
  // just a lecture on sync vs async operations
  // timers run asyncronously, and images are loaded asynchronously
  // AJAX stands for "Asynchronous JavaScript and XML"
  // - used to request data dynamically, without needing to reload the page
  // - AJAX grabs server data, and returns it to the client
  // an API (Application Programming Interface) allows apps to talk to one another and exchange information
  // - API's are self contained, and allow other apps to interact with then
  // - self contained classes are ALSO API's
  // - AJAX uses online API's, retrieving data, and sending it back to the client (also called WEB API's)
  // AJAX grabs JSON data, which is a stringed JS object
};
// lecture241();
