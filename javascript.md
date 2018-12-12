# What is the potential pitfall of using typeof bar === "object" to determine if bar is an object? How can this be avoided?

## while this is a good way to check, the caveat is null is also considered an "object".
## to avoid this, also check whether bar !== null.
### Note: bar will return false if it's a function, so also check whether it's a function if you want it to be true.

# What will the problem output to the console? 
# (function() {
#   var a = b = 3;
# })();

# console.log("a defined? " + (typeof a !== 'undefined'));
# console.log("b defined? " + (typeof b !== 'undefined'));

## Most developers would think that typeof a and typeof b to be both undefined since a and b are defined within the enclosed ## scope of the function. The actual shorthand for var a = b = 3 is b = 3, var a = b, not var b = 3, var a = b.
## the correct output will be a defined? false, b defined? true

## But how can b be defined outside of the scope of the enclosing function? Well, since the statement var a = b = 3; is 
## shorthand for the statements b = 3; and var a = b;, b ends up being a global variable (since it is not preceded by the 
## var keyword) and is therefore still in scope even outside of the enclosing function.

# What will the problem output to the console?
# var myObject = {
#    foo: "bar",
#    func: function() {
#        var self = this;
#        console.log("outer func:  this.foo = " + this.foo);
#        console.log("outer func:  self.foo = " + self.foo);
#        (function() {
#            console.log("inner func:  this.foo = " + this.foo);
#            console.log("inner func:  self.foo = " + self.foo);
#        }());
#    }
# };
# myObject.func();

## outer func:  this.foo = bar
## outer func:  self.foo = bar
## inner func:  this.foo = undefined
## inner func:  self.foo = bar

## In the outer function, both this and self refer to myObject and therefore both can properly reference and access foo.
## In the inner function, though, this no longer refers to myObject. As a result, this.foo is undefined in the inner 
## function, whereas the reference to the local variable self remains in scope and is accessible there.

# What is the significance of wrapping an entire JavaScript source file in a function block?

## A common practice used by JS libraries like (jQuery, Node.js, etc.) to create a closure around the contents of the file, 
## which creates a private namespace and thereby avoids potential name clashes between modules and libraries.
## Another reason is to allow and easily referenceable (pref shorter) alias for a global variable.
## jQuery allows you to disable the $ reference to the jQuery namespace, using jQuery.noConflict(). If this has been done, ## your code can still use $ employing this closure technique, as follows:
## (function($) { /* jQuery plugin code referencing $ */ } )(jQuery);

# What is the significance and benefits of including 'use strict' at the beginning of a JavaScript source file?

## 'use strict' is a voluntary way to enforce stricter parsing and error handling on JavaScript code during runtime.
## Code errors that would have been ignored or failed silently will generate errors or throw exceptions.
## + Makes debugging easier. Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions, alerting you sooner to problems in your code and directing you more quickly to their source.
## + Prevents accidental globals. Without strict mode, assigning a value to an undeclared variable automatically creates a global variable with that name. This is one of the most common errors in JavaScript. In strict mode, attempting to do so throws an error.

## + Eliminates this coercion. Without strict mode, a reference to a this value of null or undefined is automatically coerced to the global. This can cause many headfakes and pull-out-your-hair kind of bugs. In strict mode, referencing a a this value of null or undefined throws an error.

## + Disallows duplicate parameter values. Strict mode throws an error when it detects a duplicate named argument for a function (e.g., function foo(val1, val2, val1){}), thereby catching what is almost certainly a bug in your code that you might otherwise have wasted lots of time tracking down.
### Note: It used to be (in ECMAScript 5) that strict mode would disallow duplicate property names (e.g. var object = {foo: "bar", foo: "baz"};) but as of ECMAScript 2015 this is no longer the case.

## + Makes eval() safer. There are some differences in the way eval() behaves in strict mode and in non-strict mode. Most significantly, in strict mode, variables and functions declared inside of an eval() statement are not created in the containing scope (they are created in the containing scope in non-strict mode, which can also be a common source of problems.

## + Throws error on invalid usage of delete. The delete operator (used to remove properties from objects) cannot be used on non-configurable properties of the object. Non-strict code will fail silently when an attempt is made to delete a non-configurable property, whereas strict mode will throw an error in such a case.

# Will the two functions return the same thing? Why or why not?
# function foo1() {
#   return {
#      bar: "hello"
#   }; 
# }

# function foo2() {
#   return 
#   {
#      bar: "hello"
#   }; 
# }

## When invoked, foo2 will return undefined because while semicolons are technically optional in JS, a semicolon is 
## automatically added to the end of the return when encountered without open brackets