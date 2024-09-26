import { ObjectId } from "mongodb";
import {
  IUpdateDataRepository,
  UpdateDataParams,
} from "../../controllers/update-data/protocols.";
import { MongoClient } from "../../database/mongo";
import { Data } from "../../models/data";

export class MongoUpdateDataRepository implements IUpdateDataRepository {
  async updateData(id: string, params: UpdateDataParams): Promise<Data> {
    await MongoClient.db
      .collection("data-db")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

    const data = await MongoClient.db
      .collection<Omit<Data, "id">>("data-db")
      .findOne({ _id: new ObjectId(id) });

    if (!data) {
      throw new Error("Data not updated");
    }

    const { _id, ...rest } = data;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
