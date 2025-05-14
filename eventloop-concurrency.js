/* JavaScript is single-threaded, but it handles async operations using the event loop and callback queue.
 There are 3 main components:
 Call Stack – Executes function calls one at a time
 Web APIs / Task Sources – Browser handles setTimeout, DOM events, fetch, etc.
 Queues:
 Macro-task queue (aka task queue): setTimeout, setInterval, setImmediate
 Micro-task queue: Promise.then, async/await, queueMicrotask, MutationObserver
*/


////////////////////////////////////// EXAMPLE 1

console.log('Start');
setTimeout(() => {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise.then');
});
console.log('End');

/* Output
Start
End
Promise.then
setTimeout
*/

/*
🧠 Execution Breakdown:
Call Stack runs top to bottom (synchronously):
console.log('Start') → Start
setTimeout(...) → registered in the Web API (macro task)
Promise.then(...) → added to microtask queue
console.log('End') → End
Microtasks (like .then) run after the main script, but before any macrotasks:
Promise.then runs → Promise.then
Then the event loop picks up macrotasks:
setTimeout runs → setTimeout
*/

////////////////////////////////// EXAMPLE 2

console.log('1');
setTimeout(() => {
    console.log('2');
}, 0);
Promise.resolve().then(() => {
    console.log('3');
});
(async function () {
    console.log('4');
    await Promise.resolve();
    console.log('5');
})();
console.log('6');
//1
//4
//6
//3
//5
//2
/**
 * ✅ Step-by-step Execution:
Synchronous (Call Stack):
console.log('1') → 1
setTimeout → registers callback in macrotask queue
Promise.then(...) → registers in microtask queue
Enters async IIFE:
console.log('4') → 4
await Promise.resolve() — pauses here, registers continuation in microtask queue
console.log('6') → 6
Microtasks (in order):
Promise.then(...) → 3
console.log('5') → continuation of await → 5
Macrotasks:
setTimeout → 2
 */

/////////////////////////////////////////////// EXAMPLE 3

console.log('A');
setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => {
    console.log('C');
  });
}, 0);
Promise.resolve().then(() => {
  console.log('D');
});
queueMicrotask(() => {
  console.log('E');
});
(async function () {
  console.log('F');
  await null;
  console.log('G');
})();
console.log('H');

/**
A
F
H
E
D
G
B
C

🧠 Execution Breakdown:
🔹 1. Call Stack – Sync Code First
Runs top to bottom:

console.log('A') → A
setTimeout(...) → registers to macrotask queue
Promise.then(...) → goes to microtask queue
queueMicrotask(...) → also microtask queue ( is a builtin hs function)
async function starts:
console.log('F') → F
await null pauses here, and adds the rest as microtask
console.log('H') → H
🔹 2. Microtasks run next, in order they were queued:
queueMicrotask(...) → E
Promise.then(...) → D
continuation of async fn → G
🔹 3. Macrotasks (setTimeout):
console.log('B') → B
Promise.then(...) inside the timeout → scheduled as microtask → C
 */


////////////////////////////////////////// EXAMPLE 4

console.log('1');
setTimeout(() => {
  console.log('2');
}, 0);
Promise.resolve().then(() => {
  console.log('3');

  setTimeout(() => {
    console.log('4');
  }, 0);
});
queueMicrotask(() => {
  console.log('5');
});
(async function () {
  console.log('6');
  await Promise.resolve();
  console.log('7');

  setTimeout(() => {
    console.log('8');
  }, 0);
})();
console.log('9');

/*
1
6
9
5
3
7
2
4
8

✅ Step-by-Step Execution:
🔹 1. Synchronous (Call Stack):

1 (console.log)
6 (inside async IIFE)
9 (end of main script)
So far:
1
6
9

🔹 2. Microtasks:
queueMicrotask(...) → 5
Promise.then(...) → 3, and in that .then, setTimeout(...4) is scheduled
await Promise.resolve() resumes → 7, and it schedules setTimeout(...8)

BUT: queueMicrotask runs before all .then() callbacks.

So microtask execution order:
5 (microtask)
3 (Promise.then, schedules 4)
7 (resumes async fn, schedules 8)
So now we have:

1
6
9
5
3
7

🔹 3. Macrotasks (setTimeouts):
2 (first one)
4 (from .then)
8 (from async continuation)

Final setTimeout order (scheduled in this order):
2
4
8

Key takeaway: queueMicrotask() always runs before any .then() or async/await resolution.
*/



//////////////////////////////////////////// EXAMPLE 5 Final Boss Code:
//Here's one last mega twist — combining nested Promises, setTimeouts, async/await, microtasks, and a few gotchas. 😈

console.log('A');

setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => {
    console.log('C');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('D');
  queueMicrotask(() => {
    console.log('E');
  });
});

queueMicrotask(() => {
  console.log('F');
});

(async () => {
  console.log('G');
  await null;
  console.log('H');
  Promise.resolve().then(() => {
    console.log('I');
  });
})();

console.log('J');

/*
A
G
J
F
D
E
H
I
B
C

✅ Step-by-Step Execution
🔹 1. Synchronous Code First (Call Stack)
A
G
J

🔹 2. Microtasks Phase
queueMicrotask(() => console.log('F'))
Promise.then(() => { D → queueMicrotask(E) })
After await null, resumes async function → logs H, and schedules Promise.then(() => I)
So the order is:

F  ← direct microtask
D  ← from Promise
E  ← queued *inside* D
H  ← async continuation
I  ← then after H
So:

F
D
E
H
I

🔹 3. Macrotask Phase (setTimeout)
console.log('B')
Promise.then(() => C) inside timeout
So:

B
C

*/
