import { Data } from "../../models/data";
import { IGetDataRepository } from "../get-data/protocols";
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

export async function searchURL(
  getDataRepository: IGetDataRepository,
  params: HttpRequest<CreateDataParams>
): Promise<boolean> {
  const getData = await getDataRepository.getData();

  if (getData.some((data) => data.url === params.body?.url)) {
    return true;
  }
  return false;
}
