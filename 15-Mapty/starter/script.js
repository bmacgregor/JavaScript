'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// --------------------------------------------------//
// CLASSES
// --------------------------------------------------//

class Workout {
  date = new Date();
  workoutUID = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.type = 'running';

    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // minutes per km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevGain) {
    super(coords, distance, duration);
    this.elevGain = elevGain;
    this.type = 'cycling';

    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km / h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  constructor() {
    // App object properties
    this.map;
    this.mapZoom = 13;
    this.mapEvent;
    this.workouts = [];

    // App object functions we want to run when an App is created (onLoad)
    this._getPosition(); // gets users position

    // get data from local storage
    this._getLocalStorage();

    // clicking on the map - live onLoad
    form.addEventListener('submit', this._newWorkout.bind(this));

    // toggling the workout type - live onLoad
    inputType.addEventListener('change', this._toggleElevationField.bind(this));

    // moves to the popup based on the list element clicked
    containerWorkouts.addEventListener('click', this._movetoPopup.bind(this));
  }

  // getting user's geolocation - runs onLoad
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Position not found.  Please reload.');
        }
      );
  }

  // loads the map, and sets the coordinates based on user location, runs from _getPosition
  _loadMap(position) {
    const coords = [position.coords.latitude, position.coords.longitude];

    // console.log(this);
    map = L.map('map').setView(coords, this.mapZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // handling map clicks
    map.on('click', this._showForm.bind(this));

    // rendering markers after the map is available
    this.workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  // shows form on left after a user clicks the map - runs the newWorkout after the form is submitted
  _showForm(mapE) {
    this.mapEvent = mapE; // needs to pass to form submit event handler
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // clear input fields
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  // toogles between Cadence and Elev Gain on Type change
  _toggleElevationField(e) {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _renderWorkoutMarker(workout) {
    // display marker
    L.marker(workout.coords)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-workoutUID="${
      workout.workoutUID
    }">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;
    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (workout.type === 'cycling') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }

    // insert the newly created html
    form.insertAdjacentHTML('afterend', html);
  }

  _movetoPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.workouts.find(
      work => work.workoutUID === workoutEl.dataset.workoutuid
    );

    // moving the map to centre on the workout coords
    map.setView(workout.coords, this.mapZoom, {
      animate: true,
      pan: {
        duration: 0.75,
      },
    });
  }

  _setLocalStorage() {
    // convert an object into a string, save it to local storage
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  _getLocalStorage() {
    // convert string into an object
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.workouts = data;
    this.workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  // removes workouts key from local storage - can be used through the console
  reset() {
    localStorage.removeItem('workouts');
    location.reload(); // reloads the page
  }

  // places map markers
  _newWorkout(e) {
    e.preventDefault();

    // get form data
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const [workLat, workLng] = [
      this.mapEvent.latlng.lat,
      this.mapEvent.latlng.lng,
    ];
    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;

      // data validation
      if (
        !dataCheck(distance, duration, cadence) ||
        !posCheck(distance, duration, cadence)
      )
        return alert('Input values have to be positive numbers!');

      // create new workout
      workout = new Running([workLat, workLng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevGain = +inputElevation.value;

      // data validation - elevGain CAN be negative!
      if (
        !dataCheck(distance, duration, elevGain) ||
        !posCheck(distance, duration)
      )
        return alert('Input values have to be positive numbers!');

      // create new workout
      workout = new Cycling([workLat, workLng], distance, duration, elevGain);
    }

    // add to workout array
    this.workouts.push(workout);

    // render workout on the map and list
    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);

    // clears input fields and hide the form
    this._hideForm();

    // set local storage for all workouts
    this._setLocalStorage();
  }
}

// --------------------------------------------------//
// VARIABLES
// --------------------------------------------------//

const app = new App(); // on create, everything in the constructor runs

// --------------------------------------------------//
// HELPER FUNCTIONS
// --------------------------------------------------//

// looks at EVERY input and returns true if they are all valid
const dataCheck = (...inputs) => inputs.every(inp => Number.isFinite(inp));

// looks at every input and returns true if they are all > 0
const posCheck = (...inputs) => inputs.every(inp => inp > 0);

// --------------------------------------------------//
// LECTURES
// --------------------------------------------------//

// --------------------------------------------------//
// 238 - FINAL THOUGHTS
// --------------------------------------------------//

// --------------------------------------------------//
// 233 - MANAGING WORKOUT DATA - CREATING CLASSES
// --------------------------------------------------//

// created parent Workout class, and child classes for Running and Cycling
const lecture233 = function () {
  const run1 = new Running([39, -12], 5.2, 24, 178);
  const bike1 = new Cycling([39, -12], 27, 95, 523);

  console.log(run1, bike1);
};
//lecture233();

// --------------------------------------------------//
// 232 - REFACTORING FOR PROJECT ARCHITECTURE
// --------------------------------------------------//

// moving all of lecture 230 into the App class

// --------------------------------------------------//
// 231 - PROJECT ARCHITECTURE
// --------------------------------------------------//

// just a lecture, planning the project architecture
// - workout class will be the parent, running and cycling will be child classes to inherit workout elements

// --------------------------------------------------//
// 230 - RENDERING THE WORKOUT INPUT FORM
// --------------------------------------------------//
const lecture230 = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const coords = [position.coords.latitude, position.coords.longitude];

        map = L.map('map').setView(coords, 13); // now that it's global, we can reassign into map

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // handling map clicks
        map.on('click', function (mapE) {
          mapEvent = mapE; // needs to pass to form submit event handler
          form.classList.remove('hidden');
          inputDistance.focus();

          // map event moved into submit event listener
        });
      },
      function () {
        alert('Position not found.  Please reload.');
      }
    );
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // clear input fields
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';

    // display marker
    L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  });

  inputType.addEventListener('change', function (e) {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  });
};
// lecture230();

