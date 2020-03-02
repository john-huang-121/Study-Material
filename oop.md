## Encapsulation in OOP

1) Place all code concerned with a particular set of data in one class.
2) Hide methods and data essential only to a class's internal workings (this technique is called information hiding). Conversely, the programmer should expose via methods only what's necessary to a class's relationships with other classes, thereby preventing external interference and misuse.

## Multi-paradigm

Procedural Programming: method calls. The programmer specifies a series of procedures that operate on data structures in systematic order. Defining and invoking methods outside of a class in Ruby approximates procedural programming because these methods are part of a single root object, limiting object-oriented design.

Functional Programming: pure functions, those whose return value is only determined by the input, without side effects such as changes in state. Adherents of functional programming conceive of computation as the evaluation of mathematical functions. Via blocks, Ruby shares many features of functional programming languages. Ruby features anonymous functions, lexical closures (functions that capture variables in the context where they're defined), and higher-order functions (functions that can accept functions as arguments and/or return functions). As of Ruby 2.0, Ruby even supports lazy enumeration!
