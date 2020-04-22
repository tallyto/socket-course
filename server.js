const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const http = require("http").createServer(app);

const io = require("socket.io")(http);

// io.on('connection', (soket)=> {
//   soket.emit("welcome", "Hello and Welcome to Socket.io Server")
// })

let gameRooms = ["super mario", "donkey kong", "csgo"];

// Namespaces
io.of("/games").on("connection", (socket) => {
  console.log("New client");
  socket.emit("welcome", "Hello and Welcome to Games area.");

  socket.on("joinRoom", (room) => {
    if (gameRooms.includes(room)) {
      socket.join(room);
      io.of("/games").in(room).emit("newUser", "New Player has joine the " + room);
      return socket.emit("success", "You have succefully Joined this Room");
    } else {
      return socket.emit("err" + "No Room named " + room);
    }
  });

  // Metodo para desconectar 
  // socket.disconnect()
});


http.listen(PORT, () => {
  console.log("Server in listening on http://localhost:" + PORT);
});
