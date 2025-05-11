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

class Heap {
	constructor(compare, value) {
		this.heap = [];
        this.compare = compare;
        this.value = value;
	}
	
    leftChild(index) {
        return index * 2 + 1;
    }

    rightChild(index) {
        return index * 2 + 2;
    }

    parent(index) {
        return Math.floor((index - 1) / 2);
    }
	
    insert(element) { //log n)
       this.heap.push(element);
	   
       // the index of the element we have just pushed
       let i = this.heap.length - 1;
       element.index = i;
	   
       this.__bubbleUp(i);
    }

    __bubbleUp(i) {
      // if the element is greater than its parent:
      // swap element with its parent
      //Bubble Up / Sift Up
      while(i > 0) {
        let p = this.parent(i);

         if( this.compare(this.heap[p], this.heap[i]) ) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[p];
                this.heap[p] = temp;
             
                this.heap[i].index = i;
                this.heap[p].index = p;
                i = p;
          } else {
               break;
          }
       }
     }
	 
	 extractMax() {
         if(this.heap.length === 1)
             return this.heap.pop();

        let data = this.heap;

        // stroing maximum value
        let root = data[0];
         
        // making root equal to the last element
        let end = data.pop();

        data[0] = end;
        data[0].index = 0;
         
        let eIdx = data.length - 1;

        // correctly re-position heap
        // as root is not following max-heap property
        this.__siftDown(0, eIdx);

        return root;
	 }
	 
     __siftDown(start, end) {//O(log n)
         let left = this.leftChild(start);
         let right = this.rightChild(start);

         let largest;

         if(
             (left <= end) && 
             this.heap[start] &&
             this.heap[left] &&
             ( this.compare(this.heap[start], this.heap[left]) )
           ) {
             largest = left
            } else  {
                 largest = start;
          }

         if(
             (right <= end) && 
             this.heap[largest] && 
             this.heap[right] && 
             ( this.compare(this.heap[largest], this.heap[right]) )
         ) {
             largest = right;
         }

         if(largest !== start) {
             const tmp = this.heap[largest];
             this.heap[largest] = this.heap[start];
             this.heap[start] = tmp;
             
             this.heap[largest].index = largest;
             this.heap[start].index = start;
             
             this.__siftDown(largest, end);
         }
     }
    
    remove(pos) {
        this.heap[pos].price = this.value;
        this.__bubbleUp(pos);
        this.extractMax();
    }
	 
     peek() {
         // the root is always the highest priority item
         return this.heap[0];
     }
}
  