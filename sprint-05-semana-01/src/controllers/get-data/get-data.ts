import { GetDataRepository } from "./protocols";
import { IData } from "./protocols";

export class GetDataController implements IData {
  constructor(private readonly getDataRepository: GetDataRepository) {}
  async handle() {
    try {
      const data = await this.getDataRepository.getData();

      return {
        statusCode: 200,
        body: data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
