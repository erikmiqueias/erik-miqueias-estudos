import { DeleteDataController } from "../controllers/delete-data/delete-data";
import { GetDataController } from "../controllers/get-data/get-data";
import { MongoPostDataController } from "../controllers/post-data/post-data";
import { MongoDeleteDataRepository } from "../repositories/delete-data/mongo-delete-data";
import { MongoGetDataRepository } from "../repositories/get-data/mongo-get-data";
import { MongoPostDataRepository } from "../repositories/post-data/mongo-post-data";
import express from "express";
import { MongoUpdateDataRepository } from "../repositories/update-data/mongo-update-data-repository";
import { UpdateDataController } from "../controllers/update-data/update-data";

async function routes(app: express.Application) {
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

  app.patch("/data/:id", async (req, res) => {
    const updateDataRepository = new MongoUpdateDataRepository();
    const updateDataController = new UpdateDataController(updateDataRepository);

    const { body, statusCode } = await updateDataController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });
}

export default routes;
