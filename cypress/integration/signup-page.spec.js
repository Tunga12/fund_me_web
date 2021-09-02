
/// <reference types="Cypress" />
beforeEach('', () => {
    cy.visit('/sign-up')
})

describe('signup page', () => {

    it('visits the sign-up heading', () => {
        cy.getByDataCy('log-in-option')
            .should('exist')
            .get('a')
            .first()
            .should('have.attr', 'href')
            .and('includes', 'sign-in')

        cy.getByDataCy('sign-up-header')
            .should('exist')

        cy.get('mat-progress-bar').should('not.exist')
        cy.get('.error-message').should('not.exist')
    });

    it('input fields and show empty field messages', () => {
        cy.getByFCName('firstName').focus()
            .getByFCName('lastName').focus()
            .getByDataCy('fname-empty-error').should('exist');

        cy.getByFCName('email').focus().getByDataCy('lname-empty-error').should('exist');

        cy.getByFCName('phoneNumber').focus()
            .getByDataCy('email-empty-error').should('exist');

        cy.getByFCName('password').focus()
            .getByDataCy('phone-empty-error').should('exist');
        cy.getByFCName('confirmPassword').focus().getByDataCy('password-empty-error').should('exist')
        cy.getByFCName('password').focus()
            .getByDataCy('cpassword-empty-error').should('exist');
    });

    it.only('show white space error messages and submit btn is disabled', () => {
        cy.visit('/sign-up')
        cy.getByFCName('firstName').type('    ')
            .getByFCName('lastName').type('    ')
            .getByFCName('phoneNumber').type('          ')
            .getByFCName('email').focus();
        cy.getByDataCy('fname-whitespace-error').should('exist')
        cy.getByDataCy('lname-whitespace-error').should('exist');
        cy.getByDataCy('sign-up-btn').should('have.attr', 'disabled');
    });

    it('show minimum length error messages and submit btn is disabled', () => {
        cy.getByFCName('firstName').type('gt')
            .getByFCName('lastName').type('ma')
            .getByFCName('phoneNumber').type('13433')
            .getByFCName('password').type('13433')
            .getByFCName('email').focus();
        cy.getByDataCy('fname-minlength-error').should('exist')
        cy.getByDataCy('lname-minlength-error').should('exist');
        cy.getByDataCy('password-minlength-error').should('exist');
        cy.getByDataCy('password-weak-error').should('exist');
        cy.getByDataCy('sign-up-btn').should('have.attr', 'disabled');
    });

    it('shows maximum length error messages and submit btn is disabled', () => {
        cy.getByFCName('firstName').type('gtherhehrhehrhehrhehrhhehhe')
            .getByFCName('lastName').type('gtherhehrhehrhehrhehrhhehhe')
            .getByFCName('phoneNumber').type('gtherhehrhehrhehrhehrhhehhe')
            .getByFCName('password').type('gtherhehrhehrhehrhehrhhehhe')
            .getByFCName('email').focus();
        cy.getByDataCy('fname-maxlength-error').should('exist')
        cy.getByDataCy('lname-maxlength-error').should('exist');
        cy.getByDataCy('phone-maxlength-error').should('exist');
        cy.getByDataCy('sign-up-btn').should('have.attr', 'disabled');
    });

    it('shows invalid email messages', () => {
        cy.getByFCName('email')
            .type('jdsjd').getByFCName('password').focus();
        cy.getByDataCy('email-invalid-error')
            .should('exist');
    });

    it('shows week password messages and password minimum length error messages', () => {
        cy.getByFCName('password')
            .type('jdsj').getByFCName('confirmPassword').focus();
        cy.getByDataCy('password-weak-error')
            .should('exist');
        cy.getByDataCy('password-minlength-error')
            .should('exist');
    });

    it('shows week password messages and not show password minlength error', () => {
        cy.getByFCName('password')
            .type('jdsjdndfnd').getByFCName('confirmPassword').focus();
        cy.getByDataCy('password-weak-error')
            .should('exist');
        cy.getByDataCy('password-minlength-error')
            .should('not.exist');
    });

    it('shows week password messages', () => {
        cy.getByFCName('password')
            .type('jdsjdndfnd@').getByFCName('confirmPassword').focus();
        cy.getByDataCy('password-weak-error')
            .should('exist');
    });

    it('Doesn\'t show week password messages', () => {
        cy.getByFCName('password')
            .type('jdsjdndfnd@1').getByFCName('confirmPassword').focus();
        cy.getByDataCy('password-weak-error')
            .should('not.exist');
    });

    it('Shows password mismatch messages', () => {
        cy.getByFCName('password')
            .type('jdsjdndfnd@1').getByFCName('confirmPassword').type('jdsjdndfnd@');
        cy.getByFCName('email').focus();
        cy.getByDataCy('password-mismatch-error')
            .should('exist');
    });

    it('Doesn\'t show password mismatch messages', () => {
        cy.getByFCName('password')
            .type('jdsjdndfnd@1').getByFCName('confirmPassword').type('jdsjdndfnd@1');
        cy.getByFCName('email').focus();
        cy.getByDataCy('password-mismatch-error')
            .should('not.exist');
    });

    it('Should show user already registered message and loading indicator', () => {
        cy.getByFCName('firstName').type('abebe')
            .getByFCName('lastName').type('Abebaw')
            .getByFCName('email').type('abebe@gmail.com')
            .getByFCName('phoneNumber').type('0909090909')
            .getByFCName('password').type('abebe@gmail.com1')
            .getByFCName('confirmPassword').type('abebe@gmail.com1{enter}');
        cy.get('mat-progress-bar').should('exist');
        cy.getByDataCy('sign-up-btn').should('have.attr', 'disabled');
        cy.get('mat-error').should('have.text', 'User is already registered');
    });

    it('Successfully sin up', () => {
        cy.getByFCName('firstName').type('abebe')
            .getByFCName('lastName').type('Abebaw')
            .getByFCName('email').type('abebe@gmail.com')
            .getByFCName('phoneNumber').type('0909090909')
            .getByFCName('password').type('abebe@gmail.com1')
            .getByFCName('confirmPassword').type('abebe@gmail.com1{enter}');
        cy.get('mat-progress-bar').should('exist');
        cy.getByDataCy('sign-up-btn').should('have.attr', 'disabled');
        cy.get('mat-error').should('not.exist');
    });


});
