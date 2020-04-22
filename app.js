const io = require("socket.io-client");

// let socket = io.connect('http://localhost:3001')
let games = io.connect("http://localhost:3001/games");

// socket.on("welcome",(data)=>{
//   console.log("recived: " + data)
// })

//Entra em uma sala
games.emit("joinRoom", "csgo");

games.on("welcome", (msg) => {
  console.log("recived: " + msg);
});

games.on("newUser", (data) => {
  console.log(data);
});
games.on("err", (err) => {
  console.log(err);
});

games.on("success", (res) => {
  console.log(res);
});
