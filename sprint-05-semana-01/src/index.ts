import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import routes from "./routes/routes";

config();
const app: express.Application = express();
const PORT = process.env.PORT || 3333;

const main = async () => {
  app.use(express.json());
  routes(app);

  await MongoClient.connect();

  app.listen(PORT, () => {
    console.log(`Server is running on adress: http://localhost:${PORT}`);
  });
};

export default app;
main();
