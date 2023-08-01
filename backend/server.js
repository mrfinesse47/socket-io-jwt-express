const path = require("path");
const express = require("express");
const colors = require("colors");
const port = 5001;
const cors = require("cors");

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

app.listen(port, () => {
  console.log(`Server Started on port:${port}`);
});
