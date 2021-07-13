import bodyParser from "body-parser";
import express from "express";
import { routerCar } from "./routes/car";
import mongoose from "mongoose";
import http from "http";
import { routerUser } from "./routes/User";
import path from "path";
import { Server } from "socket.io";
var cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(
    "mongodb+srv://test:test@cluster0.cp0og.mongodb.net/test?retryWrites=true&w=majority",
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log(error));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/car", routerCar);
app.use("/user", routerUser);

server.listen(4000, () => {
  console.log("serveur start on port 4000");
});

io.on("connection", (socket) => {
  socket.on("add", (text) => {
    console.log("add");
    io.emit("ok", text);
  });
});
