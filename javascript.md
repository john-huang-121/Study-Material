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

Note: When working with 'use strict', never concatenate strict and nonstrict files together (because of packaging order issues)
or concat files by wrapping their bodies in an IIFE.

## Semicolon Insertion

Automatic semicolon insertion has its pitfalls and follows these rules:

1) Semicolons are only inserted before a } token, after one or more newlines, or at the end of program input.
(you can only leave out semicolons at the end of the line, block, or program)
2) When next input token cannot be parsed. As an error correction mechanism.

```js
a = b
(f());
// parses as
a = b(f());

// but
a = b
f();
// parses as two separate functions because
a = b f(); // is an error
```
When programs are concatenated, semicolons are not added to the end of the program.


3) Semicolons are never inserted as separators in the head of a for loop or as empty statements. (let i = 0; i < something; i++) and
loops with an empty body (function infiniteLoop() { while(true); })

Note: even if you always add semicolons, there could be dangers. `return {};` returns a new object, but
```js
return // parses as 3 separate statements
{};

return; // like so
{}
;
```
These are known as 'restricted productions'. Other cases of res. prod. are: `throw` statements, `break` or `continue` with explicit label, `++` or `--`

## Unicode

Unicode basics = Every unit of text of all the world's writing systems is assigned a unique integer between 0 and 1,114,111, known as a 'code point'. This is just another form of text encoding like ASCII. While ASCII maps each index to a unique binary representation, Unicode allows multiple different binary encodings of code points. Different encodings make trade-offs between the amount of storage required for a strign and the speed of operations such as indexing into a string.

Popular standard encodings: UTF-8, UTF-16, UTF-32

## What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

a NaN property represents a value that is "not a number". This is the result of an operation that could not be performed because one of its operands was a non-numeric or the result is a non-numeric. NaN type is in fact a Number. `console.log(typeof NaN === 'number')` returns true, but `(NaN === NaN)` is false. One solutions is to use the built-in global function `isNaN()`, but it's not perfect. A better way is to use value !== value because it'll only produce true if the value is equal to NaN.
Note: As of ES6, an new more reliable function Function.isNaN() is more reliable than the old global isNaN()

## Floating-Point Numbers and example?

All javascript numbers are represented by `double-precision floating-point` numbers, the 64-bit encoding IEEE 754 standard, known as `doubles`.
Doubles can represent integers up to 53 bits of precision, -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53) are valid doubles.

Bitwise arthmetic operators though, work by converting the numbers into 32-bit big-endian, two's complement integers.

Note: doubles can only represent a finite set of numbers, so rounding can be inaccurate. So doing multiple operations may compound rounding errors.
A workaround is to only work with integers. (10  20) + 30 = 10 + (20 + 30) without mixing of numbers.

```javascript
console.log(0.1 + 0.2); // 0.30000...4
console.log(0.1 + 0.2 == 0.3);
```

An educated answer to this question would simply be: “You can’t be sure. it might print out 0.3 and true, or it might not. Numbers in JavaScript are all treated as double-precision floating point, and as such, may not always yield the expected results.”

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

Immediately Invoked Function Expression (IIFE): function you call immediately after you invoke it. Helps maintain scope.
The reason for this is that each function executed within the loop will be executed after the entire loop has completed and all will therefore reference the last value stored in i, which was 5.

Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each unique value of the variable within its scope, as follows:

Enables you to attach private data to a function.
Creates fresh environments.
Avoids polluting the global namespace.

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

The output will be 1, even though the value of x is never set in the inner function. Here’s why:

As explained in our JavaScript Hiring Guide, a closure is a function, along with all variables or functions that were in-scope at the time that the closure was created. In JavaScript, a closure is implemented as an “inner function”; i.e., a function defined within the body of another function. An important feature of closures is that an inner function still has access to the outer function’s variables.

Therefore, in this example, since x is not defined in the inner function, the scope of the outer function is searched for a defined variable x, which is found to have a value of 1.

## What will the following code output to the console and what is the issue with this code and how can it be fixed.
```
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```

The code will output:

undefined
John Doe
The first console.log prints undefined because we are extracting the method from the hero object, so stoleSecretIdentity() is being invoked in the global context (i.e., the window object) where the _name property does not exist.

One way to fix the stoleSecretIdentity() function is as follows:

var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);

## Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

```
The arguments to the function should be:

a DOM element
a callback function (that takes a DOM element as its argument)
```

Visiting all elements in a tree (DOM) is a classic Depth-First-Search algorithm application. Here’s an example solution:

