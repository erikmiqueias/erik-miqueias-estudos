import { MongoPostDataController } from "../../../src/controllers/post-data/post-data";
import { MongoPostDataRepository } from "../../../src/repositories/post-data/mongo-post-data";

describe("PostDataController", () => {
  let postDataController: MongoPostDataController;
  let mockPostDataRepository: jest.Mocked<MongoPostDataRepository>;

  mockPostDataRepository = {
    postData: jest.fn(),
  };

  postDataController = new MongoPostDataController(mockPostDataRepository);

  it("Deve retornar um statusCode 201", async () => {
    mockPostDataRepository.postData.mockResolvedValue({
      url: "google.com",
      name: "Google",
      description: "google chrome brownser",
      id: "66fc4858302ac2adffd279ed",
    });

    const { statusCode } = await postDataController.handle({
      body: {
        url: "google.com",
        name: "Google",
        description: "google chrome brownser",
      },
    });

    expect(statusCode).toBe(201);
  });

  it("Deve retornar um body com um objeto", async () => {
    mockPostDataRepository.postData.mockResolvedValue({
      url: "google.com",
      name: "Google",
      description: "google chrome brownser",
      id: "66fc4858302ac2adffd279ed",
    });

    const { body } = await postDataController.handle({
      body: {
        url: "google.com",
        name: "Google",
        description: "google chrome brownser",
      },
    });

    expect(body).toEqual({
      url: "google.com",
      name: "Google",
      description: "google chrome brownser",
      id: "66fc4858302ac2adffd279ed",
    });
  });
});
