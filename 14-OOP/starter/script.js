'use strict';

// --------------------------------- //
// CHALLENGE 4
// --------------------------------- //

// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'child class of the 'CarCl'class

// 2. Make the 'charge' property private (not working yet, create the property outside of the contructor, then reassign it)

// 3. Implement the ability to chain the 'accelerate'and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl'class. Then experiment with chaining!

// Test data:
// car1: 'Rivian' going at 120 km/h, with a charge of 23%

const challenge04 = function () {
  class Car {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }

    accelerate() {
      this.speed += 10;
      console.log(
        `${this.make} has accelerated to ${this.speed} km/h (+10 km/h).`
      );
      return this;
    }

    brake() {
      this.speed -= 5;
      console.log(`${this.make} has slowed to ${this.speed} km/h (-5 km/h).`);
      return this;
    }
  }

  class EV extends Car {
    charge;

    constructor(make, speed, charge) {
      super(make, speed);
      this.charge = charge;
    }

    chargeBattery(chargeTo) {
      this.charge = chargeTo;
      console.log(`${this.make} has charged its battery to ${this.charge}%.`);
      return this;
    }

    accelerate() {
      this.speed += 20;
      this.charge--;
      console.log(
        `${this.make} has accelerated to ${this.speed} km/h (+220 km/h) and has a charge of ${this.charge}%.`
      );
      return this;
    }
  }

  const riv = new EV('Rivian', 120, 23);
  console.log(riv);
  riv.accelerate().brake().chargeBattery(50).accelerate();
};
challenge04();

// --------------------------------- //
// 221 - ES6 CLASS SUMMARY
// --------------------------------- //
const lecture221 = function () {
  // just a lecture
};
//lecture221();

// --------------------------------- //
// 220 - CHAINING METHODS
// --------------------------------- //
const lecture220 = function () {
  class Account {
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      // protected property ( _ )
      this._pin = pin;
      this._movements = [];
      this.locale = navigator.language;
    }

    getMovements() {
      return this._movements;
    }

    deposit(val) {
      this._movements.push(val);
      return this;
    }

    withdrawal(val) {
      this.deposit(-val);
      return this;
    }

    _approveLoan(val) {
      return true;
    }

    requestLoan(val) {
      if (this._approveLoan(val)) {
        this.deposit(val);
      }
      return this;
    }
  }

  const acct1 = new Account('Bren', 'CAD', 1111);
  acct1
    .deposit(300)
    .deposit(500)
    .withdrawal(35)
    .requestLoan(25000)
    .withdrawal(4000);

  console.log(acct1.getMovements());
};
// lecture220();

// --------------------------------- //
// 219 - ENCAPSULATION: PRIVATE CLASS FIELDS AND METHODS - NOT WORKING YET
// --------------------------------- //
const lecture219 = function () {
  class Account {
    // public fields, exist on the INSTANCE
    locale = navigator.language;

    // private fields - inaccessable from the outside
    // #movements = [];
    // #pin;

    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      // this.#pin = pin;
    }

    getMovements() {
      // return this.#movements;
    }

    deposit(val) {
      // this.#movements.push(val);
    }

    withdrawal(val) {
      this.deposit(-val);
    }

    // #approveLoan(val) {return true;}

    requestLoan(val) {
      if (true /*this.#approveLoan(val)*/) {
        this.deposit(val);
        console.log('Loan approved!');
      }
    }
  }

  const acct1 = new Account('Bren', 'CAD', 1111);
  console.log(acct1.getMovements());
};
// lecture219();

// --------------------------------- //
// 218 - ENCAPSULATION: PROTECTED PROPERTIES AND METHODS
// --------------------------------- //
const lecture218 = function () {
  class Account {
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      // protected property ( _ )
      this._pin = pin;
      this._movements = [];
      this.locale = navigator.language;
    }

    getMovements() {
      return this._movements;
    }

    deposit(val) {
      this._movements.push(val);
    }

    withdrawal(val) {
      this.deposit(-val);
    }

    _approveLoan(val) {
      return true;
    }

    requestLoan(val) {
      if (this._approveLoan(val)) {
        this.deposit(val);
        console.log('Loan approved!');
      }
    }
  }

  const acct1 = new Account('Bren', 'CAD', 1111);
  console.log(acct1.getMovements());
};
// lecture218();

