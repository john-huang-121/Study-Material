## How does Rails get bundle.js from webpack?

Take a look in app/assets/application.js. You should see a few require statements.
```
//= require rails-ujs
//= require jquery
//= require jquery_ujs
//= require_tree .
```
Though these lines appear to be commented out, they are actually embedding the content of these files/libraries into our application.js file. They are embedded in the order in which they appear. In this case we are requiring jquery, then jquery_ujs (adds our CSRF token to each $.ajax call; has jquery as a dependency) libraries before including our own local files. require_tree . includes all the files in the same directory (hence the . of relativity), which will include our bundle.js file once it has been webpacked. If including local files is a certain order is required for your app, you will need to require them individually as require_tree does not guarantee ordering.

Notice that the entry key in webpack.config.js expects a file called ./frontend/pokedex.jsx to exist.

Create a frontend folder in the root directory of your project.
Add an entry file called pokedex.jsx.
import both the react and react-dom packages.
Add an event listener for DOMContentLoaded.
In the callback to this listener, try rendering a simple stateless React component to test everything we've written so far.
Don't forget to run npm run webpack to generate your bundle.js.
Your entry file might look like the following:

```javascript
// frontend/pokedex.jsx

import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<h1>Pokedex</h1>, rootEl);
});
```