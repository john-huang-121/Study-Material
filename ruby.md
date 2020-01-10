## Array.new

When making arrays with this pattern, it references the same object in all 3 instances. Therefore you should use a block if you want to make mutable objects.

```ruby
ary = Array.new    #=> []
Array.new(3)       #=> [nil, nil, nil]
Array.new(3, true) #=> [true, true, true]

# mutable objects

Array.new(4) { Array.new } #=> [[], [], [], []]
```

## Ruby 2.3 Hash#dig

Since Ruby 2.3 launched its new Hash#dig and Array#dig feature, it got my attention on how it would help “digging” unreliable objects. This incredible method makes you safely navigate through nested objects when dealing with third party APIs.

The #dig is basically an elvis operator for hashes and arrays. It’ll retrieve a value from the array/hash, given a set of keys. If no value is found, it’ll return nil

```ruby
# receiving params as `params = { user: { choices: ["1", "3", "5"] } }`
def coerce_user_choices
  choices = params.dig(:user, :choices) || []
  choices.map(&:to_i)
end
# That’s nice! Way better than reading

params[:user] && params[:user][:choices] || []
```

https://tiagoamaro.com.br/2016/08/27/ruby-2-3-dig/