```
function Traverse(p_element,p_callback) {
   p_callback(p_element);
   var list = p_element.children;
   for (var i = 0; i < list.length; i++) {
       Traverse(list[i],p_callback);  // recursive call
   }
}
```

## Testing your this knowledge in JavaScript: What is the output of the following code?

```
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```

Output:

10
2
Why isn’t it 10 and 5?

In the first place, as fn is passed as a parameter to the function method, the scope (this) of the function fn is window. var length = 10; is declared at the window level. It also can be accessed as window.length or length or this.length (when this === window.)

method is bound to Object obj, and obj.method is called with parameters fn and 1. Though method is accepting only one parameter, while invoking it has passed two parameters; the first is a function callback and other is just a number.

When fn() is called inside method, which was passed the function as a parameter at the global level, this.length will have access to var length = 10 (declared globally) not length = 5 as defined in Object obj.

Now, we know that we can access any number of arguments in a JavaScript function using the arguments[] array.

Hence arguments[0]() is nothing but calling fn(). Inside fn now, the scope of this function becomes the arguments array, and logging the length of arguments[] will return 2.

Hence the output will be as above.

## Consider the following code. What will the output be, and why?
```
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```

1
undefined
2
var statements are hoisted (without their value initialization) to the top of the global or function scope it belongs to, even when it’s inside a with or catch block, but without it's value assignments. However, the error’s identifier is only visible inside the catch block. It is equivalent to:
```
(function () {
    var x, y; // outer and hoisted
    try {
        throw new Error();
    } catch (x /* inner */) {
        x = 1; // inner x, not the outer one
        y = 2; // there is only one y, which is in the outer scope
        console.log(x /* inner */);
    }
    console.log(x);
    console.log(y);
})();
```

## What will be the output of this code?
```
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```

Neither 21, nor 20, the result is undefined

It’s because JavaScript initialization is not hoisted.

(Why doesn’t it show the global value of 21? The reason is that when the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.)

## How do you clone an object?

```
var obj = {a: 1 ,b: 2}
var objclone = Object.assign({},obj);
Now the value of objclone is {a: 1 ,b: 2} but points to a different object than obj.
```
Note the potential pitfall, though: Object.clone() will just do a shallow copy, not a deep copy. This means that nested objects aren’t copied. They still refer to the same nested objects as the original:
```
let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};

var objclone = Object.assign({},obj);
console.log('objclone: ', objclone);

obj.c.age = 45;
console.log('After Change - obj: ', obj);           // 45 - This also changes
console.log('After Change - objclone: ', objclone); // 45
```

## What will this code print?
```
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```

It will print 0 1 2 3 4, because we use let instead of var here. The variable i is only seen in the for loop’s block scope.

## What do the following lines output, and why?
```
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```

The first statement returns true which is as expected.

The second returns false because of how the engine works regarding operator associativity for < and >. It compares left to right, so 3 > 2 > 1 JavaScript translates to true > 1. true has value 1, so it then compares 1 > 1, which is false.

## How do you add an element to the beginning of an array? How do you add one to the end?

var myArray = ['a', 'b', 'c', 'd'];
myArray.push('end');
myArray.unshift('start');
console.log(myArray); // ["start", "a", "b", "c", "d", "end"]
With ES6, one can use the spread operator:

myArray = ['start', ...myArray];
myArray = [...myArray, 'end'];
Or, in short:

myArray = ['start', ...myArray, 'end'];

## Imagine you have this code:
```
var a = [1, 2, 3];
a) Will this result in a crash?

a[10] = 99;
b) What will this output?

console.log(a[6]);
```

a) It will not crash. The JavaScript engine will make array slots 3 through 9 be “empty slots.”

b) Here, a[6] will output undefined, but the slot still remains empty rather than filled with undefined. This may be an important nuance in some cases. For example, when using map(), empty slots will remain empty in map()’s output, but undefined slots will be remapped using the function passed to it:

var b = [undefined];
b[2] = 1;
console.log(b);             // (3) [undefined, empty × 1, 1]
console.log(b.map(e => 7)); // (3) [7,         empty × 1, 7]

## What is the value of typeof undefined == typeof NULL?

The expression will be evaluated to true, since NULL will be treated as any other undefined variable.

Note: JavaScript is case-sensitive and here we are using NULL instead of null.

## What will console.log(typeof typeof 1) return?

string

typeof 1 will return "number" and typeof "number" will return string

