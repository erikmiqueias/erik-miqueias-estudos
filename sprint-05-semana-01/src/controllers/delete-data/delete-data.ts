import { Data } from "../../models/data";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteDataController, IDeleteDataRepository } from "./protocols";

export class DeleteDataController implements IDeleteDataController {
  constructor(private readonly deleteDataRepository: IDeleteDataRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Data>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing param: id",
        };
      }

      const data = await this.deleteDataRepository.deleteData(id);

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
