# JEST API Automation

API Automation using Jest

### Install necessary packages

```
npm i
```

### Test Cases Design Guidelines

- Before start please get an idea about how Jest work.You can get an idea from here [Jest Documentation](https://jestjs.io/docs/getting-started)

### Run for different environments (local, dev, prod)

```
# Linux
APPENV=preprod npx jest

# Windows (command prompt)
set APPENV=prod && npx jest

# Windows (powershell)
$env:APPENV="prod"; npx jest

# Mac
APPENV='prod' && npx jest

# testPathPattern
testPathPattern = APPENV='dev' && npx jest --testPathPattern=__tests__/**/**.test.js (Can be used to run specific test. Default is all tests in __tests__ folder.)

If you don't specify environment, default APP environment will be used (specified in appEnv.json).

```
