/*
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

/*
Binary Tree Traversal
*/

//  iterative
var preorderTraversal = function(root) {
    if (!root) return [];
    let result = [];
    let stack = [root];

    while (stack.length > 0) {
        let currentNode = stack.pop();
        result.push(currentNode.val);
        if (currentNode.right) stack.push(currentNode.right);
        if (currentNode.left) stack.push(currentNode.left);
    }

    return result;
};

// recursive

var preorderTraversal = function(root, arr = []) {
  if (root) {
      arr.push(root.val);
      preorderTraversal(root.left, arr);
      preorderTraversal(root.right, arr);
  };
    
  return arr;
};

// iterative

var inorderTraversal = function(root) {
    const stack = [];
    let curr = root;
    let results = []; 
    while (stack.length > 0 || curr != null) {
        while(curr != null){
            stack.push(curr);
            curr = curr.left;
        }
        curr =  stack.pop();
        results.push(curr.val);
        curr = curr.right;
    }
    return results;
};

// recursive
var inorderTraversal = function(root, arr = []) {
    if (root) {
        inorderTraversal(root.left, arr);
        arr.push(root.val);
        inorderTraversal(root.right, arr);
    }
    
    return arr;
};

// iterative

var postorderTraversal = function(root) {
    if (!root) return [];
    
    let queue = [root],
        result = [];
    
    while (queue.length > 0) {
        let currentNode = queue.shift();
        
        result.unshift(currentNode.val);
        
        if (currentNode.left) queue.unshift(currentNode.left);
        if (currentNode.right) queue.unshift(currentNode.right);
    }
    
    return result;
};
// recursive
var postorderTraversal = function(root, arr = []) {
    if (root) {
        postorderTraversal(root.left, arr);
        postorderTraversal(root.right, arr);
        arr.push(root.val);
    }
    
    return arr;
};

/* Heaps */

class MinHeap {
    constructor(data = new Array()) {
      this.data = data;
      this.compareVal = (a, b) => a - b;
      this.heapify();
    }
  
    heapify() {
      if (this.size < 2) {
        return;
      }
  
      for (let i = 0; i < this.data.length; i++) {
        this.percolateUp(i);
      }
    }

    peek() {
        if (this.size() === 0) {
            return null;
        }
        return this.data[0];
    }

    // enqueue?
    offer(value) {
        this.data.push(value);
        this.percolateUp(this.size() - 1);
    }

    // dequeue?
    poll() {
        if (this.size() === 0) {
            return null;
        }
        const result = this.data[0];
        const last = this.data.pop();
        if (this.size() !== 0) {
            this.data[0] = last;
            this.percolateDown(0);
        }

        return 0;
    }
  
    percolateUp(index) {
        while (index > 0) {
          const parentIndex = (index - 1) >> 1;
          if (this.compareVal(this.data[index], this.data[parentIndex]) < 0) {
            this.swap(index, parentIndex);
            index = parentIndex;
          } else {
            break;
          }
        }
      }
    
      percolateDown(index) {
        const lastIndex = this.size() - 1;
        while (true) {
          const leftIndex = index * 2 + 1;
          const rightIndex = index * 2 + 2;
          let findIndex = index;
    
          if (
            leftIndex <= lastIndex &&
            this.compareVal(this.data[leftIndex], this.data[findIndex]) < 0
          ) {
            findIndex = leftIndex;
          }
    
          if (
            rightIndex <= lastIndex &&
            this.compareVal(this.data[rightIndex], this.data[findIndex]) < 0
          ) {
            findIndex = rightIndex;
          }
    
          if (index !== findIndex) {
            this.swap(index, findIndex);
            index = findIndex;
          } else {
            break;
          }
        }
      }
    
      swap(index1, index2) {
        [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
      }
    
      size() {
        return this.data.length;
      }
}
  