Realworld E2E testing with ava-codeceptjs
==========================================

## Install

```bash
    npm install
```

## Install and start selenium

Install and run selenium standalone

```bash
    npm i -g selenium-standalone
    selenium-standalone install
    selenium-standalone start
```


## Running tests

Create a CHECK24 account and then pass your account credentials via environment
parameters.

```bash
    # Run with chrome
    cross-env USERNAME=<YOUR USERNAME> PASSWORD=<YOUR PASSWORD> ava
```

Run with firefox and watch the difference

```bash
    # Run with firefox
    cross-env TEST_BROWSER=firefox USERNAME=<YOUR USERNAME> PASSWORD=<YOUR PASSWORD> ava
```

## Output

The framework will automatically take screenshots and save them in the __out directory
for each test run. If the test fails an error screenshot will be automatically 
taken and stored as well.

## Reports

Each test run directory will also contain a report.json file which contains code snippets
for each screenshot taken and which you can use to create reports.

## Like/Did not like

### Like

- Simple project setup, almost no boilerplate code
- Nice higher-level api (thanks to codeceptjs)
- Async/Await practically lets you write synchronous tests
- Highlighting of clicked elements
- Detailed stacktrace when a test fails
- Detailed screenshots when a test fails
- Can run tests in parallel (thanks to ava)
- Conditional testing is possible
- Direct access to lower level apis (webdriverio) in tests is possible
- Almost no need to explicitly wait for elements because of built-in autowait


### Did not like

- Conditional testing with try/catch
- No junit reports available

