## What is the potential pitfall of using typeof bar === "object" to determine if bar is an object? How can this be avoided?

while this is a good way to check, the caveat is null is also considered an "object". To avoid this, also check whether bar !== null.
Note: bar will return false if it's a function, so also check whether it's a function if you want it to be true.

## What will the problem output to the console? 
```
 (function() {
   var a = b = 3;
 })();

 console.log("a defined? " + (typeof a !== 'undefined'));
 console.log("b defined? " + (typeof b !== 'undefined'));
```

Most developers would think that typeof a and typeof b to be both undefined since a and b are defined within the enclosed scope of the function. The actual shorthand for var a = b = 3 is b = 3, var a = b, not var b = 3, var a = b.
the correct output will be a defined? false, b defined? true

But how can b be defined outside of the scope of the enclosing function? Well, since the statement var a = b = 3; is 
shorthand for the statements b = 3; and var a = b;, b ends up being a global variable (since it is not preceded by the 
var keyword) and is therefore still in scope even outside of the enclosing function.

## What will the problem output to the console?
```
 var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
 };
 myObject.func();
```

outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar

In the outer function, both this and self refer to myObject and therefore both can properly reference and access foo.
In the inner function, though, this no longer refers to myObject. As a result, this.foo is undefined in the inner 
function, whereas the reference to the local variable self remains in scope and is accessible there.

## What is the significance of wrapping an entire JavaScript source file in a function block?

A common practice used by JS libraries like (jQuery, Node.js, etc.) to create a closure around the contents of the file, 
which creates a private namespace and thereby avoids potential name clashes between modules and libraries.
Another reason is to allow and easily referenceable (pref shorter) alias for a global variable.
jQuery allows you to disable the $ reference to the jQuery namespace, using jQuery.noConflict(). If this has been done, your code can still use $ employing this closure technique, as follows:
(function($) { /* jQuery plugin code referencing $ */ } )(jQuery);

## What is the significance and benefits of including 'use strict' at the beginning of a JavaScript source file?

'use strict' is a voluntary way to enforce stricter parsing and error handling on JavaScript code during runtime.
Code errors that would have been ignored or failed silently will generate errors or throw exceptions.
+ Makes debugging easier. Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions, alerting you sooner to problems in your code and directing you more quickly to their source.
+ Prevents accidental globals. Without strict mode, assigning a value to an undeclared variable automatically creates a global variable with that name. This is one of the most common errors in JavaScript. In strict mode, attempting to do so throws an error.

+ Eliminates this coercion. Without strict mode, a reference to a this value of null or undefined is automatically coerced to the global. This can cause many headfakes and pull-out-your-hair kind of bugs. In strict mode, referencing a a this value of null or undefined throws an error.

+ Disallows duplicate parameter values. Strict mode throws an error when it detects a duplicate named argument for a function (e.g., function foo(val1, val2, val1){}), thereby catching what is almost certainly a bug in your code that you might otherwise have wasted lots of time tracking down.
 Note: It used to be (in ECMAScript 5) that strict mode would disallow duplicate property names (e.g. var object = {foo: "bar", foo: "baz"};) but as of ECMAScript 2015 this is no longer the case.

