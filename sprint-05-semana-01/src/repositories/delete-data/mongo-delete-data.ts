import { ObjectId } from "mongodb";
import { IDeleteDataRepository } from "../../controllers/delete-data/protocols";
import { MongoClient } from "../../database/mongo";
import { Data } from "../../models/data";

export class MongoDeleteDataRepository implements IDeleteDataRepository {
  async deleteData(id: string): Promise<Data> {
    const data = await MongoClient.db
      .collection<Omit<Data, "id">>("data-db")
      .findOne({ _id: new ObjectId(id) });

    if (!data) {
      throw new Error("Data not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("data-db")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Data not deleted");
    }

    const { _id, ...rest } = data;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
