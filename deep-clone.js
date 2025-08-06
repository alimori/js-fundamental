
const originalObject = {
    name: 'Ali',
    hobbies: ["football", "reading"],
    address: {
        city: 'Tehran'
    }
}

// 1- Assignment
const assignmentObject = originalObject;

// 2- Shallow Clone
const shallowCloneObject = { ...originalObject }; // OR    Object.assign({},originalObject) 

// 3- Deep Clone
const deepCloneObject1 = JSON.parse(JSON.stringify(originalObject)) // Basic, but loses functions, undefined, Date, etc.
const deepCloneObject2 = structuredClone(originalObject); // Built-in in modern web browsers, Or use lodash's cloneDeep()
const deepCloneObject3 = deepCloneBasic(originalObject); // Custom basic deep clone
const deepCloneObject4 = deepCloneAdvanced(originalObject); // Custom advanced deep clone


originalObject.name = 'Shohre';
assignmentObject.address.city = 'Mashhad'
shallowCloneObject.address.city = 'Karaj';
deepCloneObject.address.city = 'Shiraz';
deepCloneObject.name = 'Eli';
console.log(originalObject, '\n', assignmentObject, '\n', shallowCloneObject, '\n', deepCloneObject1, '\n', deepCloneObject2, '\n', deepCloneObject3);


// 1- Custom Deep Clone Function (Basic Version)
function deepCloneBasic(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj; // Return primitives as-is
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)); // Recursively clone each element
    }

    let clone = {};
    for (key of Object.keys(obj)) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]); // Recursively clone each value
        }
    }
    return clone;
}
//❗ Limitations of the Basic Version:

// ✅ Works with objects and arrays
// ✅ Handles nested levels
// ❌ Does not handle:
//      Date, Map, Set, RegExp
//      circular references
//      Function types
//      special objects like Blob, File, HTMLElement, etc.

// ****************************************************************************************

// 2- Advanced Deep Clone: Handling Date, RegExp
function deepCloneAdvanced(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCloneAdvanced(item));
    }

    const clonedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepCloneAdvanced(obj[key]);
        }
    }

    return clonedObj;
}

// ****************************************************************************************

// 3- Deep Clone with Circular Reference Support, Circular reference–safe deep clone 
function deepCloneSafe(obj, hash = new WeakMap()) {
    // Handle null, undefined, or primitive types
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    // Handle special types
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    // If object is already cloned, return the reference
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    // Handle arrays and objects
    const clone = Array.isArray(obj) ? [] : {};

    // Cache the clone before recursion to prevent circular loop
    hash.set(obj, clone);

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepCloneSafe(obj[key], hash); // recursive call with hash
        }
    }

    return clone;
}

//   How It Works:
//   1- WeakMap tracks objects already cloned.
//   2- When a reference is visited again, it returns the previously cloned version — avoiding infinite loops.
//   3- This is how structuredClone() works under the hood too.


// Test: Circular Reference

const person = {
    name: "Ali",
    friends: []
};

// Create circular reference
person.self = person;
person.friends.push(person);

const clonedPerson = deepCloneSafe(person);

console.log(clonedPerson === person); // false
console.log(clonedPerson.name); // "Ali"
console.log(clonedPerson.self === clonedPerson); // true ✅
console.log(clonedPerson.friends[0] === clonedPerson); // true ✅
