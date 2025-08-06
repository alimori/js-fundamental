//  typeof
// Returns a string describing the type of a value (primitive types and functions mostly).

// Example:

typeof 42           // "number"
typeof "hello"      // "string"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof {}           // "object"
typeof []           // "object" ⚠️
typeof null         // "object" ⚠️
typeof function () { } // "function"

// ⚠️ Limitations:
// 1- Cannot detect arrays (typeof [] is "object")
// 2- Cannot detect class instances or distinguish between object types
// 3- typeof null is a long-standing bug — returns "object"!


// *************************************************************************************************


// instanceof
// Checks whether an object is an instance of a constructor or class. Returns a boolean.

// Example:

console.log([] instanceof Array);       // true
console.log({} instanceof Object);      // true
console.log(new Date() instanceof Date); // true
console.log("hi" instanceof String);     // false ❗
console.log(new String("hi") instanceof String); // true ✅//
console.log(new String("hi") instanceof Object); // true ✅//

//  It checks the prototype chain:
const arr = [];
console.log(arr instanceof Array);   // true
console.log(arr instanceof Object);  // true

// How to correctly detect arrays?
Array.isArray([]);          // ✅ true
typeof [] === "object";     // ❌ misleading
[].constructor === Array;   // ✅ also valid



//Mixed Examples
console.log(typeof 42);    // number
console.log(typeof new Number(42));    // object
console.log(typeof "hi");    // string
console.log(typeof new String('hi'));    // object



// When to use which?

// Use typeof for:
// 1- primitive types (string, number, boolean, etc.)
// 2- quick checks like typeof x === 'function'

// Use instanceof for:
// 1- class instances (new Date(), new MyClass())
// 2- checking if an object is of a specific type or constructor
