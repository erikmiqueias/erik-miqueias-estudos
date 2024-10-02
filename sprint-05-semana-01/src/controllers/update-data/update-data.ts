import { Data } from "../../models/data";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateDataController,
  IUpdateDataRepository,
  UpdateDataParams,
} from "./protocols.";

export class UpdateDataController implements IUpdateDataController {
  constructor(private readonly updateDataRepository: IUpdateDataRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Data>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id is required",
        };
      }

      const allowedFields = ["url", "name", "description"];

      const someFieldNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFields.includes(key as keyof UpdateDataParams)
      );

      if (someFieldNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some field is not allowed to update",
        };
      }

      const data = await this.updateDataRepository.updateData(id, body);

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