## What will the following code output and why?
```
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```

Output to the console will be “3”.

There are three closures in the example, each with it’s own var b declaration. When a variable is invoked closures will be checked in order from local to global until an instance is found. Since the inner closure has a b variable of its own, that is what will be output.

Furthermore, due to hoisting the code in inner will be interpreted as follows:
```
function inner () {
    var b; // b is undefined
    b++; // b is NaN
    b = 3; // b is 3
    console.log(b); // output "3"
}
```

<!-- end of the JavaScript 37 commonly askedi interview questions -->

## The difference between `call` and `apply`

```
var person1 = {name: 'Marvin', age: 42, size: '2xM'};
var person2 = {name: 'Zaphod', age: 42000000000, size: '1xS'};

var sayHello = function(){
    alert('Hello, ' + this.name);
};

var sayGoodbye = function(){
    alert('Goodbye, ' + this.name);
};

sayHello();
sayGoodbye();
```

Running this will give an error because both functions rely on their scope for `this.name` data.

```
sayHello.call(person1);

sayHello.apply(person1);
```

They both run the function in the scope, or context, of the first argument passed in. They are both functions that can be called on other functions.

For call, subsequent arguments after the first are passed into the function as arguments.
For apply, subsequent arguments after the first have to be in an array. This is then unpacked and passed into the function as arguments.

## Functional Programming

A programming paradigm(style of building programs) that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It is a declarative programming paradigm, which means programming is done with expressions or declarations instead of statements. In functional code, the output value of a function depends only on the arguments that are passed to the function, so calling a function f twice with the same value for an argument x produces the same result f(x) each time

## JavaScript Namespacing

Namespacing = holding all your objects and data in a heirarchy inside one variable.

```
window.Foods = window.Foods || {};
Foods.Grains = Foods.Grains || {};
Foods.Grains.Wheat = Foods.Grains.Wheat || {};

Foods.Grains.Wheat.harvest = function(){
  // Do something
}
```

While this method gets the work done - you get to use the namespace without overwriting code from other files - it results in a lot of unnecessary code at the top of each file. You're essentially ensuring the existence of each namespace that you want to use, and doing it again at the top of each file.

An easier way to do this is through functional programming:
```
var ns = function(namespace){
  return namespace.split('.').reduce(function(holder, name){
    holder[name] = holder[name] || {};
    return holder[name];
  }, window);
};
```

Make sure that's included first, then do at the top of the file you use it in.
```
ns('Foods.Grains.Wheat');
```

The namespace.split('.') breaks the namespace into it's constituent parts. reduce then steps through each part from left to right, ensuring that it exists as an object on holder, and returning the object that does. The process starts with window.

## Finding max and min values in JS tricks

The built-in functions Math.max() and Math.min() find the maximum and minimum value of the arguments, respectively.
```
Math.max(1, 2, 3, 4); // 4
Math.min(1, 2, 3, 4); // 1
```
These functions will not work as-is with arrays of numbers. However, there are some ways around this.

Function.prototype.apply() allows you to call a function with a given this value and an array of arguments.
```
var numbers = [1, 2, 3, 4];
Math.max.apply(null, numbers) // 4
Math.min.apply(null, numbers) // 1
```
Passing the numbers array as the second argument of apply() results in the function being called with all values in the array as parameters.

A simpler, ES2015 way of accomplishing this is with the new spread operator.
```
var numbers = [1, 2, 3, 4];
Math.max(...numbers) // 4
Math.min(...numbers) // 1
```
This operator causes the values in the array to be expanded, or “spread”, into the function’s arguments.

## The Event Loop

JavaScript is a single-threaded programming language. This means that the JavaScript engine can only process a piece of code at a time. One of its main consequences is that when JavaScript encounters a piece of code that takes a long time to process, it will block all code after that from running.

JavaScript uses a data structure that stores information about active functions named Call Stack. A Call Stack is like a pile of books. Every book that goes into that pile sits on top of the previous book. The last book to go into the pile will be the first one removed from it, and the first book added to the pile will be the last one removed.

The solution to executing heavy pieces of code without blocking anything is asynchronous callback functions. These functions are executed later — asynchronously.

The asynchronous process begins with an asynchronous callback functions placed into a Heap or region of memory. You can think of the Heap as an Event Manager. The Call Stack asks the Event Manager to execute a specific function only when a certain event happens. Once that event happens, the Event Manager moves the function to the Callback Queue. Note: When the Event Manager handles a function, the code after that is not blocked and JavaScript continues its execution.

