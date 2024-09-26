import { Data } from "../../models/data";
import { HttpResponse } from "../protocols";

export interface IData {
  handle(): Promise<HttpResponse<Data[]>>;
}

export interface IGetDataRepository {
  getData(): Promise<Data[]>;
}
