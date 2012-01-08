Node Boilerplate 
=================

Heavily modifed version of [this](https://github.com/robrighter/node-boilerplate)

*Requires Node v0.6.6 (or newer)*
node-boilerplate takes html-boilerplate, express, connect, jade and Socket.IO and organizes them into a ready to use website project. Its a fast way to get working on your Node website without having to worry about the setup. It takes care of all the boring parts, like setting up your views, 404 page, 500 page, getting the modules organized, etc... 

Node Boilerplate has these goals:

1. To end the repetition involved with starting a new Node website project
2. To never install anything outside of the project directory (For easier production deployment)
3. To make it easy to install additional modules within the project directory
4. To enable easy upgrade or freezing of project dependencies  
5. Quickly show best partices in regards to project organization, and code formating

To start a project:
    
    git clone git://github.com/robrighter/node-boilerplate.git mynewproject
    cd mynewproject
    rm -rf .git
    npm install
    
This will copy all of the required project files, and remove the reference to this git repo so you can start your own


To run the boilerplate template app:

    node server.js

Go to http://localhost:3000 and login via facebok or local.  Once you are logged in you can send simple chat messages to yourself.


Additional Features:

1. Creates a package.json file consistent with associated best practices (http://blog.nodejitsu.com/package-dependencies-done-right)
2. Adds .gitignore for the node_modules directory
3. Includes 404 page and associated route
4. Includes 500 page
5. Loads external config vars using [nconf](https://github.com/flatiron/nconf) from env vars, shell vars, and confi file vars
6. Automatic route loading
7. Authentecation built in
8. Ready for unit tests

To add additional modules:

Update the package.json file to include new module dependancies and run 'npm install'.


Possible Future Additions:

1. Google Ananlytics tie in to all pages
2. HTML5 Boilerplate
3. ...