// --------------------------------- //
// 217 - ANOTHER CLASS EXAMPLE
// --------------------------------- //
const lecture217 = function () {
  class Account {
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.pin = pin;
      this.movements = [];
      this.locale = navigator.language;

      console.log(`Thanks for opening an account, ${owner}!`);
    }

    deposit(val) {
      this.movements.push(val);
    }

    withdrawal(val) {
      this.deposit(-val);
    }

    approveLoan(val) {
      return true;
    }

    requestLoan(val) {
      if (this.approveLoan(val)) {
        this.deposit(val);
        console.log('Loan approved!');
      }
    }
  }

  const acct1 = new Account('Bren', 'CAD', 1111);
  acct1.deposit(5000);
  acct1.withdrawal(450);
  acct1.requestLoan(1000); // method is not encapsulated, and can be accessed from outside!
  console.log(acct1);
};
// lecture217();

// --------------------------------- //
// 216 - INHERITANCE BETWEEN CLASSES: OBJECT.CREATE
// --------------------------------- //
const lecture216 = function () {
  const PersonProto = {
    calcAge() {
      console.log(2020 - this.birthYear);
    },

    // basically a constructor, but doesn't use the *new* keyword
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };

  const StudentProto = Object.create(PersonProto);

  StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
  };

  StudentProto.introduce = function () {
    console.log(`Hi, my name is ${this.firstName}.`);
  };

  const bren = Object.create(StudentProto);
  bren.init('Brennan', 1984, 'Comp Sci');

  bren.introduce(); // coming from StudentProto
  bren.calcAge(); // coming from PersonProto
};
// lecture216();

// --------------------------------- //
// 215 - INHERITANCE BETWEEN ES6 CLASSES
// --------------------------------- //
const lecture215 = function () {
  class Person {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    calcAge() {
      console.log(`I am ${2020 - this.birthYear} years old.`);
    }
  }

  class Student extends Person {
    constructor(fullName, birthYear, course) {
      // super always needs to happen first within the constructor
      super(fullName, birthYear);
      this.course = course;
    }

    introduce() {
      console.log(`My name is ${this.fullName} and I taking ${this.course}.`);
    }

    calcAge() {
      console.log(
        `I am ${2020 - this.birthYear} years old, but I feel like I am ${
          2020 - this.birthYear - 5
        }!`
      );
    }
  }

  const Abi = new Student('Abi MacGregor', 1984, 'Writing');
  Abi.introduce();
  Abi.calcAge();
};
// lecture215();

// --------------------------------- //
// CHALLENGE 3
// --------------------------------- //

// 1. Use a constructor function to implement an ElectricCar (called 'EV') as a child"class"of 'Car'. Besides a make and current speed, the 'EV'also has the current battery charge in % ('charge'property)

// 2. Implement a 'chargeBattery'method which takes an argument 'chargeTo'and sets the battery charge to 'chargeTo'

// 3. Implement an 'accelerate'method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'

// 4. Create an electric car object and experiment with calling 'accelerate', 'brake'and 'chargeBattery'(charge to 90%).

// Test data:
// car1: 'Tesla'going at 120 km/h, with a charge of 23%

