## RESTful (Representational State Transfer)

A set of design principles for network communication to be more scalable and flexible.

1) Client server: A network must be made up of clients and servers. Browsing the internet, the computer acts as a client
    sending HTTP requests to access a server. One-to-one communication (opposite of event-based integration of broadcasters
    and eavesdroppers).
  + Server: a computer containing resources of interest.
  + Client: a computer that wants to interact with resources of interest.

2) Stateless: Client and server does not need to keep track of each others' state. When a client isn't interacting with a
    server, the server doesn't keep track of the client's existence. Likewise server doesn't keep track of past requests.
    Each request is a standalone.

3) Uniform Interface: a common language that clients and servers use. Limited by 4 sub-constraints
  + Interface Constraint I: Identification of Resources: Each resource must be uniquely identified by a stable identifier,
    which does not change across interactions, even when the state of the resource changes. If a resource is changed or moved to another identifier, the server should give the client a bad response and give a link to the new location.
    (Web uses URI to identify resources and HTTP as communication standard. To retrieve info, client makes an HTTP GET request to the URI that identifies that resource)
  + Interface Constraint II: Manipulation of Resources through Representations: Clients manipulate resources through sending
    representations to the server (usu JSON object with the content to be added, deleted, or modified). The server handles the requests and makes the modifications).
  + Interface Constraint III: Self-descriptive Messages: A message that contains all the information the recipient needs to    understand it.
  + Interface Constraint IV: Hypermedia: Data sent from the server to the client containing information about what the
    client can do next.
    HTML is a type of hypermedia. To understand this better, let’s look again at the server response above.

    <!-- <a href= “http://www.recurse.com”> Check out the Recurse Center! </a> tells the client that it should make a GET request to http://www.recurse.com if the user clicks on the link.
    <img src="awesome-pic.jpg"> tells the client to immediately make a GET request to http://www.example.com/awesome-pic.jpg so it can display the image to the user. -->

4) Caching: server responses should be label as either cacheable or non-cacheable. The ability to cache is made possible by
   "self descriptive messages" since the client knows all the relevant data associated with a request

5) Layered System: There can be more components than client server. Each component can only see and interact with the very      next layer. 
  + Proxy:: acts like a server to the initial client that sends the request, and then acts like a client when it relays that   request. 
  + Gateway: is another additional component and it translates an HTTP request into another protocol, propagates that          request, and then translates the response it receives back into HTTP. A client can simply treat a gateway as a regular     server. An example use case for gateways is a system that needs to download a file from an FTP server.

6) Code on Demand (optional): ability for servers to send executeable code to clients. This happens in HTML's `<script>` tag.
   When an HTML document is loaded, the browser automatically fetches the JavaScript from the server and executes it locally.

   ## HTML script

   If the script tag has a src, then none of it's inner script will run.