The Event Loop handles the execution of multiple pieces of your code over time. The Event Loop monitors the Call Stack and the Callback Queue.

The Call Stack is constantly checked whether it is empty or not. When it is empty, the Callback Queue is checked if there is a function waiting to be invoked. When there is a function waiting, the first function in the queue is pushed into the Call Stack, which will run it. This checking process is called a ‘tick’ in the Event Loop.

Everytime a setTimeout or an async operation is performed it's placed in the Event Table (a data structure that knows to sends a notice after for a certain action after a certain event ie. timeout, click, mousemove), which then sends them to the Event Queue.

The Event Queue is like the queue data structure in which it keeps the order. The event loop is constantly running process that checks if the call stack is empty. If it's empty, it then looks into the event queue for the next function to pass into the call stack.


The cycle goes: call stack -> Web APIs (DOM, ajax, setTimeout, ie async functions) -> callback queue -> call stack

Note: Recursions can be exploited with setTimeout to stop infinite callstacks from building up.

(What is the Event Loop)[https://www.youtube.com/watch?v=8aGhZQkoFbQ]

alt:
JavaScript uses a call stack to manage the execution of functions. When a function is called, it's added to the stack. When the function completes, it's removed from the stack. JavaScript, being single-threaded, can only execute one function at a time.

However, this could be problematic if a function takes a long time to execute (like a network request). This is where the Event Loop comes in.

The Event Loop is a continuous loop that checks if the call stack is empty. If it is, it takes the first task from the task queue (also known as the event queue or the callback queue) and pushes it onto the call stack, which immediately executes it.

JavaScript uses a call stack to manage the execution of functions. When a function is called, it's added to the stack. When the function completes, it's removed from the stack. JavaScript, being single-threaded, can only execute one function at a time.

However, this could be problematic if a function takes a long time to execute (like a network request). This is where the Event Loop comes in.

The Event Loop is a continuous loop that checks if the call stack is empty. If it is, it takes the first task from the task queue (also known as the event queue or the callback queue) and pushes it onto the call stack, which immediately executes it.


## Promise

A promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation. Essentially, it's a returned object to which you attach callbacks, as opposed to passing callbacks into a function.

```javascript
let promise = new Promise((resolve, reject) => {
    let condition = true;  // This could be the result of some operation

    // After 1 second, check the condition and resolve or reject the promise
    setTimeout(() => {
        if (condition) {
            resolve('Promise fulfilled!');
        } else {
            reject('Promise rejected!');
        }
    }, 1000);
});

// Attach then() and catch() handlers to the Promise
promise
    .then(value => {
        // This will be executed if the promise is resolved
        console.log(value); // Output: Promise fulfilled!
    })
    .catch(error => {
        // This will be executed if the promise is rejected
        console.log(error);
    });
```

In this example, a promise is created and will either resolve or reject after 1 second, depending on the value of condition. The resolve function is called if the promise is successful, and reject is called if the promise fails.
The then method is called when the promise is resolved and receives the value passed to the resolve function. Similarly, the catch method is called when the promise is rejected and receives the value passed to the reject function.

For more: https://leetcode.com/problems/sleep/solutions/3525047/sleep/

## Top 10 ES6 features
Event Loop
1) Default Parameters in ES6
  var link = function (height = 50, color = 0) {} - like ruby

2) Template Literals in ES6
  template literals (interpolation)
  var url = `http://localhost:3000/api/messages/${id}`
  var name = 'your name is: ' + name;

3) Multi-line Strings in ES6
  Use backticks to use multiline strings
  `hi there
  my name is`

4) Destructuring Assignment in ES6
```
  var data = $('body').data(), // data has properties house and mouse
  house = data.house,
  mouse = data.mouse
```
Other examples of destructuring assignments (from Node.js):
```
var jsonMiddleware = require('body-parser').json

var body = req.body, // body has username and password
  username = body.username,
  password = body.password  
```
In ES6, we can replace the ES5 code above with these statements:
```
var {house, mouse} = $('body').data() // we'll get house and mouse variables

var {json: jsonMiddleware} = require('body-parser')

var {username, password} = req.body
```
This also works with arrays. Crazy!
```
var [col1, col2]  = $('.column'),
  [line1, line2, line3, , line5] = file.split('\n')
```
It might take some time to get use to the destructuring assignment syntax, but it’s a sweet sugarcoating.

5) Enhanced Object Literals in ES6
  Here’s a typical ES5 object literal with some methods and attributes/properties:
