const User = {
    username: 'YOUR CHECK24 user here',
    password: 'YOUR CHECK24 account password here'
}

describe('As an insured person I would like to add an insurance contract to my Versicherungscenter', function () {
    it('go to the landing page', function () {
        cy.visit('http://www.check24.de')

        /**
         *  NOTE that I could not just do
         * 
         * cy.get('Anmelden').click()
         * cy.get('#c24-meinkonto').click()
         * 
         */
        cy.get('#c24-meinkonto-anmelden').click({force: true}) // Good: can force click on invisible element

        cy.get('#email').type(User.username)
        cy.get('#password').type(User.password)
        cy.get('#c24-kb-register-btn').click()
        cy.get('.dialog-box-close').click()


        cy.get('.optimization-container').first().click()

        cy.get('.IncompleteContract')
            .then(el => {
                cy.contains('Nein').click()
                // await I.waitForInvisible('.IncompleteContract') // wait until deleted
            })
    
        cy.get('.Button').click()

        // cy.contains('ersten Vertrag hinzufügen').click()
        
        // Select product and insurance
        cy.contains('Hausratversicherung').click({force: true})
        cy.get('.SearchBar-input').type('AGILA')
        cy.contains('AGILA').click()
        
        cy.contains('weiter').click()


    })
})

