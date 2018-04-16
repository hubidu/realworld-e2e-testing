Realword End-to-End Testing
===========================

I want to evaluate javascript based testing frameworks by comparing their "performance" in testing
a realworld app.

Realworld means:

- The application has server side rendered and dynamic parts
- The test changes the state of the application, so this state must be reset before each test
- The test covers a real user flow including multiple pages (not just a single page)

Evaluation criteria for the framework:

- expressiveness of test code (how readable is the code, does the test code reflect the feature I want to test)
- developer experience (how easy is it to create new tests, screenshots of test execution, error screenshots)
- longterm maintainability (page objects, code reuse, how hard is it to extend tests, how hard to troubleshoot failing tests)

