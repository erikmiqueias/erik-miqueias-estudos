import express from "express";
import { config } from "dotenv";
import { GetDataController } from "./controllers/get-data/get-data";
import { MongoGetDataRepository } from "./repositories/get-data/mongo-get-data";
import { MongoClient } from "./database/mongo";
import { MongoPostDataController } from "./controllers/post-data/post-data";
import { MongoPostDataRepository } from "./repositories/post-data/mongo-post-data";
import { DeleteDataController } from "./controllers/delete-data/delete-data";
import { MongoDeleteDataRepository } from "./repositories/delete-data/mongo-delete-data";

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

  app.post("/data", async (req, res) => {
    const postDataRepository = new MongoPostDataRepository();
    const postDataController = new MongoPostDataController(postDataRepository);

    const { body, statusCode } = await postDataController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/data/:id", async (req, res) => {
    const deleteDataRepository = new MongoDeleteDataRepository();
    const deleteDataController = new DeleteDataController(deleteDataRepository);

    const { body, statusCode } = await deleteDataController.handle({
      params: req.params,
    });

    return res.status(statusCode).send(body);
  });

  await MongoClient.connect();

  app.listen(PORT, () => {
    console.log(`Server is running on adress: http://localhost:${PORT}`);
  });
};

main();
