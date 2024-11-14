const express = require("express");
const app = express();
let http = require("http");
let socketio = require("socket.io");

let server = http.createServer(app);
let io=new socketio.Server(server,{
	cors:{
		origin: "*"
	}
})
app.set("port", process.env.PORT || 8000);
io.on("connection",function(connection) {
	console.log("a user connected");
    connection.on("chat", function(msg) {
		console.log(msg)
		console.log(connection.id)
        io.emit("chat", msg);
    });
    connection.on("disconnect", function() {
        console.log("user disconnected");
    });
})
app.get("/", (req, res, next) => {
  res.send("<h1>Hello world<h1>");
});

server.listen(app.get("port"), () => {
  console.info(`Server listen on port ${app.get("port")}`);
});
