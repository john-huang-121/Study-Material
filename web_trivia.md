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

## Appending arrays to new FormData can lose information

iterate through the array and append it individually.
https://stackoverflow.com/questions/16104078/appending-array-to-formdata-and-send-via-ajax

## How Hosting works

A web host is a big computer (server) where people store websites and may offer these add-ons.
+ Domain registration – So you can buy and manage domain and hosting from the same provider
+ Website builder – Drag-and-drop web editing tool to create a website
+ Email hosting – To send and receive emails from email@yourdomain.com
+ Basic technical and CMS (ie. WordPress) support

4 types of hosting. While all types of servers will act as a storage center for your website, they differ in the amount of storage capacity, control, technical knowledge requirement, server speed, and reliability.

1) Shared - Your website is placed in the same server as many other sites. Typically a domain shares a common pool of server    resources such as RAM and CPU.
  + Disadv: No root access, limited ability to handle high traffic/spikes, and site performance can be affected by other
    sites on the server.

    cost: <$10/mo

2) Virtual Private Server (VPS) - divides a server into virtual servers where each website is like their own dedicated          server, but is actually still shared.
  + Adv: Users have root access to their own virtual space and better secured hosting environment.
  + Disadv: limited ability to handle high traffic/spikes and can still be affected by traffic to other sites.

  cost: $20 - 60/mo

3) Dedicated - You exclusively rent an entire server with only your websites stored inside.
  + Adv: Maximum control over the server and better server performance.
  + Disadv: Very costly 
  
    cost: $80 and more

4) Cloud Hosting - A team of servers (a cloud) work together to host a group of websites.
  + Adv: Unlimited ability to handle high traffic/ spikes
  + Disadv: Many cloud hosting setup do not offers root access (required to change server settings and install some software)

## Things to do after buying your domain name

Need domain name, web host, and developed website to own a website.

1) Find a hosting site (server) to store and display your website (ie inmotionhosting). Once that's done, transfer the
   domain's nameservers to the hosting site so it points to the location of the host.
  + to do this, login to the domain name registrar to locate the nameservers.

2) Set up a domain specific email address through the control panel in the hosting site (ie cPanel).

3) Use the template websites like wordpress to set up a quick and easy website, or through the FTP process, transfer a
   custom HTML doc over to the public_html folder. This folder is the one folder that is executed when traffic comes in.
   To transfer files, use FTP software like Filezilla to upload the contents.

## How Domain Name Works

Governed by Internet Corporation for Assigned Names and Numbers (ICANN), a global regulator of best practices for registrars,
web hosts, and clients. All customers registering a domain name must be prepared to furnish contact information for themselves, their organization, their business, and even their employer in some cases.

You can look up information about a domain through WhoIs.

Domain Name = a string of characters that give your website an identity. To own a domain, you need to register with domain
registrar and buy it.

Heirarchy of Names:

Top Level Domains (TLDs) - the extensions COM, NET, ORG, EDU, INFO, BIZ, CO.UK, etc. (ie Google.com)

While most of these TLDs are open for public’s registration, there are strict regulations on certain domain registration. For example the registration of country code top level domains (like .co.uk for United Kingdom) are restricted for the citizens of the corresponding country; and the activities with such domains website are ruled by local regulations and cyber laws.

For example, only organizations can register a “.org” domain name, and only American citizens can register a domain name that ends in “.us.” Failing to meet the guidelines and requirements for each type of domain during the actual registration and payment process will result in the domain name being “released” back into the pool of available domain names; the customer will have to pick a top level domain for which they actually qualify, or cancel their purchase altogether.

Third Level Domains (Subdomains) - can be added on to existing domains if the host allows (mail.yahoo.com). Like subfolders
in a root directory.

Note: search engines (namely, Google) treat sub domain as a different domain independent from the primary domain.