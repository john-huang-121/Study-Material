## React Stateless Functional Components

1) No class needed. This eliminates extra code such as extends and constructor, which in general is a win.
2) No this keyword. Stateless component is just a function, so the JS quirks of this and bind are avoided. For example:
```
onClick={this.sayHi.bind(this)}>Say Hi</a>
onClick={sayHi}>Say Hi</a>
```
3) Enforced best practices. Stateless functional components are useful for dumb/presentational components. Presentational components focus on the UI rather than behavior, so it’s important to avoid using state in presentational components. Instead, state should be managed by higher-level “container” components, or via Flux/Redux/etc. Stateless functional components don’t support state or lifecycle methods. This is a good thing because it protects from laziness.

4) High signal-to-noise ratio. Stateless functional components require less typing, which translates to less noise.
5) Code completion/Intellisense. If props are destructured in ES6, then all the data are specified as a simple function argument leading to improved intellisense support compared to class based components.
6) Bloated components and poor data structures are easily spotted. A function that takes in a lot of parameters is a code smell. When you use ES6 destructuring with your stateless components, the argument list clearly conveys your component’s dependencies. Thus, it’s easy to spot components that need attention. In this case, you can either break up the component or rethink the data structures you’re passing around. Sometimes a long list of props can be easily resolved by passing an object instead. But if the props aren’t logically related enough to justify a single object, then it’s likely time to refactor the component into multiple separate components.
7) Easy to understand. It is simply a function that takes props and spits out HTML. It's simple and a pure function.
8) Easy to test. Given these props, you should expect a certain markup with the prop inside.
9) Performance. No state and lifecycle methods to worry about. 

Strive to use stateless functional components whenever possible

## React binding patterns: 5 ways to handle 'this'

1) Use React.createClass. React autobinds all functions to 'this', so it's already bound for component's instances.
However with ES6 classes, this feature may be removed from React core in the future.
2) Bind in render.
```
onChange={this.handleChange.bind(this)}
```
There are performance implications because the function is reallocated on every render. Good news is the performance implications of this approach is unlikely to be noticeable in most apps.
3) Use arrow functions in Render.
```
onChange={e => this.handleChange(e)}
```
Has the same potential impact as number 2
4) Bind in constructor.
```
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
}
```
This is the current recommended way to bind according to React docs.
5) Use arrow function in class property. This technique relies upon the proposed class property feature. To use this approach, you must enable transform-class-properties or enable stage-2 in Babel.
```
handleChange = () => {
  // call this function from render 
  // and this.whatever in here works fine.
};
```
This approach has multiple advantages:

Arrow functions adopt the this binding of the enclosing scope (in other words, they don’t change the meaning of this), so things just work automatically.
It avoids the performance issues of approaches #2 and #3.
It avoids the repetition in approach #4.
It’s straightforward to refactor from the ES5 createClass style into this style by converting relevant functions into arrow functions. In fact, there’s a completely automated way to handle this using a codemod.