+ Makes eval() safer. There are some differences in the way eval() behaves in strict mode and in non-strict mode. Most significantly, in strict mode, variables and functions declared inside of an eval() statement are not created in the containing scope (they are created in the containing scope in non-strict mode, which can also be a common source of problems.

+ Throws error on invalid usage of delete. The delete operator (used to remove properties from objects) cannot be used on non-configurable properties of the object. Non-strict code will fail silently when an attempt is made to delete a non-configurable property, whereas strict mode will throw an error in such a case.

```
Will the two functions return the same thing? Why or why not?
function foo1() {
  return {
     bar: "hello"
  }; 
}

function foo2() {
  return 
  {
     bar: "hello"
  }; 
}
```

When invoked, foo2 will return undefined because while semicolons are technically optional in JS, a semicolon is 
automatically added to the end of the return when encountered without open brackets

## What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

a NaN property represents a value that is "not a number". This is the result of an operation that could not be performed because one of its operands was a non-numeric or the result is a non-numeric. NaN type is in fact a Number. `console.log(typeof NaN === 'number')` returns true, but `(NaN === NaN)` is false. One solutions is to use the built-in global function `isNaN()`, but it's not perfect. A better way is to use value !== value because it'll only produce true if the value is equal to NaN.
Note: As of ES6, an new more reliable function Function.isNaN() is more reliable than the old global isNaN()

## What will the code below output? 
```
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```

An educated answer to this question would simply be: “You can’t be sure. it might print out 0.3 and true, or it might not. Numbers in JavaScript are all treated with floating point precision, and as such, may not always yield the expected results.”

The example provided above is classic case that demonstrates this issue. Surprisingly, it will print out:
`0.30000000000000004 and false`.

A typical solution is to compare the absolute difference between two numbers with the special constant `Number.EPSILON:`
```
function areTheNumbersAlmostEqual(num1, num2) {
	return Math.abs( num1 - num2 ) < Number.EPSILON;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));
```

## Discuss the possible ways to write a function isInteger(x) that determines if x is an integer.

ES6 introduces Number.isInteger().
Previously, the simplest and cleanest way is to use the bitwise XOR operator `function isInteger(x) { return (x ^ 0) === x; }`
and a less elegant solution `function isInteger(x) { return Math.round(x) === x; }` or `Math.ceil()` or `function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }`

## In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
```
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```

1, 4, 3, 2. are logged this way due to JavaScript events and timing (event loop).
+ 1 and 4 are displayed first since they are logged by console.log() without any delay
+ 3 and 2 are logged later because it's an asynchronous function
The browser has an event loop which checks the event queue and processes pending events. If an event happens in the background (ie: `onload` event) while the browser is busy (ie processing `onclick`), the event gets appended to the queue. When the onclick handler is complete, the browser checks the queue for the next event.

Similarly, `setTimeout` puts execution of its referenced function in the event queue if the browser is busy. When a zero is passed into the second argument of `setTimeout`, the browser attempts to do it ASAP in the next tick, but is still delayed.

## Write a simple function (less than 160 characters) that returns a boolean  indicating whether or not a string is a palindrome.
```my code
function isPalindrome(input) {
  return input.split('').reverse().join('') === input
}
```
```online code
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
```

## Write a sum method which will work properly when invoked using either syntax below.
```
console.log(sum(2,3)); //output 5
console.log(sum(2)(3)); //output 5
```

At least two ways:
```one
function sum(x) {
  if (arguments.length === 2) {
    return arguments[0] + argument[1];
  } else {
    return function(y) { return x + y };
  }
}
```
JS functions allow access to `arguments` object which provides access to actual arguments passed to a function. This enables us to use the `length` property to determine at runtime the number of arguments passed to the function. If two arguments are passed, the function adds them together. Otherwise, return an anonymous function that adds together the first argument and the second argument from the anon function.

```two
function (x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function (y) { return x + y };
  }
}
```
When function is invoked, JS doesn't require the number of arguments to match number of arguments. Excess arguments will simply be ignored past two.

Note: More elegantly done with currying function and ...Args? Look into this the second time through.

## What gets logged to the console when the user clicks on button 4? and why? Provide another alternative that will work. Consider the following code:
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```
No matter what button the user clicks the number 5 will always be logged to the console. This is because, at the point that the onclick method is invoked (for any of the buttons), the for loop has already completed and the variable i already has a value of 5. (Bonus points for the interviewee if they know enough to talk about how execution contexts, variable objects, activation objects, and the internal “scope” property contribute to the closure behavior.)

The key to making this work is to capture the value of i at each pass through the for loop by passing it into a newly created function object. Here are four possible ways to accomplish this:
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', (function(i) {
    return function() { console.log(i); };
  })(i));
  document.body.appendChild(btn);
}
```
Alternatively, you could wrap the entire call to btn.addEventListener in the new anonymous function:
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  (function (i) {
    btn.addEventListener('click', function() { console.log(i); });
  })(i);
  document.body.appendChild(btn);
}
```
Or, we could replace the for loop with a call to the array object’s native forEach method:
```
['a', 'b', 'c', 'd', 'e'].forEach(function (value, i) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function() { console.log(i); });
  document.body.appendChild(btn);
});
```
Lastly, the simplest solution, if you’re in an ES6/ES2015 context, is to use let i instead of var i:
```
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

## Assuming d is an "empty" space in scope, var d = {}, what is accomplished with this code?
```
['zebra','horse'].forEach( function(k) {
  d[k] = undefined;
});
```

The code snippet, sets two properties on the object d. Ideally, any lookup performed on a JavaScript object with an unset key evaluates to undefined. But running this code marks those properties as “own properties” of the object.

This is a useful strategy for ensuring that an object has a given set of properties. Passing this object to Object.keys will return an array with those set keys as well (even if their values are undefined).

## Bitwise AND | a & b | returns a 1 in each bit position for the corresponding bits of both operands are 1s
## Bitwise OR  | a | b | returns a 1 in each bit position for which either operands are 1s
## Bitwise XOR | a ^ b | returns a 1 in each bit position for which either operands are 1s but NOT both
## Bitwise NOT | ~ a   | inverts the bits of its operands

## 