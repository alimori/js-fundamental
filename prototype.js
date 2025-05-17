/*1️⃣ What is a prototype?
Every JavaScript object has an internal link to another object called its prototype.
The prototype object acts as a fallback — if a property/method is not found on the object itself, JS looks for 
it on the prototype. This forms a prototype chain.
*/

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello, I'm ${this.name}`;
};

const ali = new Person("Ali");

console.log(ali.sayHello()); // Hello, I'm Ali
console.log(ali.__proto__ === Person.prototype);  // true
console.log(Object.getPrototypeOf(ali) === Person.prototype);  // true



///////////////////////////// 2️⃣ Prototype chain example
const animal = {
  eats: true,
};

const rabbit = Object.create(animal);
rabbit.jumps = true;
console.log(rabbit.eats);  // true (found on animal prototype)
console.log(rabbit.jumps); // true (own property)



////////////////////////////////3️⃣ Constructor functions & prototypes
function Person1(name) {
  this.name = name;
}

Person1.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const alice = new Person1('Alice');
alice.sayHi();  // Hi, I'm Alice



/////////////////////////////// 4️⃣ __proto__ vs prototype
// __proto__ (deprecated but widely supported) is the internal link of an object to its prototype.
// prototype is a property of functions (constructor functions) that sets the prototype for objects created by that constructor.
alice.__proto__ === Person.prototype; // true



////////////////////////////////// 5️⃣ Class syntax (syntactic sugar over prototypes)

class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}



///////////////// SAMPLE 1
const parent = {
  foo: 'bar',
};

const child = Object.create(parent);
child.foo = 'baz';

console.log(child.foo); // baz
console.log(parent.foo);  // bar




////////////////// SAMPLE 2
function Car(make) {
  this.make = make;
}

Car.prototype.getMake = function () {
  return this.make;
};

const honda = new Car('Honda');
const tesla = new Car('Tesla');

console.log(honda.getMake === tesla.getMake); // true
//getMake is defined on Car.prototype, not inside the constructor. So both honda and tesla share the same getMake function.



/////////////////////// SAMPLE 3
const user = {
  isAdmin: false,
};

const admin = Object.create(user);
admin.isAdmin = true;

console.log(admin.__proto__ === user); // true, Because admin was created with Object.create(user) — it sets user as its prototype.
console.log(admin.isAdmin);           // true
console.log(user.isAdmin);            // false



/////////////////////// SAMPLE 4 : Prototype chain + shadowing + instanceof
function Animal(name) {
  this.name = name;
}

Animal.prototype.eats = true;

const dog = new Animal('Rex');
dog.eats = false;

console.log(dog.eats);                 // ? false
console.log(Animal.prototype.eats);    // ? true
console.log(dog.__proto__.eats);       // ? true , dog.__proto__ is Animal.prototype, which still has eats = true.
console.log(dog instanceof Animal);    // ? true , Because dog.__proto__ === Animal.prototype, and instanceof walks up the prototype chain.




/////////////////////////// SA<PLE 5: Dynamic Prototype Manipulation
const human = {
  species: 'Homo sapiens',
};

const person = {
  name: 'Alice',
};

Object.setPrototypeOf(person, human);

console.log(person.name);       // ? Alice
console.log(person.species);    // ? Homo sapiens
console.log(person.__proto__);  // ? `human` object , Object.setPrototypeOf(person, human) made human the prototype of person.



//////////////////// SAMPLE 6: ES6 Classes + Inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}

const d = new Dog('Rex');

console.log(d.speak());               // ? 	'Rex barks.'
console.log(d instanceof Dog);       // ? true
console.log(d instanceof Animal);    // ? true 
console.log(Object.getPrototypeOf(d)); // ? Dog.prototype object



//////////////////// SAMPLE 7: Final Challenge: Manual Prototype + Class Mix
class Vehicle {
  constructor(type) {
    this.type = type;
  }
  start() {
    return `${this.type} started`;
  }
}

class Car {
  constructor(model) {
    this.model = model;
  }
  drive() {
    return `${this.model} driving`;
  }
}

// Manually set Car’s prototype to Vehicle’s prototype
Object.setPrototypeOf(Car.prototype, Vehicle.prototype);

const myCar = new Car('Tesla');

console.log(myCar.drive());    // ? 'Tesla driving'
console.log(myCar.start());    // ? 'Tesla started', start() is found on Vehicle.prototype, so myCar.start()
console.log(myCar instanceof Car);     // ? true, myCar.__proto__ === Car.prototype, so this is true.
console.log(myCar instanceof Vehicle); // ? true, Because Vehicle.prototype is in the prototype chain of myCar (via Car.prototype), this is also true