```
var serviceBase = {port: 3000, url: 'azat.co'},
    getAccounts = function(){return [1,2,3]}

var accountServiceES5 = {
  port: serviceBase.port,
  url: serviceBase.url,
  getAccounts: getAccounts,
  toString: function() {
    return JSON.stringify(this.valueOf())
  },
  getUrl: function() {return "http://" + this.url + ':' + this.port},
  valueOf_1_2_3: getAccounts()
}
```
If we want to be fancy, we can inherit from serviceBase by making it the prototype with the Object.create method:
```
var accountServiceES5ObjectCreate = Object.create(serviceBase)
var accountServiceES5ObjectCreate = {
  getAccounts: getAccounts,
  toString: function() {
    return JSON.stringify(this.valueOf())
  },
  getUrl: function() {return "http://" + this.url + ':' + this.port},
  valueOf_1_2_3: getAccounts()
}
```
I know, accountServiceES5ObjectCreate and accountServiceES5 are NOT totally identical, because one object (accountServiceES5) will have the properties in the `__proto__` object 

6) Arrow Functions in ES6
This is probably one feature I waited the most. I love CoffeeScript for its fat arrows. Now we have them in ES6. The fat arrows are amazing because they would make your this behave properly, i.e., this will have the same value as in the context of the function—it won’t mutate. The mutation typically happens each time you create a closure.

Using arrows functions in ES6 allows us to stop using that = this or self = this or _this = this or .bind(this). For example, this code in ES5 is ugly:
```
var _this = this
$('.btn').click(function(event){
  _this.sendData()
})
```
This is the ES6 code without _this = this:
```
$('.btn').click((event) =>{
  this.sendData()
})
```
Sadly, the ES6 committee decided that having skinny arrows is too much of a good thing for us and they left us with a verbose old function instead. (Skinny arrow in CoffeeScript works like regular function in ES5 and ES6).

And when an arrow function is used with one line statement, it becomes an expression, i.e,. it will implicitly return the result of that single statement. If you have more than one line, then you’ll need to use return explicitly.

7) Promises in ES6
Promises have been a controversial topic. There were a lot of promise implementations with slightly different syntax. q, bluebird, deferred.js, vow, avow, jquery deferred to name just a few. Others said we don’t need promises and can just use async, generators, callbacks, etc. Gladly, there’s a standard Promise implementation in ES6 now!

Let’s consider a rather trivial example of a delayed asynchronous execution with setTimeout():
```
setTimeout(function(){
  console.log('Yay!')
}, 1000)
```
We can re-write the code in ES6 with Promise:
```
var wait1000 =  new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000)
}).then(function() {
  console.log('Yay!')
})
```
Or with ES6 arrow functions:
```
var wait1000 =  new Promise((resolve, reject)=> {
  setTimeout(resolve, 1000)
}).then(()=> {
  console.log('Yay!')
})
```
So far, we’ve increased the number of lines of code from three to five without any obvious benefit. That’s right. The benefit will come if we have more nested logic inside of the setTimeout() callback:
```
setTimeout(function(){
  console.log('Yay!')
  setTimeout(function(){
    console.log('Wheeyee!')
  }, 1000)
}, 1000)
```
Can be re-written with ES6 promises:
```
var wait1000 =  ()=> new Promise((resolve, reject)=> {setTimeout(resolve, 1000)})

wait1000()
  .then(function() {
    console.log('Yay!')
    return wait1000()
  })
  .then(function() {
    console.log('Wheeyee!')
  })
```
Still not convinced that Promises are better than regular callbacks? Me neither. I think once you got the idea of callbacks and wrap your head around them, then there’s no need for additional complexity of promises.

Nevertheless, ES6 has Promises for those of you who adore them. Promises have a fail-and-catch-all callback as well which is a nice feature.

8) Block-Scoped Constructs Let and Const
let is a new var which allows to scope the variable to the blocks. We define blocks by the curly braces. In ES5, the blocks did NOTHING to the vars:
```
function calculateTotalAmount (vip) {
  var amount = 0
  if (vip) {
    var amount = 1
  }
  { // more crazy blocks!
    var amount = 100
    {
      var amount = 1000
      }
  }  
  return amount
}

console.log(calculateTotalAmount(true))
```
The result will be 1000. Wow! That’s a really bad bug. In ES6, we use let to restrict the scope to the blocks. Vars are function scoped.
```
function calculateTotalAmount (vip) {
  var amount = 0 // probably should also be let, but you can mix var and let
  if (vip) {
    let amount = 1 // first amount is still 0
  } 
  { // more crazy blocks!
    let amount = 100 // first amount is still 0
    {
      let amount = 1000 // first amount is still 0
      }
  }  
  return amount
}

console.log(calculateTotalAmount(true))
```
The value is 0, because the if block also has let. If it had nothing (amount=1), then the expression would have been 1.

