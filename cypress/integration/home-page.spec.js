/// <reference types="Cypress" />
// beforeEach(() => {
//     // reset and seed the database prior to every test
//     cy.exec('npm run db:reset && npm run db:seed')

//     // seed a user in the DB that we can control from our tests
//     // assuming it generates a random password for us
//     cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
//       .its('body')
//       .as('currentUser')
//   })

describe("Homepage",() =>{

    // it("should display list of fundraisers",()=>{
    //     expect(true).to.equal(true);
    // })
    it('visits the home page', () => {
        cy.visit('/');//since i setp the baseUrl
        cy.contains('Start a Campaign').click();
        cy.url().should('include','sign-in');
    //    email
        cy.getByFCName('email')
        .click()
        .type('getachewtbkw@gmail.com')
        .should('have.value','getachewtbkw@gmail.com');
        
        // password
        cy.getByFCName('password')
        .click()
        .type('getachewtbkw@gmail.com')
        .should('have.value','getachewtbkw@gmail.com');
        // cy.type('getache');
        // cy.getByFCName('password').click();
        cy.contains('Sign in to Legas').click()

        cy.url().should('include','home');
    });


});