## Array.new

When making arrays with this pattern, it references the same object in all 3 instances. Therefore you should use a block if you want to make mutable objects.

```ruby
ary = Array.new    #=> []
Array.new(3)       #=> [nil, nil, nil]
Array.new(3, true) #=> [true, true, true]

# mutable objects

Array.new(4) { Array.new } #=> [[], [], [], []]
```
