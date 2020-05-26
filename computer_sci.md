## Bits, Bytes, and bitmasking

Bits and Bytes

In computing, numbers are internally represented in binary. This means, where you use an integer type for a variable, this will actually be represented internally as a summation of zeros and ones.

As you might know, a single bit represents one 0 or one 1. A concatenation of eight of those bits represent a Byte, e.g. 00000101, which is the number 5. I presume you know how numbers are represented in binary, if not, take a look here.

In PHP a number is (mostly) 4 Bytes long. This means that your number actually uses 32 bits of the internal storage. But for simplicity reasons, throughout this answer I will use 8 bit numbers.

Storing states in bits

Now imagine you want to create a program that holds a state, which is based on multiple values that are one(true) or zero(false). One could store these values in different variables, may they be booleans or integers. Or instead use a single integer variable and use each bit of its internal 32 bits to represent the different true and falses.

An example: 00000101. Here the the first bit (reading from right to left) is true, which represents the first variable. The 2nd is false, which represents the 2nd variable. The third true. And so on...

This is a very compact way of storing data and has many usages.

Bit Masking

This is where bit masking comes in. It sounds complex but actually it's very simple.

Bit masking allows you to use operations that work on bit-level.

Editing particular bits in a byte(s)
Checking if particular bit values are present or not.
You actually apply a mask to a value, where in our case the value is our state 00000101 and the mask is again a binary number, which indicates the bits of interest.

By performing binary operations on the mask and the state one could achieve the following:

The AND operator extracts a subset of the bits in the state
The OR operator sets a subset of the bits in the state
The XOR operator toggles a subset of the bits in the state
If we want to set a particular value to true, we could do this by using the OR operator and the following bit mask:
```
Mask:   10000000b
Value:  00000101b
---- OR ---------
Result: 10000101b
```
Or one could select a particular value from the state by using the AND operator:
```
Mask:   00000100b
Value:  00000101b
---- AND ---------
Result: 00000100b
```
I suggest you to take some deeper look into it and get familiar with the jargon. A good start may be this link.

Goodluck!

https://stackoverflow.com/questions/31575691/what-is-a-bitmask-and-a-mask