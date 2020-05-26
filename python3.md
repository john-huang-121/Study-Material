## Lists vs Arrays

Lists and arrays are used in Python to store data(any data type- strings, integers etc), both can be indexed and iterated also. Difference between lists and arrays are the functions that you can perform on them like for example when you want to divide an array by 4, the result will be printed on request but in case of a list, python will throw an error message.

Arrays need to be declared whereas lists do not need declaration because they are a part of Python's syntax. This is the reason lists are  more often used than arrays. But in case you want to perform some arithmetic function to your list, one should go with arrays instead. 

If you want to store a large amount of data, then you should consider arrays because they can store data very compactly and efficiently.

## Ruby yield and Python yield

In ruby, yield is a shortcut that is used to call an anonymous function. Ruby has a special syntax for passing an anonymous function to a method; the syntax is known as a block. Because the function has no name, you use the name yield to call the function:
```python
def do_stuff(val)
  puts "Started executing do_stuff"
  yield(val+3)
  yield(val+4) 
  puts "Finshed executing do_stuff" 
end

do_stuff(10) {|x| puts x+3} #<= This is a block, which is an anonymous function
                            #that is passed as an additional argument to the 
                            #method do_stuff

--output:--
Started executing do_stuff
16
17
Finshed executing do_stuff
```
In python, when you see yield inside a function definition, that means that the function is a generator. A generator is a special type of function that can be stopped mid execution and restarted. Here's an example:
```python
def do_stuff(val):
    print("Started execution of do_stuff()")

    yield val + 3
    print("Line after 'yield val + 3'")
    yield val + 4
    print("Line after 'yield val + 4'")

    print("Finished executing do_stuff()")


my_gen = do_stuff(10)

val = next(my_gen)    
print("--received {} from generator".format(val))
output:

Started execution of do_stuff()
--received 13 from generator
```

More code:
```python
val = next(my_gen)    
print("--received {} from generator".format(val))
output:

Line after 'yield val + 3'
--received 14 from generator
```
From the output, you can see that yield causes a result to be returned; then execution is immediately halted. When you call next() again on the generator, execution continues until the next yield statement is encountered, which returns a value, then execution halts again.


https://stackoverflow.com/questions/35639401/python-yield-vs-ruby-yield