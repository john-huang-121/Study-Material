# What is the potential pitfall of using typeof bar === "object" to determine if bar is an object? How can this be avoided?

## while this is a good way to check, the caveat is null is also considered an "object".
## to avoid this, also check whether bar !== null.
### Note: bar will return false if it's a function, so also check whether it's a function if you want it to be true.

#