const { appconf } = require("../jest.config");
const { AppApi } = require("../common/utils");

const appApi = new AppApi();

describe("signin tests", () => {
  const endpointPath = appconf.baseUrl + `/users/login`;

  test("signin with valid credentials", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: appconf.email,
        password: appconf.password,
      });
      expect(response.status).toBe(200);
      expect(response.data.data.token).toBeDefined();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  });

  test("signin with nonregistered credentials", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "email@gmail.com",
        password: appconf.password,
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  test("signin with invalid email ", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "emailgmail.com",
        password: appconf.password,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("signin without email", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        password: appconf.password,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("signin with email empty string", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "   ",
        password: appconf.password,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("signin with invalid password", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: appconf.email,
        password: "p12345678",
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  test("signin without password ", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: appconf.email,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("signin with pass empty string", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: appconf.email,
        password: "  ",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("signin without email, password", async () => {
    try {
      const response = await appApi.post(endpointPath, {});
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("signin with invalid email password", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "qa-test38@gmail.com",
        password: "p12345678",
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  test("signin with email password empty string", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "  ",
        password: "  ",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
