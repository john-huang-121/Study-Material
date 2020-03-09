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

Fingerprinting makes the name of the files dependent on contents in the file used in asset pipeline. If there are any changes, then that signals a change in naming.

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

## params in Rails controllers

The params in a controller looks like a Hash, but it's actually an instance of ActionController::Parameters, which provides several methods such as require and permit.

The require method ensures that a specific parameter is present, and if it's not provided, the require method throws an error. It returns an instance of ActionController::Parameters for the key passed into require.

The permit method returns a copy of the parameters object, returning only the permitted keys and values. When creating a new ActiveRecord model, only the permitted attributes are passed into the model.

It looks a lot like the whitelisting that was formerly included in ActiveRecord models, but it makes more sense for it to be in the controller.

## Rails Engine

Engines can be considered miniature applications that provide functionality to their host applications. A Rails application is actually just a "supercharged" engine, with the Rails::Application class inheriting a lot of its behavior from Rails::Engine.

Therefore, engines and applications can be thought of as almost the same thing, just with subtle differences, as you'll see throughout this guide. Engines and applications also share a common structure.

Engines are also closely related to plugins. The two share a common lib directory structure, and are both generated using the rails plugin new generator. The difference is that an engine is considered a "full plugin" by Rails (as indicated by the --full option that's passed to the generator command). We'll actually be using the --mountable option here, which includes all the features of --full, and then some. This guide will refer to these "full plugins" simply as "engines" throughout. An engine can be a plugin, and a plugin can be an engine.

Engines can also be isolated from their host applications. This means that an application is able to have a path provided by a routing helper such as articles_path and use an engine that also provides a path also called articles_path, and the two would not clash. Along with this, controllers, models and table names are also namespaced. You'll see how to do this later in this guide.

Note: It's important to keep in mind at all times that the application should always take precedence over its engines. An application is the object that has final say in what goes on in its environment. The engine should only be enhancing it, rather than changing it drastically.

```ruby
module Blorgh
  class Engine < ::Rails::Engine
    isolate_namespace Blorgh
  end
end
```

By inheriting from the Rails::Engine class, this gem notifies Rails that there's an engine at the specified path, and will correctly mount the engine inside the application, performing tasks such as adding the app directory of the engine to the load path for models, mailers, controllers, and views.

The isolate_namespace method here deserves special notice. This call is responsible for isolating the controllers, models, routes, and other things into their own namespace, away from similar components inside the application. Without this, there is a possibility that the engine's components could "leak" into the application, causing unwanted disruption, or that important engine components could be overridden by similarly named things within the application. One of the examples of such conflicts is helpers. Without calling isolate_namespace, the engine's helpers would be included in an application's controllers.

Note: It is highly recommended that the isolate_namespace line be left within the Engine class definition. Without it, classes generated in an engine may conflict with an application. Don't use require because it will break the automatic reloading of classes in the development environment - using require_dependency ensures that classes are loaded and unloaded in the correct manner.

By default, Rails offers a small degree of engine isolation. There is a method called `isolate_namespace`, used like this:

The default Rails Engine isolation mechanism: `isolate_namespace`.
The Rails Engine docs explain that isolate_namespace is responsible for isolating the controllers, models, routes and other code into the engine namespace, away from similar components inside the main app/ application.

```ruby
# Without isolate_namespace enabled.
class OtherEngine::OtherService
  m = MyModel.find(1) # Prefix is NOT needed.
end

# With isolate_namespace enabled.
class OtherEngine::OtherService
  m = MyEngine::MyModel.find(1) # Prefix is needed.
end
```

## Modules

A Module is a collection of methods, constants, and class variables. Modules are defined as a class, but with the module keyword not with class keyword.
A module is a way categorize the methods and constants so that user can reuse them. Suppose he wants to write two methods and also want to use these methods in multiple programs. So, he will write these methods in a module, so that he can easily call this module in any program with the help of require keyword without re-writing code.

Important Points about Modules:

+ You cannot inherit modules or you can’t create a subclass of a module.
+ Objects cannot be created from a module.
+ Modules are used as namespaces and as mixins.
+ All the classes are modules, but all the modules are not classes.
+ The class can use namespaces, but they cannot use mixins like modules.
+ The name of a module must start with a capital letter.

```ruby
# Ruby program to illustrate  
# the module

# Creating a module with name Gfg
module Gfg

    C = 10;

    # Prefix with name of Module
    # module method  
    def Gfg.portal
        puts "Welcome to GFG Portal!"
    end

    # Prefix with the name of Module
    # module method
    def Gfg.tutorial   
        puts "Ruby Tutorial!"
    end

    # Prefix with the name of Module
    # module method
    def Gfg.topic   
        puts "Topic - Module"
    end

end

# displaying the value of  
# module constant
puts Gfg::C
# calling the methods of the module
Gfg.portal
Gfg.tutorial
Gfg.topic
```

+ If the user will define a method with def keyword only inside a module i.e. def method_name then it will consider as an instance method. A user cannot access instance method directly with the use of the dot operator as he cannot make the instance of the module.
+ To access the instance method defined inside the module, the user has to include the module inside a class and then use the class instance to access that method. Below example illustrate this concept clearly.
+ The user can use the module inside the class by using include keyword. In this case, the module works like a namespace.

```ruby
module Gfg

    # module method  
    def portal
        puts "Welcome to GFG Portal!"
    end

    # module method
    def tutorial   
        puts "Ruby Tutorial!"
    end

    # module method
    def topic   
        puts "Topic - Module"
    end

end


# Create class
class GeeksforGeeks

    # Include module in class
    # by using 'include' keyword
    include Gfg

    # Method of the class
    def add
        x = 30 + 20
        puts x
    end

end

# Creating objects of class  
obj_class =  GeeksforGeeks.new

# calling module methods
# with the help of GeeksforGeeks
# class object
obj_class.portal  
obj_class.tutorial
obj_class.topic

# Calling class method  
obj_class.add  
```


## ActiveModel::Dirty (Track changes in objects)

Provides a way to track changes in your object in the same way as Active Record does.

The requirements for implementing ActiveModel::Dirty are:

+ `include ActiveModel::Dirty` in your object.

+ all `define_attribute_methods` passing each method you want to track.

+ Call `[attr_name]_will_change!` before each change to the tracked attribute.

+ Call `changes_applied` after the changes are persisted.

+ Call `clear_changes_information` when you want to reset the changes information.

+ Call `restore_attributes` when you want to restore previous data.

A minimal implementation could be:

```ruby
class Person
  include ActiveModel::Dirty

  define_attribute_methods :name

  def initialize
    @name = nil
  end

  def name
    @name
  end

  def name=(val)
    name_will_change! unless val == @name
    @name = val
  end

  def save
    # do persistence work

    changes_applied
  end

  def reload!
    # get the values from the persistence layer

    clear_changes_information
  end

  def rollback!
    restore_attributes
  end
end


person = Person.new
person.changed? # => false

person.name = 'Bob'
person.changed?       # => true
person.name_changed?  # => true
person.name_changed?(from: nil, to: "Bob") # => true
person.name_was       # => nil
person.name_change    # => [nil, "Bob"]
person.name = 'Bill'
person.name_change    # => [nil, "Bill"]

person.save
person.changed?      # => false
person.name_changed? # => false

person.previous_changes         # => {"name" => [nil, "Bill"]}
person.name_previously_changed? # => true
person.name_previous_change     # => [nil, "Bill"]
person.reload!
person.previous_changes         # => {}
# more in the link
```
https://api.rubyonrails.org/classes/ActiveModel/Dirty.html

## `respond_to` and `respond_with` in Controllers

```ruby
#app/controllers/tasks_controller.rb
  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end

    # or respond_to :html, :json
  end

  def index
    @tasks = Task.all
  end
```

If you hit /tasks.txt, and txt isn’t supported by your app, you’ll get the wrong error:

ActionView::MissingTemplate (Missing template tasks/index, application/index with {:locale=>[:en], :formats=>[:text], :variants=>[], :handlers=>[:erb, :builder, :raw, :ruby, :coffee, :jbuilder]}
This isn’t quite right. You should be telling the client that they’re requesting a format you don’t support, not that you can’t find the right file.

```ruby
def create
  @task = Task.new(task_params)

  respond_to do |format|
    if @task.save
      format.html { redirect_to @task, notice: 'Task was successfully created.' }
      format.json { render :show, status: :created, location: @task }
    else
      format.html { render :new }
      format.json { render json: @task.errors, status: :unprocessable_entity }
    end
  end
end

# Better way to write it
def create
  @task = Task.new(task_params)
  flash[:notice] = "Task was successfully created." if @task.save
  respond_with(@task)
end
```

This way, you separate your code from the formats you respond to. You can tell Rails once which formats you want to handle. You don’t have to repeat them in every action.

Note: In Rails 4.2, there’s a catch: `respond_with` is no longer included. But you can get it back if you install the responders gem. And the responders gem brings some other nice features with it.


## RSpec gem

Rails is a very heavy weight dependency, and adds significantly to the startup time from when you run rspec until you get the first feedback from the first spec running. On smaller rails apps, it may add ~3 seconds or so to the boot time; as the rails app grows it can add upwards of 10 seconds.

in our experience, you get an order-of-magnitude more productivity out of a TDD or BDD workflow if you get fast, sub-second feedback from making a change to a file and seeing the results of the tests/specs that are for the code in that file. Configuring RSpec to always load rails (which is what happens when you add --require rails_helper to .rspec) makes it impossible to get this kind of sub-second feedback. Of course, any specs for code that relies on rails will still incur the rails boot time penalty, but the default setup provided by rspec-rails allows you to have some spec files that do not depend on rails that can run very fast (generally, it's a few hundred milliseconds from running rspec path/to/spec until it's done).


That said, the default setup isn't necessarily what everyone wants, and you're absolutely correct that it's more convenient to always load rails. It's a question of what you optimize for; we've chosen to provide a default setup that optimizes for a more intentional, sustainable TDD approach, but others may choose to optimize for convenience and that's fine.

Yes, rails_helper is only intended for testing with the Rails test helpers (controller specs, view specs, active record based specs with automatic configuration, etc), a lot of Rubyists write PORO (Plain Old Ruby Object) style code, or PORO compatible within their rails apps too, so separating the config allows them to pick and choose when they start up Rails. This makes normal specs an order of magnitude faster, and doesn't really inconvenience the developer.


rspec-rails 3 generates spec_helper.rb and rails_helper.rb. spec_helper.rb is for specs which don't depend on Rails (such as specs for classes in the lib directory). rails_helper.rb is for specs which do depend on Rails (in a Rails project, most or all of them). rails_helper.rb requires spec_helper.rb. So no, don't get rid of rails_helper.rb; require it (and not spec_helper.rb) in your specs.

If you want your non-Rails-dependent specs to enforce that they're non-Rails-dependent, and to run as fast as possible when you run them by themselves, you could require spec_helper.rb rather than rails_helper.rb in those. But it's very convenient to -r rails_helper in your .rspec rather than requiring one helper or the other in each spec file, so that is sure to be a popular approach.

```ruby
# hello_spec.rb

require 'rspec'
require 'hello'

describe "#hello_world" do
  it "returns 'Hello, World!'" do
    expect(hello_world).to eq("Hello, World!")
  end
end

# hello.rb

def hello_world
  "Hello, World!"
end
```

https://github.com/appacademy/curriculum/blob/master/ruby/readings/rspec-syntax.md