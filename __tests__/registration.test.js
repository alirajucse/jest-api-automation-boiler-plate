const { AppApi } = require("../common/utils");
const { appconf } = require("../jest.config");
const chance = require("chance").Chance();

const appApi = new AppApi();

const templateDatasetForPassCase = [
  ["email1@domain.com", "p123456789", "John Doe"],
  ["lastname@example.com", "PPPP1234567890", "Jane Smith"],
  ["firstname+lastname@domain.com", "1234567---abc-@123", "Robert Johnson"],
  ["email@123.123.123.123", "0000000000LLL", "Michael Brown"],
  ["email@123.123.123.123", "#########AAAA99999", "William Wilson"],
  ["email@domain.com", "Asif Chowdhury BD333", "Asif Chowdhury"],
  ["email..email@domain.com", "freeconvert.com111111", "Sarah Thompson"],
  ["1234567890@domain.com", "aaa_bbb_1111_UUUUU", "David Anderson"],
  ["email@domain-one.com", "12458888hhhj+", "Christopher Lee"],
  ["_______@domain.com", "1212fddfdfd_ujnv", "James Taylor"],
  ["email@domain.name", "Imageresizer freeconvert001", "Robert Martinez"],
  ["email@domain.co.jp", "p123456789", "Thomas Garcia"],
  [
    "firstname-lastname@domain.com",
    "<=12Abcruion+j766-766",
    "Joseph Rodriguez",
  ],
  ["nathan@学生优惠.com", "QAAAAAAA111111!!!!!!!!!", "Nathan Wilson"],
  ["ali@trmedia.com", "bnbnbn,hghghgh,hghghg1222", "Ali Khan"],
  ["al11111@trmedia.com", "pa56565656sword3", "Al Smith"],
  ["al7688678@trmedia.com", "password321212#!!!!!!!!!!!!!!!!!!!", "Al Johnson"],
];

const templateDatasetForFailCase = [
  ["plainaddress", "password24343", "Test User"],
  ["email.domain.com", "password2", "Test User"],
  ["@domain.com", "password33453434", "Test User"],
  ["#@%^%#$@#$@#.com", "password3errer", "Test User"],
  ["JoeSmith<email@domain.com>", "password3fdfdfd", "Test User"],
  ["email@domain.com(JoeSmith)", "password33434", "Test User"],
  ["email@domain.com(domain.com)", "passworderere333", "Test User"],
  [".email@domain.com", "password36565", "Test User"],
  ["email..email@domain.com", "password3676", "Test User"],
  ["あいうえお@domain.com", "password313", "Test User"],
  ["email@-domain.com", "password35553", "Test User"],
  ["email@.domain.com", "password354564", "Test User"],
  ["email@111.222.333.44444", "password3557", "Test User"],
  ["email@domain..com", "password3566", "Test User"],
  ["test@example.com", "password123", ""], 
  ["test@example.com", "password123", " "], 
  ["test@example.com", "password123", "1234567890"], 
  ["test@example.com", "password123", "!@#$%^&*()"], 
  ["test@example.com", "password123", "a"], 
  ["test@example.com", "password123", "a".repeat(256)], 
  ["test@example.com", "password123", "John\nDoe"], 
  ["test@example.com", "password123", "John\rDoe"], 
  ["test@example.com", "password123", "John\tDoe"], 
  ["test@example.com", "password123", "John\0Doe"], 
  ["test@example.com", "password123", "John\uD800Doe"], 
  ["test@example.com", "password123", "John\uFFFFDoe"], 
  ["test@example.com", "password123", "John\u0000Doe"], 
  ["test@example.com", "password123", "John\u0001Doe"], 
  ["test@example.com", "password123", "John\u001FDoe"], 
];

function generateDataset(dataset) {
  const newDataset = [];
  for (let i = 0; i < dataset.length; i++) {
    const email = dataset[i][0];
    const emailFormat = email.replace(/[a-zA-Z0-9._-]+@/, "");
    const newEmail = chance.email({ domain: emailFormat });
    const password = dataset[i][1];
    const name = dataset[i][2];
    newDataset.push([newEmail, password, name]);
  }
  return newDataset;
}

describe("Resigtration tests", () => {
  const endpointPath = appconf.baseUrl + `/users/register`;

  const newPassDataset = generateDataset(templateDatasetForPassCase);
  test.each(newPassDataset)(
    "Pass case: signup with email %s, password %s and name %s",
    async (email, password, name) => {
      try {
        const response = await appApi.post(endpointPath, {
          email: email,
          password: password,
          name: name,
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty("id");
        expect(response.data).toHaveProperty("name");
        expect(response.data.name).toBe(name);
      } catch (error) {
        console.log(
          "Error message:",
          email,
          password,
          name,
          error.response?.data || error.message
        );
      }
    }
  );

  const newFailDataset = generateDataset(templateDatasetForFailCase);
  test.each(newFailDataset)(
    "Fail case: signup with email %s, password %s and name %s",
    async (email, password, name) => {
      try {
        const response = await appApi.post(endpointPath, {
          email: email,
          password: password,
          name: name,
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    }
  );

  test("Registration with empty email", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "",
        password: "password3",
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration with empty name", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "test@example.com",
        password: "password3",
        name: "",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration by passing email object null", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: null,
        password: "password36565",
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration by passing email and password value null", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: null,
        password: null,
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration by passing password value an empty string", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: null,
        password: "",
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration by passing password value null", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "testt@fc.com",
        password: null,
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration by passing both email and password empty string", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "",
        password: "",
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration without email key", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        password: "p123456789",
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration without password key", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "ali@tr.com",
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Registration with an existing email", async () => {
    try {
      const response = await appApi.post(endpointPath, {
        email: "raju-jest@api.com",
        password: "p123456789",
        name: "Test User",
      });
    } catch (error) {
      expect(error.response.status).toBe(409);
    }
  });
});