When it comes to const, things are easier; it’s just an immutable, and it’s also block-scoped like let. Just to demonstrate, here are a bunch of constants and they all are okay because they belong to different blocks:
```
function calculateTotalAmount (vip) {
  const amount = 0  
  if (vip) {
    const amount = 1 
  } 
  { // more crazy blocks!
    const amount = 100 
    {
      const amount = 1000
      }
  }  
  return amount
}

console.log(calculateTotalAmount(true))
```
9) Classes in ES6
```
class baseModel {
  constructor(options = {}, data = []) { // class constructor
    this.name = 'Base'
    this.url = 'http://azat.co/api'
    this.data = data
    this.options = options
  }

    getName() { // class method
      console.log(`Class name: ${this.name}`)
    }
}
```

10) Modules in ES6

in ES5 you would use require(), but in ES6 you'd use import export such as import * as

## Hoisting

While most people say that 'declarations are moved to the top of the code' to explain why function calls before it's defined still works, it's actually because 'functions and variable declarations are added to memory during the compile phase'

JavaScript only hoists declarations. Initializations are not hoisted.
If we declare and initialize a variable, say var a = 3;, only the var a; portion (the declaration) is going to be hoisted. The a = 3; (the initialization) is not hoisted and therefor not added to memory.

## Comparing two objects in JS

JavaScript has two different approaches for testing equality. Primitives like strings and numbers are compared by their value, while objects like arrays, dates, and user defined objects are compared by their reference. This means it compares whether two objects are referring to the same location in memory.

Equality check will check whether two objects have same value for same property. To check that, you can get the keys for both the objects. If the number of properties doesn't match, these two objects are not equal. Secondly, you will check each property whether they have the same value. If all the properties have same value, they are equal.

```
function isEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a),
        bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
```

## Scope

The environment, or world, that the function executes in. Default scope in JS is `Window` object of the page.

## Synchronous vs Async

In the context of software: if a program does something asynchronously, it starts it and then doesn't wait for the result. When the thing is done, something else (like the operating system) will tell the program, and then the program can use the result.

An analogy: Let's say you need to get your car fixed. You could take it to the repair shop, and wait there until it's fixed, then drive off - this is synchronous.

Alternatively, you could take it to the repair shop, leave it with them, and find something to do. When they call you to tell you the car is fixed, you go back and get the car. That's asynchronous.

Asynchronous programming is most useful when talking to a slow device (like a hard drive), or especially when communicating over a network (which is much slower than a hard drive).

In the context of computers this translates into executing a process or task on another "thread." A thread is a series of commands (a block of code) that exists as a unit of work. The operating system can manage multiple threads and assign a thread a piece ("slice") of processor time before switching to another thread to give it a turn to do some work. At its core (pardon the pun), a processor can simply execute a command, it has no concept of doing two things at one time. The operating system simulates this by allocating slices of time to different threads.

Now, if you introduce multiple cores/processors into the mix, then things CAN actually happen at the same time. The operating system can allocate time to one thread on the first processor, then allocate the same block of time to another thread on a different processor. All of this is about allowing the operating system to manage the completion of your task while you can go on in your code and do other things.

## true < 2 < 3

Since JavaScript has type coersion, in this order of priority (string, integer, boolean), the true gets converted to 
## Function.prototype

`new F()` creates a new object with the object's `[[Prototype]]` set to F.prototype.

In other words, if F has a prototype property with a value of the object type, then new operator uses it to set [[Prototype]] for the new object.

Please note that F.prototype here means a regular property named "prototype" on F. It sounds something similar to the term “prototype”, but here we really mean a regular property with this name.

Here’s the example:
```JavaScript
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
Setting Rabbit.prototype = animal literally states the following: "When a new Rabbit is created, assign its [[Prototype]] to animal
```

default prototype, constructor property

Every function has the "prototype" property even if we don’t supply it.

The default "prototype" is an object with the only property constructor that points back to the function itself.

Like this:
```JavaScript
function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/
```

#### …JavaScript itself does not ensure the right "constructor" value.

