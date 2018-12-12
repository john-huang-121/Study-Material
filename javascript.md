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