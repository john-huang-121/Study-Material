## React Stateless Functional Components

A Functional component is a function that takes props and returns JSX. They do not have state or lifecycle methods. Functional components are easier to read, debug, and test. They offer performance benefits, decreased coupling, and greater reusability.

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

## Passing props to a component rendered by React Router

```javascript
<Route path='/dashboard' component={Dashboard} />
```

```javascript
<Route
  path='/dashboard'
  component={Dashboard}
  isAuthed={true}
/>
```
This approach wont work as it will just be ignored.

```javascript
<Route
  path='/dashboard'
  component={() => <Dashboard isAuthed={true} />}
/>
```
Though this will technically work, it's not the best solution performance-wise because the router uses React.createElement for a given component, but with the inline method it'll create a unmount and mount a new component every time instead of updating the existing component

```javascript
<Route
  path='/dashboard'
  render={(props) => <Dashboard {...props} isAuthed={true} />}
/>
```

In this solution, the render accepts a functional component and that function won't necessarily get remounted like component.

## HashRouter vs BrowserRouter

BrowserRouter: uses HTML5 history API (unavailable for legacy browsers like IE9 and lower) Client-side React application is able to maintain clean routes like example.com/react/route but needs to be backed by web server. Usually this means that web server should be configured for single-page application, i.e. same index.html is served for /react/route path or any other route on server side. On client side, window.location.pathname is parsed by React router. React router renders a component that it was configured to render for /react/route.

The history can be modified through `pushState` and `replaceState`

Additionally, the setup may involve server-side rendering, index.html may contain rendered components or data that are specific to current route.

CLIENT SIDE: BrowserRouter will not append the # symbol to your URL, however will create issues when you try to link to a page or reload a page. If the explicit route exists in your client react app, but not on your server, reloading and linking(anything that hits the server directly) will return 404 not found errors.



HashRouter: It uses URL hash, it puts no limitations on supported browsers or web server. Server-side routing is independent from client-side routing.

Backward-compatible single-page application can use it as example.com/#/react/route. The setup cannot be backed up by server-side rendering because it's / path that is served on server side, #/react/route URL hash cannot be read from server side. On client side, window.location.hash is parsed by React router. React router renders a component that it was configured to render for /react/route, similarly to BrowserRouter.

Most importantly, HashRouter use cases aren't limited to SPA. A website may have legacy or search engine-friendly server-side routing, while React application may be a widget that maintains its state in URL like example.com/server/side/route#/react/route. Some page that contains React application is served on server side for /server/side/route, then on client side React router renders a component that it was configured to render for /react/route, similarly to previous scenario.

SERVER SIDE: HashRouter uses a hash symbol in the URL, which has the effect of all subsequent URL path content being ignored in the server request (ie you send "www.mywebsite.com/#/person/john" the server gets "www.mywebsite.com". As a result the server will return the pre # URL response, and then the post # path will be handled by parsed by your client side react application.

## a <Switch> for exclusive multiple <Route>s

For apps with multiple routes

```javascript
<HashRouter>
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/about" component={About} />    
  </Switch>
</HashRouter>
```

Without a switch, this error might come out like this:
```
Uncaught Error: A <Router> may have only one child element
```
Note: If you just put a div instead, this makes routes inclusive (if a path matches two routes then both will render)

https://medium.com/@djoepramono/react-router-4-gotchas-2ecd1282de65
