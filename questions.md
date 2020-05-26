## Print all positive integer solutions to the equation a^3 + b^3 = c^3 + d^3, where a,b,c,d are all int from 1 to 1000

brute force
```javascript
let n = 1000;

for (let a = 1; a <= 1000; a++) {
  for (let b = 1; b <= 1000; b++) {
    for (let c = 1; c <= 1000; c++) {
      for (let d = 1; d <= 1000; d++) {
        if (Math.pow(a, 3) + Math.pow(b, 3) === Math.pow(c, 3) + Math.pow(d, 3)) {
          console.log(a, b, c, d);
        }
      }
    }
  }
}
```

## Given an array of random numbers, produce a histogram.

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello Histogram</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/jsx">
      let arr = Array.from({length: Math.floor(Math.random() * 40)}, () => Math.floor(Math.random() * 40));
      ReactDOM.render(
        <div>
          <h1 style={{color: 'lightblue'}}>Histogrammo!</h1>
          <div style={{color: 'lightblue'}}>{arr.join(', ')}</div>
        </div>,
        document.getElementById('root')
      ); Given arr of num, produce a histogram that shows distribution of numbers in arr, don't know the range

      function histogram (numArr) {
        let hash = {},
            maxVal = numArr[0];
            
        for (let i = 1; i < numArr.length; i++) {
            if (numArr[i] > maxVal) {
              maxVal = numArr[i];
            }
        }
        
        //optional code, if sequence of numbers is not important
        for (let j = 0; j <= maxVal; j++) {
          hash[j] = 0;
        }
                
        for (let k = 0; k < numArr.length; k++) {
          hash[numArr[k]] += 1;    
        }
        
        return hash;
      }

      console.log(histogram(arr));
    </script>
  </body>
</html>
```

## Given an array between 0 - 9, sort the numbers in O(n) time.

```javascript
let arr = [0, 1, 6, 1, 2, 4, 9];

let rangeSort = (numArr) => {

  let result = [];
  let hash = {};

  numArr.forEach((number) => hash[number] = 0)
  
  numArr.forEach((number) => hash[number] += 1)

  Object.keys(hash).forEach((key) => {
    while (hash[key] > 0) {
      result.push(Number(key));
      hash[key] -= 1;
    } 
  })

  return result;
}
```

## Transpose a 2D array

mutates the array. set up a result variable if you dont want to mutate.

```javascript
function transpose(arr) {

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr[i].length; j++) {
      [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
    }
  }

  return arr;
}
```

## Morse Code (Binary Tree)

Given a string of dots, dashes, and ?, give the possible letters that could be represented in morse code. 

```ruby
# --.-.?.-
# binary tree to map the morse code
class Node
  attr_reader :left, :right, :val

  def initialize(left, right, val)
    @left = left
    @right = right
    @val = val
  end
end

# create the morse tree
class MorseTree
  attr_reader :root
  
  def initialize
    @root = self.create
  end
  
  # factory method to populate the tree
  def create
    # left side of the morse code tree
    s_node = Node.new(nil, nil, 'S')
    u_node = Node.new(nil, nil, 'U')
    i_node = Node.new(s_node, u_node, 'I')

    r_node = Node.new(nil, nil, 'R')
    w_node = Node.new(nil, nil, 'W')
    a_node = Node.new(r_node, w_node, 'A')

    e_node = Node.new(i_node, a_node, 'E')

    # right side of the tree
    d_node = Node.new(nil, nil, 'D')
    k_node = Node.new(nil, nil, 'K')
    n_node = Node.new(d_node, k_node, 'N')

    g_node = Node.new(nil, nil, 'G')
    o_node = Node.new(nil, nil, 'O')
    m_node = Node.new(g_node, o_node, 'M')

    t_node = Node.new(n_node, m_node, 'T')

    root_node = Node.new(e_node, t_node, nil)
  end
end

# tree traversal
def morse_code_tree_decoder(str, morse_code_tree)
  return morse_code_tree.val if str == ''

  if str[0] == '.'
    morse_code_tree_decoder(str[1..-1], morse_code_tree.left)
  elsif str[0] == '-'
    morse_code_tree_decoder(str[1..-1], morse_code_tree.right)
  end
end

def morse_helper(word)
  return word if !word.include?('?')
  
  morse_poss = []
  i = 0

  while i < word.length
    if word[i] == '?'
      temp1 = word[0...i].concat('.').concat(word[i+1..-1])
      temp2 = word[0...i].concat('-').concat(word[i+1..-1])
      morse_poss.push(morse_helper(temp1))
      morse_poss.push(morse_helper(temp2))
    end

    i +=1
  end
  
  morse_poss
end

#the actual method ran
def possibilities(word)
  if !word.include?('?')
    morse_configs = [morse_helper(word)]
  else
    #morse_helper needs to be refactored to remove flatten and uniq
    morse_configs = morse_helper(word).flatten.uniq
  end
  
  result = []
  morse_tree = MorseTree.new.root
  
  # conversion of dots and dashes into letters
  morse_configs.each do |guess|
    result.push(morse_code_tree_decoder(guess, morse_tree))
  end
  
  result
end
```