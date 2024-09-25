import express from "express";
import routes from "./routes.js";
import mongoose from "mongoose";
import path from "path";
class App {
  constructor() {
    this.server = express();
    mongoose.connect(
      "mongodb+srv://devhouse:devhouse@devhouse.3tap7.mongodb.net/?retryWrites=true&w=majority&appName=devhouse"
    );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

// 95VFNctYhJ5YNrQu
