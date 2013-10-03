BANM Seed
===========

Seed for building large applications on BANM (Bootstrap, Angular, Node, Mongo) stack

To get started

1. Install
	- node from http://nodejs.org/download/
	- npm from http://nodejs.org/download/
	- mongo from http://docs.mongodb.org/manual/installation/
2. At the terminal
	- Go to root directory of source code and run 'npm install' to download all dependencies.
	- run 'node app' 
3. In the browser goto localhost:3000 for demo
4. Hack on

About the architecture: It is segregated in terms of 'client' to represent what will go on the client side and 'api' for all the api calls. It has a basic 'user' module which I think most of the projects will always need. The structure of the application is to keep each module correspond to each feature of the application, to keep it clean, dry and detach. Feel free to use it however you like. Feedback is much appriciated.