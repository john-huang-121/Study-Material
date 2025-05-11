## Merge Sort
```Ruby
class MergeSortAlgorithm
  # Break's the array down into two numbers (number A and number B) and sorts them.
  def sort(numbers)
    if numbers.size <= 1
      return numbers
    end

    array_size   = numbers.size
    half_of_size = (array_size / 2).round

    left_array  = numbers.take(half_of_size)
    right_array = numbers.drop(half_of_size)

    sorted_left_array = sort(left_array)
    sorted_right_array = sort(right_array)

    merge(sorted_left_array, sorted_right_array)
  end

  # This then creates a new array, loops through the left/right arrays and places the lowest number into the array. 
  def merge(left_array, right_array)
    if right_array.empty?
      return left_array # We have nothing to compare. Left wins.
    end

    if left_array.empty?
      return right_array # We have nothing to compare. Right wins.
    end

    smallest_number = if left_array.first <= right_array.first
      left_array.shift
    else
      right_array.shift
    end

    # We keep doing it until the left or right array is empty.
    recursive = merge(left_array, right_array)

    # Okay, either left or right array are empty at this point. So we have a result.
    [smallest_number].concat(recursive)
  end
end

# Let's give this a spin?
merge_sort = MergeSortAlgorithm.new
puts merge_sort.sort([4, 92, 1, 39, 19, 93, 49, 10].shuffle) # => [1, 4, 10, 19, 39, 49, 92, 93]

# How it works
# 1. Let's say the input is [4, 92, 1, 39, 19, 93, 49, 10]
# 2. Break them down in halfs. So we now have [4, 92, 1, 39] and [19, 93, 49, 10]
# 3. Break them again in halfs. Let's start with the first. So now we have [4, 92] and [1, 39]
# 4. Break until there's only one item in each. So now we have [4] and [92]
# 5. Check which one is lower. So in this case, we know 4 is lower than 92. Let's rearrange it if necessary.
# 6. Now we have [4, 92] and we do the same for [1, 39]
# 7. We now create a new array. []
# 8. We check the first element on the left array versus the first element on the right array (i.e. 4 >= 9) and then add them to the new array.
# 9. Keep doing that until it's done.
```

Time Complexity: O(n log(n))
Space Complexity: O(n)

## BFS

```JavaScript

const BFS = (rootNode) => {
  let queue = [root]

  while (queue.length > 0) {
    let current = queue.shift();

    queue.push(current.left);
    queue.push(current.right);
  }
} 
```


## DFS

```JavaScript

const DFS = (rootNode) => {
  let stack = [root]

  while (stack.length > 0) {
    let current = stack.pop();

    //push right then left because FIFO
    stack.push(current.right);
    stack.push(current.left);
  }
}
```

## Binary Search

ONLY FOR A SORTED ARRAY
A binary search works by checking if our search value is more than, less than, or equal to the middle value in our array:

+ If it’s less than, we can remove the right half of the array.
+ If it’s more than, we can remove the left half of the array.
+ If it’s equal to, we return the value

recursive
```javascript
Array.prototype.binarySearch = function (target, preservedIndex = 0) {
  if (this.length < 1) {
    return -1;
  }

  let middleIndex = Math.floor((this.length - 1)/2);

  if (this[middleIndex] === target) {
    return middleIndex + preservedIndex;
  } else if (this[middleIndex] > target) {
    return this.slice(0, middleIndex).binarySearch(target, preservedIndex);
  } else {
    return this.slice(middleIndex + 1, this.length).binarySearch(target, preservedIndex + middleIndex + 1);
  }
}
```



iterative
```javascript
Array.prototype.binarySearch = function (target) {
  let firstIndex = 0,
      lastIndex = this.length - 1,
      middleIndex = Math.floor((lastIndex + firstIndex)/2);

  while (this[middleIndex] != target && firstIndex < lastIndex) {
    if (target < this[middleIndex]) {
      lastIndex = middleIndex - 1;
    } else if (target > this[middleIndex]) {
      firstIndex = middleIndex + 1;
    }
    middleIndex = Math.floor((lastIndex + firstIndex)/2);
  }

  return (this[middleIndex] != target ? -1 : middleIndex) //return -1 if nothing is found, else return the index
}
```

Time Complexity: O(log(n))
Space Complexity: 
  + Iterative: O(1)Event Loop
  + Recursive: O(log(n))

## Quicksort

+ Choose a pivot element (usually the first)
+ For each remaining element of the array
  - if less than pivot, put in left half of the array
  - if more than pivot, put in right half of the array
+ Recursively call quickSort on left and right halves and return the full sorted array

recursive
```javascript
Array.prototype.quickSort = function (comparator) {
  if (this.length <= 1) {
    return this;
  }

  if (typeof comparator !== 'function') {
    comparator = (x, y) => {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    }
  }

  const pivot = this[0];
  const left = [];
  const right = [];

  for (let i = 1; i < this.length; i++) {
    if (comparator(this[i], pivot) === -1) {
      left.push(this[i]);
    } else {
      right.push(this[i]);
    }
  }
  
  return left.quickSort(comparator).concat([pivot]).concat(right.quickSort(comparator));
}
```

iterative (Hoare's Partitioning scheme)
```javascript
Array.prototype.quickSort = function (comparator) {
  if (typeof comparator !== 'function') {
    comparator = (x, y) => {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    }
  }
}
```

Time Complexity:
  + Best: O(n log(n))
  + Worst: O(n^2) <!-- Choosing first or last element in an already sorted array -->
Space Complexity: O(log(n))