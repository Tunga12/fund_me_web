/// <reference types="Cypress" />

beforeEach('', () => {
    cy.visit('/sign-in');//since i setp the baseUrl
});

describe("Login page", () => {
    it('visits the login page', () => {
        //checks the expects option and the label to exist
        cy.getByDataCy('sign-up').should('exist')
            .find('a')
            .should('contain', 'Sign up');

        cy.getByDataCy('sign-in-header')
            .should('exist')

        cy.get('mat-progress-bar').should('not.exist')
        cy.get('.error-message').should('not.exist')

    });
});

describe('Validates the login page', () => {
    it("Shows a message 'Please enter your email'", () => {
        cy.getByFCName('email')
            .click()
            .type('hi')
            .should('have.value', 'hi')
            .clear();
        cy.getByFCName('password')
            .click()
        cy.getByDataCy('sign-in-btn').should('have.attr', 'disabled')
        cy.getByDataCy('empty-email-error')
            .should('exist')
            .and('contain', 'Please enter your email')

    });

    it("Shows a message 'Please enter a valid email'", () => {
        cy.getByFCName('email')
            .click()
            .type('getachewtbkwgmail.com')
            .should('have.value', 'getachewtbkwgmail.com')
        cy.getByFCName('password')
            .click()


        cy.getByDataCy('sign-in-btn').should('have.attr', 'disabled')

        cy.getByDataCy('invalid-email-error')
            .should('exist')
            .and('contain', 'Please enter a valid email')
    });

    it("Shows a message 'Please enter your password'", () => {
        cy.getByFCName('password')
            .click()
        cy.getByFCName('email').focus();
        cy.getByDataCy('sign-in-btn').should('have.attr', 'disabled')

        cy.getByDataCy('empty-password-error')
            .should('exist')
            .and('contain', 'Please enter your password')
    });


});

describe('Logs in to the system', () => {
    it('logs in as admin', () => {
        //    email
        cy.getByFCName('email')
            .click()
            .type('getachewtbkw@gmail.com')
            .should('have.value', 'getachewtbkw@gmail.com');

        // password
        cy.getByFCName('password')
            .click()
            .type('getachewtbkw@gmail.com')
            .should('have.value', 'getachewtbkw@gmail.com');

        cy.getByDataCy('sign-in-btn').click()
        cy.get('mat-progress-bar').should('exist')
        // cy.url().should('include', 'home');
    });

    it('logs in as user', () => {
        //    email
        cy.getByFCName('email')
            .click()
            .type('get@gmail.com')
            .should('have.value', 'get@gmail.com');

        // password
        cy.getByFCName('password')
            .click()
            .type('get@gmail.com1')
            .should('have.value', 'get@gmail.com1');
        cy.getByDataCy('sign-in-btn').click()
        cy.get('mat-progress-bar').should('exist')
        // cy.url().should('include', 'home');
    });

    it('shows incorrect username or password message', () => {
        //    email
        cy.getByFCName('email')
            .click()
            .type('getachewtbkw@gmail.com')
            .should('have.value', 'getachewtbkw@gmail.com');
        // password
        cy.getByFCName('password')
            .click()
            .type('getachewtbkw@gmail.com1')
            .should('have.value', 'getachewtbkw@gmail.com1');

        cy.getByDataCy('sign-in-btn').click()
        // now the progress indicator should be visible
        cy.get('mat-progress-bar').should('exist')
        // error message should be shown=>'Incorrect username or password'
        cy.get('.error-message').should('exist')
            .and('contain', 'Incorrect email or password');
        // the url should not be changed
        cy.url().should('include', 'sign-in');
    });
});

