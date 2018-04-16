Realworld E2E testing with codeceptjs
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
    cross-env USERNAME=<YOUR USERNAME> PASSWORD=<YOUR PASSWORD> npm t
```

## Output

If a feature/scenario fails an error screenshot will be in the __out directory.

## Like/Did not like

### Like

- Nice higher-level api
- Can write tests using a synchronous looking api
- Relatively straight forward project setup albeit every helper and pageobject must be added to a global config file
- Access to low level apis and custom logic via helpers
- Nice step output, albeit it gets hard to read when page objects are involved and when tests get more complex

### Did not like

- Conditional testing is only possible with a custom helper. However this breaks the synchronous api and exposes internals.
- smartWait seems to delay test execution tremendously. Test takes far longer than with ava-codeceptjs.
- Not using smartWait would mean adding more boilerplate code to the test
- Recorder promise chain magic which makes test look synchronous when they are really not
