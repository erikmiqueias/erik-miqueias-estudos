import {
  CreateDataParams,
  IPostDataRepository,
} from "../../controllers/post-data/protocols";
import { MongoClient } from "../../database/mongo";
import { Data } from "../../models/data";

export class MongoPostDataRepository implements IPostDataRepository {
  async postData(params: CreateDataParams): Promise<Data> {
    const { insertedId } = await MongoClient.db
      .collection("data-db")
      .insertOne(params);

    const data = await MongoClient.db
      .collection<Omit<Data, "id">>("data-db")
      .findOne({ _id: insertedId });

    if (!data) {
      throw new Error("Data not created");
    }

    const { _id, ...rest } = data;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
