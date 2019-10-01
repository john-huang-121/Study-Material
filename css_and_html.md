## Styling Input Checkboxes (can't style default)

1) Hide the HTML input element
+ Display: None
+ Visibility: Hidden
+ Opacity: 0

The first two could silence the event listeners associated with it, so it's best to use opacity: 0.

2) Make an element and then position it absolutely (this can be styled)
```css
.private-checkbox-1 {
  cursor: pointer;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 290px;
  left: 500px;
  /* background: #eee;
  border: 1px solid #ddd; */
  border: 2px solid red;
}

/* for checked state */
.private-checkbox-2:after {
  opacity: 0.2;
  content: '';
  position: absolute;
  width: 9px;
  height: 5px;
  background: transparent;
  top: 6px;
  left: 7px;
  border: 3px solid #333;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}
```

3) Linking the input checkbox to the custom.
```css
.checkboxFive input[type=checkbox]:checked + .private-checkbox-2:after {
    opacity: 1;
}
```

https://appitventures.com/blog/styling-checkbox-css-tips/
https://paulund.co.uk/how-to-style-a-checkbox-with-css
