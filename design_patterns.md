## 3 Tenets of Service Objects

Service Objects/Operations: A PORO (plain old ruby object) to decompose business objects into manageable classes and methods.
The most common method to use for the one public method constraint is .call

They should have 3 things:

1) Single Responsibility/One Public Method:
  First style:

  ```ruby
  #services/thing_service.rb
  class ThingService

    def initialize(param1)
      @param1 = param1
    end

    def call
      private_method
    end
    private

    attr_reader :param1...
  end
  ### and calling by ThingService.new(param1).call
  ```

  Second Style:

  ```ruby
  #services/thing_service.rb
  class ThingService
    def self.call(param1)
      new(param1).call
    end

    def call
      private_method
    end

    private

    def initialize(param1)
      @param1 = param1
    end

    attr_reader :param1...
  end
  ### and calling by ThingService.call(param1)
```

The main idea here is that you are working to restrict your object to one public method that will be called throughout your application(mostly controllers).

2) Manage dependencies privately and optimally

```ruby
#services/thing_service.rb
class ThingService

  def initialize(param1)
    @param1 = param1
  end
  def call
    result = other_service.call
    private_method(result)
  end  
  private
  attr_reader :param1  

  def other_service
    @other_service ||= OtherService.new(param1)
  end...
end
```

While this isn’t a huge change from other methods of dependency injection, this can make it easier to change the public method as you refactor as it is no longer directly responsible for another service’s instantiation.

3) Return an object

```ruby
#services/thing_service.rb
class ThingService

  def initialize(param1)
    @param1 = param1
  end
  def call
    private_method
  end
  private
  attr_reader :param1
  def private_method
    things = do_something(param1)
  rescue SomeSpecificException => exception
    OpenStruct(success?: false, things: nil, error: exception.message)
  else
    OpenStruct(success?: true, things: thingserror: nil)
  end
end
```

Aside from structs, you can even create your own Response classes/objects or use some pretty nifty gems that tend to wrap Response/Result object functionality rather well. One of my go to gems if I go that route is Github::DS gem which has a Github::Result object.

## Microservices Architecture

https://martinfowler.com/articles/microservices.html

"Microservices" - yet another new term on the crowded streets of software architecture. Although our natural inclination is to pass such things by with a contemptuous glance, this bit of terminology describes a style of software systems that we are finding more and more appealing. We've seen many projects use this style in the last few years, and results so far have been positive, so much so that for many of our colleagues this is becoming the default style for building enterprise applications. Sadly, however, there's not much information that outlines what the microservice style is and how to do it.

In short, the microservice architectural style [1] is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.

These frustrations have led to the microservice architectural style: building applications as suites of services. As well as the fact that services are independently deployable and scalable, each service also provides a firm module boundary, even allowing for different services to be written in different programming languages. They can also be managed by different teams .

(To be further read on)
