const { appconf } = require("../jest.config");
const { AppApi, getAuthToken } = require("../common/utils");
const appApi = new AppApi();

const endpointPath = appconf.baseUrl + "/notes";

let authToken;

// Positive test cases
describe("Positive test cases", () => {
  beforeAll(async () => {
    authToken = await getAuthToken(appconf.email, appconf.password);
  });
  test("Create a new note with valid title, description and category", async () => {
    const validNoteData = {
      title: "Valid Note Title",
      description: "This is a valid note description.",
      category: "Personal",
    };
    try {
      const response = await appApi.post(
        endpointPath,
        validNoteData,
        authToken
      );
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.message).toBe("Note successfully created");
      expect(response.data.data.title).toBe(validNoteData.title);
      expect(response.data.data.description).toBe(validNoteData.description);
      expect(response.data.data.category).toBe(validNoteData.category);
    } catch (error) {
      console.error("Error in positive test:", error);
      throw error;
    }
  });

  test("Create a note with special characters in title and description", async () => {
    const specialCharsData = {
      title: "Note with !@#$%^&*()",
      description: "Description with special chars: <>[]{}|/?",
      category: "Personal",
    };

    const response = await appApi.post(
      endpointPath,
      specialCharsData,
      authToken
    );
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Note successfully created");
  });

  test("Create a note with maximum length fields", async () => {
    const longText = "a".repeat(100);
    const longData = {
      title: longText,
      description: longText,
      category: "Personal",
    };

    const response = await appApi.post(endpointPath, longData, authToken);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  });
});

// Negative test cases
describe("Negative test cases", () => {
  test("Create a note with missing title", async () => {
    try {
      await appApi.post(
        endpointPath,
        {
          description: "No title provided",
          category: "Personal",
        },
        authToken
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
    }
  });

  test("Create a note with missing description", async () => {
    try {
      await appApi.post(
        endpointPath,
        {
          title: "No description",
          category: "Personal",
        },
        authToken
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
    }
  });

  test("Create a note with empty title", async () => {
    try {
      await appApi.post(
        endpointPath,
        {
          title: "",
          description: "Has description",
          category: "Personal",
        },
        authToken
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
    }
  });

  test("Create a note with empty description", async () => {
    try {
      await appApi.post(
        endpointPath,
        {
          title: "Has title",
          description: "",
          category: "Personal",
        },
        authToken
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
    }
  });

  test("Create a note with invalid category", async () => {
    try {
      await appApi.post(
        endpointPath,
        {
          title: "Invalid category",
          description: "Test description",
          category: "InvalidCategory",
        },
        authToken
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
    }
  });

  test("Create a note with too long title", async () => {
    try {
      const tooLongTitle = "a".repeat(256);
      await appApi.post(
        endpointPath,
        {
          title: tooLongTitle,
          description: "Valid description",
          category: "Personal",
        },
        authToken
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
    }
  });

  test("Create a note with too long description", async () => {
    try {
      const tooLongDescription = "a".repeat(256);
      await appApi.post(
        endpointPath,
        {
          title: "Valid title",
          description: tooLongDescription,
          category: "Personal",
        },
        authToken
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.success).toBe(false);
    }
  });

  test("Create a note with invalid auth token", async () => {
    try {
      await appApi.post(
        endpointPath,
        {
          title: "Test Note",
          description: "Test description",
          category: "Personal",
        },
        "invalid-token"
      );
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.success).toBe(false);
    }
  });
});
