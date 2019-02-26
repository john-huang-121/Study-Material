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