
Feature('Manage insurance contracts');

Scenario('As an insured person I would like to add an insurance contract to my Versicherungscenter', async (I) => {
    // Goto CHECK24 page
    I.amOnPage('http://www.check24.de')
    I.click('#c24-meinkonto')

    I.click('Anmelden')

    // Login with a valid user account
    I.fillField('#email', process.env.USERNAME)
    I.fillField('#password', process.env.PASSWORD)
    I.click('#c24-kb-register-btn')

    // Close modal dialog
    // I.waitForVisible('.dialog-box-close')
    I.click('#c24-dialog-points-modal > div > header > button')
    // Goto Vesicherungscenter
    I.click('.optimization-container') // codeceptjs always clicks the first of multiple elements

    I.waitForVisible('.Layer.Container')

    /**
     * Using a helper method to accomplish conditional testing
     */
    I.ifVisible('.IncompleteContract', async (I) => {
        await I.click('Nein', '.IncompleteContract')
        await I.waitForInvisible('.IncompleteContract') // wait until deleted       
    })

    I.click('ersten Vertrag hinzufügen', '.Button')

    // Select product and insurance
    I.waitInUrl('/vertraege/neu/products')
    I.click('Hausratversicherung')
    I.fillField('.SearchBar-input', 'AGILA')
    I.click('AGILA', '.ActionButton')

    I.ifVisible('.BestSso-deleteLink', async (I) => {
        await I.click('.BestSso-deleteLink')
        await I.click('weiter')
        await I.waitInUrl('/vertraege/neu/policyholder/1')
    })

    // Create a policyholder
    I.click('.FormField-container > div > button.FormButtons-button:nth-child(1)')
    I.fillField('[name="firstname"]', 'Max')
    I.fillField('[name="lastname"]', 'Pecu')
    I.fillField('[placeholder="TT"]', '27')
    I.fillField('[placeholder="MM"]', '12')
    I.fillField('[placeholder="JJJJ"]', '1980')
    I.fillField('[name="areaCode"]', '82256')

    I.fillField('.FormField-singleLineContainer.is-small.is-reverse > div > div > input.FormField-input', 'Abt-Anselm-Str.')
    I.fillField('[name="streetNumber"]', '13')
    I.click('übernehmen')

    I.wait(1) // The following click might be 'too fast' without this wait
    I.click('.NavigationButton-button')
    // Sign the mandate
    I.click('.Checkbox-caption')

    /**
     * I am not going to implement the rest of the testcase for now
     * Try for yourself
     */
});
