## Docker

Normally, everytime a version changed in any of the gems, libraries, OS, hardware, databases, etc,
people had to continuously check the system to see that it's running correctly and there are no
compatibility issues (Referred to as 'The Matrix from Hell'). The main advantage of docker is to
containerize components and run them anytime, anywhere, and as many times as you want.
  + compatibility issues
  + long setup time
  + different dev/test/prod environments to configure

With docker, you can put each component in its own container with its own libraries and dependencies
all in the same virtual machine. Benefits:
  + containerize applications

Containers: completely isolated environments with its own processes, network interfaces, and mounts
but they share the same OS kernel. This means that docker can run any flavor of OS as long as they
all share the same kernel (Linux or Ubuntu, etc). Docker uses LXC containers.
