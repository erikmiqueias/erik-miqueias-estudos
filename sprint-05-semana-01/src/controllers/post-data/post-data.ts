import { Data } from "../../models/data";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateDataParams,
  IPostDataController,
  IPostDataRepository,
} from "./protocols";

export class MongoPostDataController implements IPostDataController {
  constructor(private readonly postDataRepository: IPostDataRepository) {}
  async handle(
    params: HttpRequest<CreateDataParams>
  ): Promise<HttpResponse<Data>> {
    try {
      const dataParams = ["url", "name", "description"];

      for (const param of dataParams) {
        if (!params?.body?.[param as keyof CreateDataParams]?.length) {
          return {
            statusCode: 400,
            body: `Missing param: ${param}`,
          };
        }
      }
      const data = await this.postDataRepository.postData(params.body!);

      return {
        statusCode: 201,
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
