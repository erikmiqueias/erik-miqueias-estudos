import { GetDataRepository } from "../../controllers/get-data/protocols";
import { MongoClient } from "../../database/mongo";
import { Data } from "../../models/data";

export class MongoGetDataRepository implements GetDataRepository {
  async getData(): Promise<Data[]> {
    const data = await MongoClient.db
      .collection<Omit<Data, "id">>("data-db")
      .find({})
      .toArray();

    return data.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }));
  }
}
