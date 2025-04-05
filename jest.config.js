const process = require("process");
const path = require("node:path");

// We maintain all environment specific details in this file.
const appEnvConfig = require(path.join(process.cwd(), "appEnv.json"));

// Choose the current environment applied(i.e. dev,prod)
const appEnv = (process.env.FCENV || appEnvConfig.default).trim();
console.log("Chosen APP environment:", appEnv);

const appconf = appEnvConfig[appEnv];

appconf.baseUrl = process.env.APP_BASE_URL || appconf.baseUrl;

appconf.email = process.env.APP_LOGIN_EMAIL || appconf.email;
appconf.password = process.env.APP_LOGIN_PASSWORD || appconf.password;

module.exports = {
  appconf,
  appEnvConfig,
  testTimeout: 100000,
  reporters: ["default", "jest-stare"],
};
