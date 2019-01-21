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

    stack.push(current.left);
    stack.push(current.right);
  }
}
```
