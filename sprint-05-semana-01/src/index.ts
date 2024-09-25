import express from "express";
import { config } from "dotenv";
import { GetDataController } from "./controllers/get-data/get-data";
import { MongoGetDataRepository } from "./repositories/get-data/mongo-get-data";
import { MongoClient } from "./database/mongo";

config();
const main = async () => {
  const app = express();

  const PORT = process.env.PORT || 3333;

  app.use(express.json());

  app.get("/data", async (req, res) => {
    const getDataRepository = new MongoGetDataRepository();

    const getDataController = new GetDataController(getDataRepository);

    const { body, statusCode } = await getDataController.handle();

    res.status(statusCode).send(body);
  });

  await MongoClient.connect();
  app.listen(PORT, () => {
    console.log(`Server is running on adress: http://localhost:${PORT}`);
  });
};

main();
