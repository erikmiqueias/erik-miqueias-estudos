import { Data } from "../../models/data";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateDataController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Data>>;
}

export interface IUpdateDataRepository {
  updateData(id: string, params: UpdateDataParams): Promise<Data>;
}

export interface UpdateDataParams {
  url?: string;
  name?: string;
  description?: string;
}