const challenge03 = function () {
  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  };

  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(
      `${this.make} has accelerated to ${this.speed} kh/h (+10 km/h).`
    );
  };

  Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} has slowed to ${this.speed} kh/h (-5 km/h).`);
  };

  const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
  };

  EV.prototype = Object.create(Car.prototype);
  EV.prototype.constructor = EV; // not required for the challenge, but here for completeness

  const tesla = new EV('Tesla', 120, 23);

  EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
    console.log(`Battery charged to ${this.charge}%.`);
  };

  EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(
      `${this.make} has accellerated to ${this.speed} km/h (+20 km/h) and has a charge of ${this.charge}%.`
    );
  };

  tesla.accelerate();
  tesla.brake();
  tesla.chargeBattery(50);
  tesla.accelerate();
};
// challenge03();

// --------------------------------- //
// 213 - INHERITANCE BETWEEN CLASSES: CONSTRUCTOR FUNCTIONS
// --------------------------------- //
const lecture213 = function () {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.prototype.calcAge = function () {
    console.log(2020 - this.birthYear);
  };

  // Student has all of the same properties as Person, but also has a Course property
  const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear); // we need to use call to point *this* at the current Student
    this.course = course;
  };

  // before we create a Student instance, we need to point the prototype at the parent, Person
  Student.prototype = Object.create(Person.prototype);

  const bren = new Student('Brennan', 1984, 'Computer Science');
  console.log(bren);
  Student.prototype.introduce = function () {
    console.log(`Hi, my name is ${this.firstName}.  I study ${this.course}.`);
  };
  bren.introduce();

  // calcAge lives in Person, so we move up the prototype chain from Student to Person and get this from there via Inheritance
  bren.calcAge();
  console.log(bren.__proto__);
  console.log(bren.__proto__.__proto__);

  console.log(Student.prototype.constructor); // points to person, but the constructor should point to Student
  // the reason this happens is because we set the prototype with Object.Create

  Student.prototype.constructor = Student; // fixing the constructor, re-pointing it to Student
  console.log(Student.prototype.constructor);

  // bren is both a Student and a Person
  console.log(bren instanceof Student, bren instanceof Person);
};
// lecture213();

// --------------------------------- //
// CHALLENGE 2
// --------------------------------- //

// 1. Re-create Challenge #1, but this time using an ES6 class(call it'CarCl')

// 2. Add a getter called 'speedUS'which returns the current speed in mi/h (divide by 1.6)

// 3. Add a setter called 'speedUS'which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)

// 4. Create a newcar and experiment with the 'accelerate'and'brake'methods, and with the getter and setter.

// Test data:
// car1: 'Ford'going at 120 km/h

const challenge02 = function () {
  class carCl {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }

    accelerate() {
      this.speed += 10;
      console.log(
        `${this.make} has accelerated to ${this.speed} kh/h (+10 km/h).`
      );
    }

    brake() {
      this.speed -= 5;
      console.log(`${this.make} has slowed to ${this.speed} kh/h (-5 km/h).`);
    }

    speedometer() {
      console.log(`${this.speed} km/h | ${this.speedUS} m/h`);
    }

    get speedUS() {
      return this.speed / 1.6;
    }

    set speedUS(speed) {
      this.speed = speed * 1.6;
    }
  }

  const ford = new carCl('Ford', 120);
  ford.speedometer();
  ford.accelerate();
  ford.accelerate();
  ford.brake();
  ford.speedometer();
  console.log('Setting speed to 50 m/h');
  ford.speedUS = 50;
  ford.speedometer();
};
// challenge02();

// --------------------------------- //
// 211 - OBJECT.CREATE
// --------------------------------- //
const lecture211 = function () {
  const PersonProto = {
    calcAge() {
      console.log(2020 - this.birthYear);
    },

    // basically a constructor, but doesn't use the *new* keyword
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };

  const bren = Object.create(PersonProto);
  console.log(bren);
  bren.name = 'Brennan';
  bren.birthYear = 1984;
  console.log(bren);
  bren.calcAge();
  console.log(bren.__proto__);

  const abi = Object.create(PersonProto);
  abi.init('Abigail', 1984);
  console.log(abi);
  abi.calcAge();
};
// lecture211();

// --------------------------------- //
// 210 - STATIC METHODS
// --------------------------------- //
const lecture210 = function () {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.hey = function () {
    console.log('Hey there :)');
    console.log(this);
  };

  // instanced method
  Person.hey();

  const bren = new Person('Brennan', 1984);
  // bren.hey(); // hey is not inherited by bren

  class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    // static method
    static hey() {
      console.log('Hey there :)');
      console.log(this);
    }

    hey2() {
      console.log('Hey2');
      console.log(this);
    }
  }

  PersonCl.hey();
  const abi = new PersonCl('Abigail', 1984);
  console.log(abi);
  // abi.hey(); // can't access the static method outside of the object
  abi.hey2(); // can access the public method though
};
// lecture210();

// --------------------------------- //
// 209 - SETTERS AND GETTERS
// --------------------------------- //
const lecture209 = function () {
  const account = {
    owner: 'bren',
    movements: [200, -50, 120],

    get latest() {
      return this.movements.slice(-1).pop();
    },

    set latest(mov) {
      this.movements.push(mov);
    },
  };

  account.latest = 75; // using the setter
  console.log(account.latest); // showing the getter

  class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    get age() {
      return 2020 - this.birthYear;
    }

    // setting a property that already exists
    set fullName(name) {
      console.log(name);
      if (name.includes(' ')) this._fullName = name;
      else alert(`${name} is not a full name!`);
    }

    get fullName() {
      return this._fullName;
    }
  }

  const abi = new PersonCl('Abigail MacGregor', 1984);
  console.log(abi.age);

  const bren = new PersonCl('Brennan', 1984);
};
// lecture209();

// --------------------------------- //
// 208 - ES6 CLASSES
// --------------------------------- //
const lecture208 = function () {
  // class expression (as before)
  const PersonECl = class {};

  // class declaration (ES6)
  class PersonCl {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }

    // methods outside of the constructor are on the prototype and not on the object itself
    calcAge() {
      console.log(2020 - this.birthYear);
    }
  }

  // if we want, we can also add methods outside of the object
  PersonCl.prototype.greet = function () {
    console.log(`Hi ${this.firstName}!`);
  };

  const abi = new PersonCl('Abigail', 1984);
  console.log(abi);
  abi.calcAge();
  abi.greet();

  // 1. Classes are NOT hoisted, we can't use them before they are declared
  // 2. Classes are first-class citizens; we can pass them into functions and return them from functions
  // 3. The body of a class is always executed in Strict mode
};
// lecture208();

// --------------------------------- //
// CHALLENGE 1
// --------------------------------- //

// 1. Use a constructor function to implement a 'Car'. A car has a 'make'and a 'speed'property. The 'speed'property is the current speed of the car in km/h

// 2. Implement an 'accelerate'method that will increase the car's speed by 10, and log the new speed to the console

// 3. Implement a 'brake'method that will decrease the car's speed by 5, and log the new speed to the console

// 4. Create 2 'Car'objects and experiment with calling 'accelerate'and 'brake'multiple times on each of them

// Test data
// car1: 'BMW'going at 120 km/h
// car2: 'Mercedes'going at 95 km/h

const challenge01 = function () {
  const hr = '-----------------------------------------';
  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  };

  Car.prototype.speedCheck = function () {
    console.log(`${this.make} is travelling at ${this.speed} km/h.`);
  };

  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(
      `${this.make} has accelerated to ${this.speed} kh/h (+10 km/h).`
    );
  };

  Car.prototype.brake = function () {
    if (this.speed > 0) {
      this.speed -= 5;
      console.log(`${this.make} has slowed to ${this.speed} kh/h (-5 km/h).`);
    } else {
      console.log(`${this.make} can't brake (${this.speed} km/h).`);
    }
  };

  Car.prototype.turbo = function () {
    this.speed += 200;
    console.log(
      `${this.make} has activated TURBO MODE and is going at ${this.speed} km/h!`
    );
  };

  Car.prototype.wreck = function () {
    this.speed = 0;
    console.log(`${this.make} has crashed!`);
  };

  const bmw = new Car('BMW', 120);
  const mercedes = new Car('Mercedes', 95);

  console.log(hr);
  bmw.speedCheck();
  bmw.accelerate();
  bmw.accelerate();
  bmw.brake();
  console.log(hr);
  mercedes.speedCheck();
  mercedes.accelerate();
  mercedes.brake();
  mercedes.brake();
  console.log(hr);
  bmw.accelerate();
  mercedes.accelerate();
  mercedes.turbo();
  console.log(hr);
  bmw.wreck();
  bmw.brake();
  bmw.accelerate();
};
// challenge01();

