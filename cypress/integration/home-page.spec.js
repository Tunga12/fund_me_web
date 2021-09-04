/// <reference types="Cypress" />

before('', () => {
    cy.visit('/home-page');
    cy.clearLocalStorage()
});

describe('Home page for not logged in users', () => {
    it('finds all public elements on the nav bar', () => {
        cy.getByDataCy('search-field').should('be.visible');
        cy.getByDataCy('start-a-campign-btn').should('be.visible');
        cy.getByDataCy('sign-in-btn').should('be.visible');
    });

    it('shouldn\'t find protected links', () => {
        cy.getByDataCy('your-fundraisers-btn').should('not.exist');
        cy.getByDataCy('account-btn').should('not.exist');
    });

    it('shouldn\'t find links visible only to large devices', () => {
        cy.getByDataCy('start-a-comign-btn-gt-xs').should('not.exist');
        cy.getByDataCy('sign-in-btn-gt-xs').should('not.exist');
    });

    it('shouldn\'t find protected and not visible to gt-sm devices', () => {
        cy.getByDataCy('menu-btn').should('not.exist');
    });

});

describe('Home page for logged in users', () => {
    it('finds all allowed elements on the nav bar', () => {
        localStorage.setItem('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFlMWM5ODRmODY3OTAwMTY5NDI3MWUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MzA1ODkyNzB9.Z-mdNJoVuwj4Uy8WDIuKfO_5f2IX9f3T9H7IuAOcc0E');  
        cy.visit('/home-page')
        cy.getByDataCy('search-field').should('be.visible');
        cy.getByDataCy('your-fundraisers-btn').should('be.visible');
        cy.getByDataCy('account-btn').should('be.visible');
    });

    it('shouldn\'t find protected links visible only to xs devices', () => {
        cy.getByDataCy('start-a-comign-btn-lt-xs').should('not.exist');
        cy.getByDataCy('sign-in-btn-lt-xs').should('not.exist');
    });

    // it('shouldn\'t find protected and not visible to gt-sm devices', () => {
    //     cy.getByDataCy('menu-btn').should('not.exist');
    // });

});


describe('Home page body', () => {
    it('should show elments visible on small devices on samsun s1', () => {
        cy.viewport('samsung-s10');
        cy.getByDataCy('mobile-header').should('exist');
        cy.getByDataCy('mobile').should('be.visible');
        cy.getByDataCy('mobile-image').should('be.visible');
        cy.getByDataCy('get-started-mobile').should('be.visible');
        cy.getByDataCy('start-btn-mobile').should('be.visible');
        cy.getByDataCy('how-it-works-btn-mobile').should('be.visible');
    });

    it('should show elments visible on large devices', () => {
        cy.getByDataCy('non-mobile-header').should('be.visible');
        cy.getByDataCy('get-started').should('be.visible');
        cy.getByDataCy('start-btn').should('be.visible');
        cy.getByDataCy('how-it-works-btn').should('be.visible');
        cy.getByDataCy('top-fundraisers-header').should('be.visible');
        cy.getByDataCy('fundraisers-list').should('be.visible');
        cy.getByDataCy('trending-topic').should('be.visible');
    });

    it('should\'t show elments visible on small devices', () => {
        cy.getByDataCy('mobile-header').should('not.be.visible');
        cy.getByDataCy('mobile').should('not.be.visible');
        cy.getByDataCy('mobile-image').should('not.be.visible');
        cy.getByDataCy('get-started-mobile').should('not.be.visible');
        cy.getByDataCy('start-btn-mobile').should('not.be.visible');
        cy.getByDataCy('how-it-works-btn-mobile').should('not.be.visible');
    });
    
});
