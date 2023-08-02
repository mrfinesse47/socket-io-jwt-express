const path = require("path");
const express = require("express");
const colors = require("colors");
const port = 5001;
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("./config/db")();
const { errorHandler } = require("./middleware/errorMiddleware");

//connect to db -- not connecting?? check IP on mongodb atlas or user credentials

// in our case run docker-compose up

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false })); //to decode body - x-www-form-urlencoded
// able to recieve req.body.
app.use("/api/users", require("./routes/userRoutes"));

//serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("*", (req, res) => {
//     res.send("please set to production");
//   });
// }
app.use(errorHandler);
//your custom error handler should come last

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.set("socketio", io);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log("token", token);
  if (!token) {
    next(new Error("Authentication error"));
  }
  next();
});

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);
  socket.on("join_room", (data) => {
    console.log("join room?");
    //possibly we can generate a uuid and store in jwt
    //maybe we can just use a unique username
    //id say we dont send
    //here is where we shoul authenticate.
    console.log(`user with ID:${socket.id} joined room ${data}`);
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("recieve_message", data); //can be useful for a user only recieving their own updates
  });
  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });
});

// this is  server  listen as opposed to app.listen
server.listen(port, () => {
  console.log(`Server Started on port:${port}`);
});
