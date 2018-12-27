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

## What will the code output?
```
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```

Output will be `"array 1: length=5 last=j,o,n,e,s"` and `"array 2: length=5 last=j,o,n,e,s"`
arr1 and arr2 are the same (i.e. ['n','h','o','j'], ['j','o','n','e','s'] ]) after the above code is executed for the following reasons:

+ Calling an array object’s reverse() method doesn’t only return the array in reverse order, it also reverses the order of the array itself (i.e., in this case, arr1).

+ The reverse() method returns a reference to the array itself (i.e., in this case, arr1). As a result, arr2 is simply a reference to (rather than a copy of) arr1. Therefore, when anything is done to arr2 (i.e., when we invoke arr2.push(arr3);), arr1 will be affected as well since arr1 and arr2 are simply references to the same object.

And a couple of side points here that can sometimes trip someone up in answering this question:

+ Passing an array to the push() method of another array pushes that entire array as a single element onto the end of the array. As a result, the statement arr2.push(arr3); adds arr3 in its entirety as a single element to the end of arr2 (i.e., it does not concatenate the two arrays, that’s what the concat() method is for).

+ Like Python, JavaScript honors negative subscripts in calls to array methods like slice() as a way of referencing elements at the end of the array; e.g., a subscript of -1 indicates the last element in the array, and so on.

## What will the code below output to the console and why?

```
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
```

The fundamental issue here is that JavaScript (ECMAScript) is a loosely typed language and it performs automatic type conversion on values to accommodate the operation being performed. Let’s see how this plays out with each of the above examples.

Example 1: 1 + "2" + "2" Outputs: "122" Explanation: The first operation to be performed in 1 + "2". Since one of the operands ("2") is a string, JavaScript assumes it needs to perform string concatenation and therefore converts the type of 1 to "1", 1 + "2" yields "12". Then, "12" + "2" yields "122".

Example 2: 1 + +"2" + "2" Outputs: "32" Explanation: Based on order of operations, the first operation to be performed is +"2" (the extra + before the first "2" is treated as a unary operator). Thus, JavaScript converts the type of "2" to numeric and then applies the unary + sign to it (i.e., treats it as a positive number). As a result, the next operation is now 1 + 2 which of course yields 3. But then, we have an operation between a number and a string (i.e., 3 and "2"), so once again JavaScript converts the type of the numeric value to a string and performs string concatenation, yielding "32".

Example 3: 1 + -"1" + "2" Outputs: "02" Explanation: The explanation here is identical to the prior example, except the unary operator is - rather than +. So "1" becomes 1, which then becomes -1 when the - is applied, which is then added to 1 yielding 0, which is then converted to a string and concatenated with the final "2" operand, yielding "02".

Example 4: +"1" + "1" + "2" Outputs: "112" Explanation: Although the first "1" operand is typecast to a numeric value based on the unary + operator that precedes it, it is then immediately converted back to a string when it is concatenated with the second "1" operand, which is then concatenated with the final "2" operand, yielding the string "112".

Example 5: "A" - "B" + "2" Outputs: "NaN2" Explanation: Since the - operator can not be applied to strings, and since neither "A" nor "B" can be converted to numeric values, "A" - "B" yields NaN which is then concatenated with the string "2" to yield “NaN2”.

Example 6: "A" - "B" + 2 Outputs: NaN Explanation: As exlained in the previous example, "A" - "B" yields NaN. But any operator applied to NaN with any other numeric operand will still yield NaN.

## The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

```
var list = readHugeList();

var nextListItem = function() {
  var item = list.pop();

  if (item) {
    // process the list item...
    nextListItem();
  }
};
```
answer:
```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};
```

The stack overflow is eliminated because the event loop handles the recursion, not the call stack. When nextListItem runs, if item is not null, the timeout function (nextListItem) is pushed to the event queue and the function exits, thereby leaving the call stack clear. When the event queue runs its timed-out event, the next item is processed and a timer is set to again invoke nextListItem. Accordingly, the method is processed from start to finish without a direct recursive call, so the call stack remains clear, regardless of the number of iterations.

## What is "closure" in JavaScript? Provide an example.

A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain. The closure has access to variables in three scopes; specifically: (1) variable in its own scope, (2) variables in the enclosing function’s scope, and (3) global variables.

