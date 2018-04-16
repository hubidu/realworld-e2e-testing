import test from 'ava';

const {ava} = require('ava')
const {inBrowser} = require('ava-codeceptjs')

const User = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
}

test('As an insured person I would like to add an insurance contract to my Versicherungscenter',
    inBrowser(async (t, I) => {
        t.truthy(User.username, 'Please provide a username for your CHECK24 test account')
        t.truthy(User.password, 'Please provide the password for your CHECK24 test account')

        // Goto CHECK24 page
        await I.amOnPage('http://www.check24.de')
        await I.click('#c24-meinkonto')

        /**
         * I can use ava log method to log data to the test context
         */
        t.log('This will show up after the test run in the test report')
        /**
         * I can log any debug information at any time to the console
         */
        console.log('Hey, I can also write debug info to the console')
        
        /**
         * I love this codeceptjs feature:
         * Just click on Elements containing a specific text
         */
        await I.click('Anmelden')

        // Login with a valid user account
        await I.fillField('#email', User.username)
        await I.fillField('#password', User.password)
        await I.click('#c24-kb-register-btn')

        /**
         * Need to close a modal dialog here
         * and using a webdriverio method to click on the close icon
         */
        await I.waitForVisible('.dialog-box-close')
        await I.browser.leftClick('.dialog-box-close')

        // Goto Vesicherungscenter
        await I.click('.optimization-container') // codeceptjs always clicks the first of multiple elements

        // Need to wait until page is loaded
        await I.waitForVisible('.Layer.Container')

        /**
         * You can do conditional testing using the webdriverio client
         */
        // Add an insurance contract to my account
        try {
            await I.browser.waitForVisible('.IncompleteContract') // check if there already are some contracts
            await I.click('Nein', '.IncompleteContract')
            await I.waitForInvisible('.IncompleteContract') // wait until deleted
        } catch (_) {}

        // Remove any activities created by previous tests
        try {
            await I.browser.waitForVisible('.Activity') // After successful test execution there will be a contract
            await I.click('.ActivitiesHeadline-editLink')
            await I.click('.Activity-removeIcon')
            await I.click('entfernen', '.ActionModal-confirmButton')
            await I.waitForInvisible('.ActionModal.is-open')
        } catch (_) {}

        /**
         * Sometimes you need to specify a context when
         * clicking on a text
         */
        await I.click('ersten Vertrag hinzufügen', '.Button')
        
        // Select product and insurance
        await I.click('Hausratversicherung')
        await I.fillField('.SearchBar-input', 'AGILA')
        await I.click('AGILA', '.ActionButton')

        try {
            await I.browser.waitForVisible('.BestSso-deleteLink') // check if there are already policyholders
            await I.click('.BestSso-deleteLink')
            await I.click('weiter')
        } catch (_) {}

        // Create a policyholder
        await I.click('.FormField-container > div > button.FormButtons-button:nth-child(1)')
        await I.fillField('[name="firstname"]', 'Max')
        await I.fillField('[name="lastname"]', 'Pecu')
        await I.fillField('[placeholder="TT"]', '27')
        await I.fillField('[placeholder="MM"]', '12')
        await I.fillField('[placeholder="JJJJ"]', '1980')
        await I.fillField('[name="areaCode"]', '82256')

        await I.fillField('.FormField-singleLineContainer.is-small.is-reverse > div > div > input.FormField-input', 'Abt-Anselm-Str.')
        await I.fillField('[name="streetNumber"]', '13')
        await I.click('übernehmen')

        /**
         * I need a wait here since the click might
         * succeed but react is not ready to process it 
         * and then the test is stuck
         */
        await I.wait(1) // The following click might be 'too fast' without this wait
        await I.click('.NavigationButton-button')

        // Sign the mandate
        await I.click('.Checkbox-caption')

        /**
         * This is interesting: I need to sign something
         * Again using webdriverio for that
         */
        await I.click('.SignatureCanvas')
        for (let i = 0; i < 200; i++) {
            await I.browser.leftClick('.SignatureCanvas', i, 100)
        }

        await I.click('Vertragsdetails anfordern')

        await I.see('Fertig', '.NeedsIdentificationThankYouHeadline')
    })
)