Yes, it exists in the default "prototype" for functions, but that’s all. What happens with it later – is totally on us.

In particular, if we replace the default prototype as a whole, then there will be no "constructor" in it.

For instance:
```javascript
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false
```

So, to keep the right "constructor" we can choose to add/remove properties to the default "prototype" instead of overwriting it as a whole:

```javascript
function Rabbit() {}

// Not overwrite Rabbit.prototype totally
// just add to it
Rabbit.prototype.jumps = true
// the default Rabbit.prototype.constructor is preserved
```

Or, alternatively, recreate the constructor property manually:

```javascript
Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit
};

// now constructor is also correct, because we added it
```

## Prototypal Inheritance

[[prototype]] is a special hidden property in objects that is either `null` or references another object (that object is the prototype). When a missing property is being read, JS takes it automatically from the prototype. The property [[Prototype]] is internal and hidden, but there are many ways to set it.

One way to set __prototype__:

```javascript
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;
```

Please note that __proto__ is not the same as [[Prototype]]. That’s a getter/setter for it. We’ll talk about other ways of setting it later, but for now __proto__ will do just fine.

If we look for a property in rabbit, and it’s missing, JavaScript automatically takes it from animal.

Limitations:
1) The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
2) The value of __proto__ can be either an object or null. All other values (like primitives) are ignored.

The prototype is only used for reading properties.

For data properties (not getters/setters) write/delete operations work directly with the object.

In the example below, we assign its own walk method to rabbit:
```javascript
let animal = {
  eats: true,
  walk() {
    /* this method won't be used by rabbit */
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};

rabbit.walk(); // Rabbit! Bounce-bounce!
```

From now on, rabbit.walk() call finds the method immediately in the object and executes it, without using the prototype:

For getters/setters – if we read/write a property, they are looked up in the prototype and invoked.

For instance, check out admin.fullName property in the code below:
```javascript
 let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)
```

Here in the line (*) the property admin.fullName has a getter in the prototype user, so it is called. And in the line (**) the property has a setter in the prototype, so it is called.

Note: this reference always refers to the object before the dot. The actual reference is not changed up the prototype chain.

## Why are two hamsters full?

We have two hamsters: speedy and lazy inheriting from the general hamster object.

When we feed one of them, the other one is also full. Why? How to fix it?
```javascript
 let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
alert( lazy.stomach ); // apple
```

Let’s look carefully at what’s going on in the call speedy.eat("apple").

The method speedy.eat is found in the prototype (=hamster), then executed with this=speedy (the object before the dot).

Then this.stomach.push() needs to find stomach property and call push on it. It looks for stomach in this (=speedy), but nothing found.

Then it follows the prototype chain and finds stomach in hamster.

Then it calls push on it, adding the food into the stomach of the prototype.

So all hamsters share a single stomach!

Every time the stomach is taken from the prototype, then stomach.push modifies it “at place”.

Please note that such thing doesn’t happen in case of a simple assignment this.stomach=:
```javascript
let hamster = {
  stomach: [],

  eat(food) {
    // assign to this.stomach instead of this.stomach.push
    this.stomach = [food];
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

Now all works fine, because this.stomach= does not perform a lookup of stomach. The value is written directly into this object.

Also we can totally evade the problem by making sure that each hamster has their own stomach:

```javascript
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
  stomach: []
};

