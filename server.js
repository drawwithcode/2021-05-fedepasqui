console.log("up and running");

//uploaded express which is able to provide files to the server
let express = require("express");

//loading express
let app = express();

//creating a port to activate express
let port = process.env.PORT || 3000;

//connection will happen on the port 3000
let server = app.listen(port);

console.log("server is running on http://localhost:" + port);

//get items form the public folder
app.use(express.static("public"));

//import socket.io library
let serverSocket = require("socket.io");

//create a new object that will handle incoming and outcoming (io) messages
let io = serverSocket(server);

//a function that runs when a certain event happens, in this case is connection
io.on("connection", newConnection);

function newConnection(newSocket) {
  console.log(newSocket.id);

  //when you receive a message "kind of message" and execute the function mouseMessage()
  newSocket.on("mouse", mouseMessage);

  function mouseMessage(dataReceived) {
    console.log(dataReceived);

    //send the information back to all the other clients connected (broadcast)
    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
