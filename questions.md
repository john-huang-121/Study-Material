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