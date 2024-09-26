import { Data } from "../../models/data";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteDataController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Data>>;
}

export interface IDeleteDataRepository {
  deleteData(id: string): Promise<Data>;
}