// --------------------------------------------------//
// 229 - DISPLAYING A MAP MARKER
// --------------------------------------------------//
const lecture229 = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // const { latitude } = position.coords;
        // const { longitude } = position.coords;

        const coords = [position.coords.latitude, position.coords.longitude];

        const map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // original pin example
        /* L.marker(coords)
          .addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup(); */

        map.on('click', function (mapEvent) {
          // console.log(mapEvent);
          //const { lat, lng } = mapEvent.latlng;
          //L.marker([lat, lng]).addTo(map);

          //L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng]).addTo(map);

          /* L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng])
            .addTo(map)
            .bindPopup('Some String')
            .openPopup(); */

          L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng]) // grabs the coords from the mouseclick
            .addTo(map) // adds a marker to the map
            .bindPopup(
              L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false, // keeps the marker open
                closeOnClick: false, // similar to autoClose?  Needs both?
                className: 'running-popup', // sets the css styling
              })
            )
            .setPopupContent('Workout') // popup text
            .openPopup(); // once all properties are set, open the popup
        });
      },
      function () {
        alert('Position not found.  Please reload.');
      }
    );
  }
};
// lecture229();

// --------------------------------------------------//
// 228 - DISPLAYING A MAP USING THE LEAFLET LIBRARY
// --------------------------------------------------//
const lecture228 = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        const coords = [latitude, longitude];

        // 'L' is the leaflet namespace
        //const map = L.map('map').setView([51.505, -0.09], 13); // original leaflet map values
        const map = L.map('map').setView(coords, 13);

        //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // original theme
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker(coords)
          .addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();
      },
      function () {
        alert('Position not found.  Please reload.');
      }
    );
  }
};
// lecture228();

// --------------------------------------------------//
// 227 - USINB THE GEOLOCATION API
// --------------------------------------------------//
const lecture227 = function () {
  if (navigator.geolocation) {
    // using the navigator api
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // on success
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(latitude, longitude);
        // getting a link to the location
        console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
      },
      function () {
        alert('Could not get your position.'); // on failure
      }
    );
  }
};
// lecture227();
