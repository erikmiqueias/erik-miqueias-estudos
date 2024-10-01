import { GetDataController } from "../../../src/controllers/get-data/get-data";
import { MongoGetDataRepository } from "../../../src/repositories/get-data/mongo-get-data";

describe("GetDataController", () => {
  let getDataController: GetDataController;
  let mockGetDataRepository: jest.Mocked<MongoGetDataRepository>;

  beforeEach(() => {
    // Mock do repositório
    mockGetDataRepository = {
      getData: jest.fn(),
    } as jest.Mocked<MongoGetDataRepository>;

    getDataController = new GetDataController(mockGetDataRepository);
  });

  it("deve retornar um statusCode 200", async () => {
    // Simulando o comportamento do repositório

    mockGetDataRepository.getData.mockResolvedValue([
      {
        url: "google.com",
        name: "Google",
        description: "google chrome brownser",
        id: "66fc4858302ac2adffd279ed",
      },
    ]);
    const { statusCode } = await getDataController.handle();

    expect(statusCode).toBe(200);
  });

  it("Deve retornar um body com uma lista de objetos", async () => {
    // Simulando o comportamento do repositório
    mockGetDataRepository.getData.mockResolvedValue([
      {
        url: "google.com",
        name: "Google",
        description: "google chrome brownser",
        id: "66fc4858302ac2adffd279ed",
      },
    ]);

    const { body } = await getDataController.handle();

    expect(body).toEqual([
      {
        url: "google.com",
        name: "Google",
        description: "google chrome brownser",
        id: "66fc4858302ac2adffd279ed",
      },
    ]);
  });

  it("deve retornar um statusCode 500 se houver erro no repositório", async () => {
    // Simulando um erro no repositório
    mockGetDataRepository.getData.mockRejectedValue(
      new Error("Erro no repositório")
    );

    const { statusCode, body } = await getDataController.handle();

    expect(statusCode).toBe(500);
    expect(body).toEqual("Something went wrong");
  });
});
