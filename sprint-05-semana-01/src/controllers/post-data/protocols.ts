import { Data } from "../../models/data";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IPostDataController {
  handle(params: HttpRequest<CreateDataParams>): Promise<HttpResponse<Data>>;
}

export interface IPostDataRepository {
  postData(params: CreateDataParams): Promise<Data>;
}

export interface CreateDataParams {
  url: string;
  name: string;
  description: string;
}