let lazy = {
  __proto__: hamster,
  stomach: []
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
As a common solution, all properties that describe the state of a particular object, like stomach above, are usually written into that object. That prevents such problems.
```

## Introduction to JavaScript, environments and what it can do

programs written in this language are called scripts, which are written directly in the html and executed when the page loads. Scripts are provided and executed in plain text, so it doesn't need preparation or compilation to run.

JavaScript can also be executed in the server or any device with a special program called the `JavaScript engine`.
The engine applies optimizations at each step of the process. It even watches the compiled script as it runs, analyzes the data that flows through it, and applies optimizations to the machine code based on that knowledge. When it’s done, scripts run quite fast.
  1) The engine (embedded if it’s a browser) reads (“parses”) the script.
  2) Then it converts (“compiles”) the script to the machine language.
  3) And then the machine code runs, pretty fast.
  + V8: in Chrome and Opera
  + SpiderMonkey: Firefox
  + SquirrelFish: Safari
  + ChakraCore: Microsoft Edge

"safe" language: does not provide low-level access to memory or CPU because it was created for the browser, which does not use it.
  + Depends on the environment it runs in. Node.js allows read and write access, network requests, etc.

JS has limited capabilities on the browser to protect users from malicious webpages.
  + Can't read/write, copy, or access OS functions on user's HD. Modern JS allows for file access through file drop or        selecting a file through the input tag
  + Different tabs/windows don't know about each other and cannot access each other if they're different sites. This is       called `Same origin policy`
    - to work around that, the only way is to have both websites have code for data exchange.

What makes JS unique (the onlybrowser to have all three)
  + Full integration with HTML/CSS.
  + Simple things are done simply.
  + Support by all major browsers and enabled by default.

Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and auto-converting it “under the hood”.

Examples of such languages:

CoffeeScript is a “syntactic sugar” for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
TypeScript is concentrated on adding “strict data typing” to simplify the development and support of complex systems. It is developed by Microsoft.
Dart is a standalone language that has its own engine that runs in non-browser environments (like mobile apps). It was initially offered by Google as a replacement for JavaScript, but as of now, browsers require it to be transpiled to JavaScript just like the ones above.

## Implicit Coercions

JS is very forgiving when it comes to type errors. Ex:

```js
3 + true //true
```

Normally for statically typed languages, the above statement would not even be allowed to run. Javascript `+` operators do both concat and addition,
so in differently typed values, it likes to convert into strings first before doing a comparison. It's also left associative, so it will work from
left to right in order of operation.

```js
"2" + 3 // "23"
3 + "2" // "23"
1 + 2 + "3" // "33"
1 + "2" + 3 // "123"
"17" * 3 // 51
```

In arthmetic, when values are null, it can also convert into 0. Undefined converts to "NaN". Since "NaN" is the only value not equal to itself,
one way to test it is to compare its own value to itself.

```js
var a = NaN;
a !== a; //true
var b = 'foo';
b !== b; //false

// extracted pattern
function isReallyNan(x) {
  return x !== x;
}
```

Falsey values: false, 0, -0, "", NaN, null, and undefined.


## Blocking

Code that is slow and in the call stack.

## 7 Built-in types: Primitives vs Object Wrappers

null, undefined, boolean, number, string, object, and symbol. All these are primitives except for object.

What really happens under the hood is that if you are comparing a boolean with something other than a boolean, JavaScript coerces that boolean to a number and compares.

```js
var s = new String('hello');
typeof "hello" // 'string'
typeof s // 'object'
```

You can't compare the contents of two string objects using built-in operators.

## == vs ===

== checks for equality with coersion and === checks for equality without coersion ('strict equality').

```js
// coercion table
table
arg1          |   arg2      |  coercion

null          |  undefined  | none; always true
null or undef |  others     | none; always false
prim          | date object | prim => num. Date => prim (toString then valueOf)
prim          | non-date obj| prim => num. nonDate => prim (valueOf then toString)
prim          | prim        | prim => num
```


## Value vs Reference

Simple values (also known as primitives) are always assigned by value-copy: null, undefined , boolean, number, string and ES6 symbol.

Compound values always create a copy of the reference on assignment: objects, which includes arrays, and functions.

To copy a compound value by value, you need to make a copy of it. The reference does not point to the original value.

```javascript
const copy = c.slice()    // 'copy' references to a new value
console.log(c);           // [1,2,3,4]
console.log(copy);        // [1,2,3,4]
console.log(c === copy);  // false
```

## Function expression vs Function declaration

functions declared on a variable are not hoisted.

## Debounce and Throttle

Can be found in Lodash

Debounce will bunch a series of sequential calls to a function into a single call to that function. It ensures that one notification is made for an event that fires multiple times.

Throttle will delay executing a function. It will reduce the notifications of an event that fires multiple times.

A far-fetched metaphor, but maybe could also help.

You have a friend named Chatty who likes to talk with you via IM. Assuming when she talks she sends a new message every 5 seconds, while your IM application icon is bouncing up and down, you can take the...

Naive approach: check every message as long as it arrives. When your app icon bounces, check. It's not the most effective way, but you are always up-to-date.
Throttle approach: you check once every 5 minutes (when there are new ones). When new message arrives, if you have checked anytime in the last 5 minutes, ignore it. You save your time with this approach, while still in the loop.
Debounce approach: you know Chatty, she breaks down a whole story into pieces, sends them in one message after another. You wait until Chatty finishes the whole story: if she stops sending messages for 5 minutes, you would assume she has finished, now you check all.

## Web/Browser Render

The browser tries to render at 60fps or 16 milliseconds, but if there is a synchronous function running, it blocks the render until it's done.