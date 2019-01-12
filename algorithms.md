## Merge Sort
```Ruby
def merge_sort(array)
  return array if array.count < 2

  middle = array.count / 2
  left = array.take(middle)
  right = array.drop(middle)

  sorted_left = merge_sort(right)

```