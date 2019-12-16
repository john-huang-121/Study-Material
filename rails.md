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

## What is the Asset Pipeline?

The asset pipeline provides a framework to concatenate and minify or compress JavaScript and CSS assets. It also adds the ability to write these assets in other languages and pre-processors such as CoffeeScript, Sass and ERB. It allows assets in your application to be automatically combined with assets from other gems.

The asset pipeline is implemented by the sprockets-rails gem, and is enabled by default.

1) Concatenate assets, which can reduce the number of requests that a browser makes to render a web page. Web browsers are limited in the number of requests that they can make in parallel, so fewer requests can mean faster loading for your application.

Sprockets concatenates all JavaScript files into one master .js file and all CSS files into one master .css file. As you'll learn later in this guide, you can customize this strategy to group files any way you like. In production, Rails inserts an SHA256 fingerprint into each filename so that the file is cached by the web browser. You can invalidate the cache by altering this fingerprint, which happens automatically whenever you change the file contents.

2) Asset minification or compression. For CSS files, this is done by removing whitespace and comments. For JavaScript, more complex processes can be applied. You can choose from a set of built in options or specify your own.

3) It allows coding assets via a higher-level language, with precompilation down to the actual assets. Supported languages include Sass for CSS, CoffeeScript for JavaScript, and ERB for both by default.

With the asset pipeline, the preferred location for these assets is now the app/assets directory. Files in this directory are served by the Sprockets middleware.

In production, Rails precompiles these files to public/assets by default. The precompiled copies are then served as static assets by the web server. The files in app/assets are never served directly in production.

## if __FILE__ == $PROGRAM_NAME

This checks to see if the currently running program ($PROGRAM_NAME) is the same as the current file (primes.rb). If so, then this is being invoked as a script, so we should kick things off. Otherwise, we're loading it as part of some other program (like irb or Pry), and we shouldn't do more than load the method definitions so that someone else may use them.

## Using byebug gem as a debugger

step: (or s) is the command that we use to step into a method call

next: (or n), to advance if there's no method call

continue: (or c) to tell the debugger to keep running the code.

type `list=` to re-display where you are paused in the source code.

`display some_variable` to track variables through the debug

`where` command allows you to view the stack trace without having to raise an error. Suppose that you have a method that is called from different parts of your program. Usually the method works as expected, but every once in a while your method raises an error or produces an unexpected result. The method itself might be fine, but maybe it's being called with bad parameters. However, you don't want to go to all of the different places in your program where the method is called and put a debugger statement at each one to diagnose the problem, especially if the method calls are spread across different classes and files.

It would be much easier if we could put a single debugger within the method in question, and then look back to see where that method was actually called in the code. Then, once you know where the problem originated, you can fix it.

```ruby
require 'byebug'

def prime?(num)
  debugger # drops us into the debugger right after this point

  (1..num).each do |idx|
    if num % idx == 0
      return false
    end
  end
end

def primes
  # ... etc.
```
