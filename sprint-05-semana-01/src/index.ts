import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import routes from "./routes/routes";

config();
const main = async () => {
  const app = express();

  const PORT = process.env.PORT || 3333;

  app.use(express.json());

  routes(app);

  await MongoClient.connect();

  app.listen(PORT, () => {
    console.log(`Server is running on adress: http://localhost:${PORT}`);
  });
};

main();