Here is an example:

```
var globalVar = "xyz";

(function outerFunc(outerArg) {
    var outerVar = 'a';
    
    (function innerFunc(innerArg) {
    var innerVar = 'b';
    
    console.log(
        "outerArg = " + outerArg + "\n" +
        "innerArg = " + innerArg + "\n" +
        "outerVar = " + outerVar + "\n" +
        "innerVar = " + innerVar + "\n" +
        "globalVar = " + globalVar);
    
    })(456);
})(123);
```

In the above example, variables from innerFunc, outerFunc, and the global namespace are all in scope in the innerFunc. The above code will therefore produce the following output:

```
outerArg = 123
innerArg = 456
outerVar = a
innerVar = b
globalVar = xyz
```

## What will be the output of the following code:
```
for (var i = 0; i < 5; i++ ){
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```

The code sample shown will not display the values 0, 1, 2, 3, and 4 as might be expected; rather, it will display 5, 5, 5, 5, and 5.

The reason for this is that each function executed within the loop will be executed after the entire loop has completed and all will therefore reference the last value stored in i, which was 5.

Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each unique value of the variable within its scope, as follows:
```
for (var i = 0; i < 5; i++) {
    (function(x) {
        setTimeout(function() { console.log(x); }, x * 1000 );
    })(i);
}
```
This will produce the presumably desired result of logging 0, 1, 2, 3, and 4 to the console.

In an ES2015 context, you can simply use let instead of var in the original code:
```
for (let i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```

## Consider the following code and its output:
```
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```

he code will output the following four lines:

0 || 1 = 1
1 || 2 = 1
0 && 1 = 0
1 && 2 = 2
In JavaScript, both || and && are logical operators that return the first fully-determined “logical value” when evaluated from left to right.

The or (||) operator. In an expression of the form X||Y, X is first evaluated and interpreted as a boolean value. If this boolean value is true, then true (1) is returned and Y is not evaluated, since the “or” condition has already been satisfied. If this boolean value is “false”, though, we still don’t know if X||Y is true or false until we evaluate Y, and interpret it as a boolean value as well.

Accordingly, 0 || 1 evaluates to true (1), as does 1 || 2.

The and (&&) operator. In an expression of the form X&&Y, X is first evaluated and interpreted as a boolean value. If this boolean value is false, then false (0) is returned and Y is not evaluated, since the “and” condition has already failed. If this boolean value is “true”, though, we still don’t know if X&&Y is true or false until we evaluate Y, and interpret it as a boolean value as well.

However, the interesting thing with the && operator is that when an expression is evaluated as “true”, then the expression itself is returned. This is fine, since it counts as “true” in logical expressions, but also can be used to return that value when you care to do so. This explains why, somewhat surprisingly, 1 && 2 returns 2 (whereas you might it expect it to return true or 1).

## What will the output be when executed? Why?
```
console.log(false == '0')
console.log(false === '0')
```

true
false

In JavaScript, there are two sets of equality operators. The triple-equal operator === behaves like any traditional equality operator would: evaluates to true if the two expressions on either of its sides have the same type and the same value. The double-equal operator, however, tries to coerce the values before comparing them. It is therefore generally good practice to use the === rather than ==. The same holds true for !== vs !=.

## What will the code output and why?
```
var a ={},
    b ={key:'b'},
    c ={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```

The output of this code will be 456 (not 123).

The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] and a[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].

## What will the code output and why?
```
console.log(function f(n) {return ((n > 1) ? n * f(n-1) : n)})(10);
```

The code will output the value of 10 factorial (i.e., 10!, or 3,628,800).

Here’s why:

The named function f() calls itself recursively, until it gets down to calling f(1) which simply returns 1. Here, therefore, is what this does:
```
f(1): returns n, which is 1
f(2): returns 2 * f(1), which is 2
f(3): returns 3 * f(2), which is 6
f(4): returns 4 * f(3), which is 24
f(5): returns 5 * f(4), which is 120
f(6): returns 6 * f(5), which is 720
f(7): returns 7 * f(6), which is 5040
f(8): returns 8 * f(7), which is 40320
f(9): returns 9 * f(8), which is 362880
f(10): returns 10 * f(9), which is 3628800
```

## What will the code output be and why?
```
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```
