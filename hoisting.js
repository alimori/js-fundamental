/*
Hoisting is JavaScript’s default behavior of moving declarations to the top of the current scope
 (either global or function scope) during the compilation phase, before the code is executed.
But only declarations are hoisted, not initializations.
*/


//🔍 Variable Hoisting Examples
////////////////////////////// 🧪 Example 1: var

console.log(a); // undefined
var a = 5;

//✅ Internally, this becomes:
var a;          // declaration is hoisted
console.log(a); // undefined
a = 5;          // assignment stays in place


/////////////////////////////// 🧪 Example 2: let and const
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;
//✅ let and const are hoisted but not initialized, and they are in a temporal dead zone (TDZ)
//  from the start of the scope to the declaration line.



//🔍 Function Hoisting
/////////////////////////🧪 Example 3: Function Declarations
sayHi(); // ✅ Works

function sayHi() {
    console.log('Hello!');
}
//✅ Function declarations are fully hoisted with their body.

/////////////////////////🧪 Example 4: Function Expressions
sayHello(); // ❌ TypeError: sayHello is not a function

var sayHello = function () {
    console.log('Hi!');
};
//✅ Here, only the variable sayHello is hoisted (as undefined), not the function body.



//////////////////////////// SAMPLE 1
var x = 1;

function test() {
    console.log(x); // undefined
    var x = 2;
    console.log(x); // 2
}

test();

////////////////////////////////// SAMPLE 2

console.log(foo); // undefined
var foo = 42;


////////////////////////////////// SAMPLE 3

console.log(bar);  //  ReferenceError: Cannot access 'bar' before initialization
let bar = 99;
//Even though let is hoisted, it's not initialized and lives in the TDZ until the declaration is evaluated.


//////////////////////////////// SAMPLE 4
function test() {
    console.log(typeof a);
    var a = 10;
  }
  
test(); // "undefined"


/////////////////////////////// SAMPLE 5
function test() {
    console.log(typeof foo);
    var foo = 'hello';
    
    function foo() {}
  }
  
test(); // function
