var a = 'aa';
var b = 'bb';
var c = '2';
var d = '4';
var n1 = 5;
var n2 = 8;


var expersions = [];

var ex1 = {
    "expersion": "a + b + c",
    "result": a + b + c
};
expersions.unshift(ex1);

var ex2 = {
    "expersion": "a + b * c",
    "result": a + b * c
};
expersions.unshift(ex2);

var ex3 = {
    "expersion": " a * b + c",
    "result":  a * b + c
};
expersions.unshift(ex3);

var ex4 = {
    "expersion": "a + b + n1",
    "result": a + b + n1
};
expersions.unshift(ex4);

var ex5 = {
    "expersion": "a + b * n1",
    "result": a + b * n1
};
expersions.unshift(ex5);

var ex6 = {
    "expersion": "a * b + n1",
    "result": a * b + n1
};
expersions.unshift(ex6);

var ex7 = {
    "expersion": "a + c + n1",
    "result": a + c + n1
};
expersions.unshift(ex7);

var ex8 = {
    "expersion": "a + c * n1",
    "result": a + c * n1
};
expersions.unshift(ex8);


document.getElementById("varibles").innerText =
    "var a = '" + a + "'" +
    "\n var b = '" + b + "'" +
    "\n var c = '" + c + "'" +
    "\n var d = '" + d + "'" +
    "\n var n1 = " + n1 +
    "\n var n2 = " + n2 


var clearExpersions = '';
expersions.forEach(item => {
    clearExpersions += '\n' + item.expersion + " = "
});

document.getElementById("result").innerText = clearExpersions;



window.addEventListener("load", function() { // when the page has loaded
    document.getElementById("runBtn").addEventListener("click", function(e) {
        var result = '';
        expersions.forEach(item => {
            result += '\n' + item.expersion + " = " + item.result;
        });
        document.getElementById("result").innerText = result;
    });

    document.getElementById("clearBtn").addEventListener("click", function(e) {
        document.getElementById("result").innerText = clearExpersions;
      });
  });