// --------------------------------- //
// 206 - PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
// --------------------------------- //
const lecture206 = function () {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };
  const bren = new Person('Brennan', 1984);

  Person.prototype.calcAge = function () {
    console.log(2020 - this.birthYear);
  };

  Person.prototype.species = 'Homo Sapiens';

  console.log(bren.__proto__); // person prototype
  console.log(bren.__proto__.__proto__); // object prototype
  console.log(bren.__proto__.__proto__.__proto__); // null, no inhertiance from object

  console.log(Person.prototype.constructor);
  console.dir(Person.prototype.constructor);

  const arr = [3, 6, 4, 5, 6, 9, 3, 9, 9, 9, 9]; // [] === new Array
  console.log(arr.__proto__); // arrays inherit a bunch of methods from its prototype

  // extending array functionality - generally not a good idea to extend oob objects
  Array.prototype.unique = function () {
    return [...new Set(this)];
  };

  console.log(arr);
  console.log(arr.unique());

  const h1 = document.querySelector('h1');
  console.log(h1);
  console.dir(x => x + 1);
};
// lecture206();

// --------------------------------- //
// 205 - PROTOTYPAL INHERITANCE AND THE PROTOTYPE CHAIN
// --------------------------------- //
const lecture205 = function () {
  // just a lecture
  //
  // any function with a new operator, a new empty object is created
  // then, *this* is set to the new empty object
  // then, the new object is linked to the constructor's new __proto__ property
  // - __proto__ always points to the object's prototype
  // the object is then returned, unless we explicitly return something else (which would be weird to do)
};
// lecture205();

