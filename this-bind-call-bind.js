/*
🔹 Understanding this in JavaScript
In JavaScript, the value of this depends on how a function is called. Here are the 4 rules for determining the value of this:
Global Context (this in the global scope)
In a regular function (non-strict mode), this refers to the global object (window in browsers).
In strict mode, this is undefined.
Method Context
When a function is called as a method (e.g., obj.method()), this refers to the object that owns the method.
Constructor Function Context
When a function is called as a constructor (e.g., new MyClass()), this refers to the newly created object.
Explicit Binding (with call, apply, or bind)
These methods allow you to explicitly define the value of this in the function.
*/

///////////////////////////////////////Example – Basic Usage of this
const person = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function () {
        return this.firstName + ' ' + this.lastName;
    }
};

console.log(person.fullName());  // Output: John Doe
//In this case, this refers to person.

/////////////////🔹 bind, call, and apply
//These are all ways to explicitly set the value of this.

//bind(): Returns a new function where this is permanently bound to the provided object.
const person1 = {
    firstName: 'John',
    lastName: 'Doe',
};
function greet() {
    console.log(`Hello, ${this.firstName} ${this.lastName}`);
}
const greetPerson = greet.bind(person1);
greetPerson();  // Output: Hello, John Doe



//call(): Immediately invokes the function with the specified this value and arguments.
function greet(age) {
    console.log(`Hello, ${this.firstName} ${this.lastName}. You are ${age} years old.`);
}
greet.call(person1, 30);  // Output: Hello, John Doe. You are 30 years old.



//apply(): Similar to call(), but arguments are passed as an array(or array - like object).
greet.apply(person1, [30]);  // Output: Hello, John Doe. You are 30 years old.

