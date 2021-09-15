/// <reference types="Cypress" />

before('visit the fundraiser-detail-public-page',
    () => {
        cy.visit(
            'fundraiser-detail/610ed3c86ae433001589dbd3'
        );
    }
);

describe(
    'Fundraiser-detail-page on desktop header', () => {
        it('should find all the elements to be seen on desktop', () => {
            cy.getByDataCy('search-field').should('not.exist');
            cy.getByDataCy('start-a-campaign-btn').should('exist');
            cy.getByDataCy('login-btn').should('exist');
            cy.getByDataCy('share-btn').should('exist');
            cy.getByDataCy('donate-btn').should('exist');
        });

        it("shouldn't find elements that are only shown on mobile devices", () => {
            cy.getByDataCy('mobile-btn').should('not.not.be.visible');
            cy.getByDataCy('share-btn-mobile').should('not.be.visible');
            cy.getByDataCy('menu-btn-mobile').should('not.be.visible');
        });
    }
);

describe('Fundraiser-detail--public-page-body on desktop', () => {
    it('finds the title fundraiser detail elements visible on desktop', () => {
        cy.getByDataCy('block-btn').should('not.exist');
        cy.getByDataCy('title-desktop').should('be.visible');
        cy.getByDataCy('fundraiser-image').should('exist');
        cy.getByDataCy('mobile-stat').should('exist').and('not.be.visible');
        cy.getByDataCy('title-mobile').should('exist').and('not.be.visible');
        cy.getByDataCy('data-mobile').should('exist').and('not.be.visible');
        cy.getByDataCy('organizer-data').should('exist').and('be.visible');
        cy.getByDataCy('report-btn').should('exist').and('be.visible');
        cy.getByDataCy('date-and-category').should('exist').and('be.visible');
        cy.getByDataCy('story').should('exist').and('be.visible');
        cy.getByDataCy('card-mobile').should('exist').and('not.be.visible');
        cy.get('app-updates-section').should('exist').and('be.visible');
        cy.get('app-team-and-organizer-section').should('exist').and('be.visible');
        // cy.get('app-organizer-and-beneficiary-section').should('exist').and('be.visible');
        cy.get('app-comment-section').should('exist').and('be.visible');
        cy.getByDataCy('card-desktop').should('exist').and('be.visible');

    });
});