// --------------------------------- //
// 204 - PROTOTYPES
// --------------------------------- //
const lecture204 = function () {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };
  const bren = new Person('Brennan', 1984);

  // Prototypes - adding a new method to an object
  Person.prototype.calcAge = function () {
    console.log(2020 - this.birthYear);
  };

  // even though the method is not on the object itself, we have access to it due to prototypal inheritance!
  bren.calcAge();

  console.log(bren.__proto__);
  console.log(bren.__proto__ === Person.prototype);
  console.log(Person.prototype.isPrototypeOf(bren));
  console.log(Person.prototype.isPrototypeOf(Person));

  // the prototype property is really the prototype of the LINKED OBJECT
  // the NEW operator links the proto-property, setting the value to the prototype property of the constructor function
  // __proto__ is a property of the instance

  // setting a COMMON DATA property, similar to creating a prototypical method
  Person.prototype.species = 'Homo Sapiens';
  console.log(bren); // species is not directly owned by the object...
  console.log(bren.species); // ...it needs to be directly accessed
  console.log(bren.hasOwnProperty('firstName'));
  console.log(bren.hasOwnProperty('species'));
};
// lecture204();

// --------------------------------- //
// 203 - CONSTRUCTOR FUNCTIONS AND THE *NEW* OPERATOR
// --------------------------------- //
const lecture203 = function () {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // do NOT create methods inside of constructor functions like the below!  Bad for performance!
    // this.calcAge = function (){console.log(2020 - this.birthYear);}
  };

  // 1. new empty object is created
  // 2. function is called - *this* is set to the newly created object
  // 3. newly created object is linked to a prototype
  // 4. object created in the beginnging is automatically returned from the constructor function

  const bren = new Person('Brennan', 1984);
  console.log(bren);

  const abi = new Person('Abigail', 1984);
  const dyl = new Person('Dylan', 1985);
  console.log(abi, dyl);

  const mom = 'Mom';

  console.log(bren instanceof Person, mom instanceof Person);
};
// lecture203();

// --------------------------------- //
// 202 - OOP IN JAVASCRIPT
// --------------------------------- //
const lecture202 = function () {
  // just a lecture
  //
  // class is a blueprint to create actual objects - instances of that class
  // JavaScript has Prototypes, which contain properties and methods
  // - Linked objects can use these properties and methods through *prototypal inheritance*
  // - in this case, the instance inherits from the class.  Also called delegation
  //
  // CONSTRUCTOR FUNCTIONS: builds objects from functions - things like Arrays, Maps, and Sets
  // ES6 CLASSES: Work exactly like constructor functions, but use a nicer syntax
  // OBJECT.CREATE: Easiest, most straightforward way of creating objects, but less used than the other two
};
// lecture202();

// --------------------------------- //
// 201 - WHAT IS OBJECT ORIENTED PROGRAMMING
// --------------------------------- //
const lecture201 = function () {
  // just a lecture
  //
  // code style is based on objects to model data
  // objects can contain properties (data) and methods (code)
  // discussion about classes and instances of those classes
  //
  // ABSTRACTION: Ignoring or hiding details thta don't matter
  // - the class *could* include all of the detail required, but we really only want to include relevant items
  // ENCAPSULATION: Keeps some properties and methods accessible only within the class; some can be exposed
  // - we want external code to be unable to modify internal states
  // INHERITANCE: Similar classes should be bundled together to avoid duplicate code
  // - we can use inheritance so that child classes extends the parent class properties and methods
  // POLYMORPHISM: Child classes can overwrite methods inherited from the parent
};
// lecture201();
