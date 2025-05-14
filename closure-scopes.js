
//Closure use cases
// 1- Currying
function outer(){
    let count = 0; 
    return function inner(){
       count++;
       console.log(count)
       return count;
    }
  }
  const out = outer();
  out();
  const count = out();
  console.log('count',count)
  ////////////////////////////////////////////////////
  
  // 2- Encapsolution
  function createUser(username){
    let password = '123';
    
    return {
      getUser: function(){return username;},
      checkPassword: function(pass){return pass==password;}
    }
  }
  const user = createUser('ali');
  console.log(user.getUser());
  console.log(user.checkPassword('1234'));
  console.log(user.checkPassword('123'));
  ////////////////////////////////////////////////////
  
  // 3- Function Factory
  function logger(type){
  
    return function log(message){
       return `${type}: ${message}`;
    }
  }
  const errorLogger = logger('Error');
  console.log(errorLogger('Error Occurred'));
  const successLogger = logger('Success');
  console.log(successLogger('Done Successfuly'));


  /////////////////////// SCOPES ///////////////////////////////

  // Scope Basics
  // Global Scope – accessible everywhere
  // Function Scope – variables declared with var inside functions
  // Block Scope – let and const respect {} boundaries

  // Hoisting
  // Each decleration go top the scope and var is intialized by 'undefined' and const and let is not initialized.

  function createCounters() {
    const counters = [];
  
    for (var i = 0; i < 3; i++) {
      counters.push(function () {
        console.log(i);
      });
    }
  
    return counters;
  }
  
  const counters = createCounters();
  counters[0](); // ? 3 --> Because var is not block scope, it is function scope.
  counters[1](); // ? 3
  counters[2](); // ? 3

  // Before ES6 we have 2 scope global and function, in ES6 with let and const we have third scope (block scope),
  // So to solve this problem we must use let instade of var inside for loop.
  // Before ES6, we must use IIFE (Immedietly Invoke Function Expression) to solve this, like below

  function createCounters() {
    const counters = [];
  
    for (var i = 0; i < 3; i++) {
      (function (j) {
        counters.push(function () {
          console.log(j);
        });
      })(i); // IIFE captures current value of i
    }
  
    return counters;
  }
  counters[0](); // ? 0 
  counters[1](); // ? 1
  counters[2](); // ? 2
  //The IIFE creates a new scope for each j (which is passed the current i), and the closure captures that specific value.


  
  
  
  
  