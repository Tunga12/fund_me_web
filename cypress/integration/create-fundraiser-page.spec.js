/// <reference types="Cypress" />

before('visit the fundraiser-detail-public-page',
    () => {
        localStorage.setItem('lang', 'am')
        localStorage.setItem('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTEzYzk5OTk1NGFhOTAwMTUzYTI2N2UiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjMxNzgzNzAxfQ.roXp0BjuF8OpIsgAONHZowrs34pD-8dC72AwHTUda6I')
        cy.visit(
            '/create'
        );
    }
);

describe(
    'Create fundraiser page',
    () => {
        it('finds all element in basic info page', () => {
            cy.getByDataCy('category-label').should('be.visible');
            cy.getByDataCy('category').should('be.visible');
            cy.getByDataCy('category-required-error').should('not.exist');
            cy.getByDataCy('goal-label').should('be.visible');
            cy.getByDataCy('goal').should('be.visible');
            cy.getByDataCy('goal-required-error').should('not.exist');
            cy.getByDataCy('goal-min-error').should('not.exist');
            cy.getByDataCy('info').should('be.visible');
        });

        it('should show category is required message and next-button should be disabled', () => {
            cy.getByDataCy('category').dblclick();
            cy.getByDataCy('category-required-error').should('be.visible');
            cy.getByDataCy('next-btn').should('have.attr', 'disabled');
        });

        it('should show goal is required message and next-button should be disabled', () => {
            cy.getByDataCy('goal').click();
            cy.getByDataCy('category').dblclick();
            cy.getByDataCy('goal-required-error').should('be.visible');
            cy.getByDataCy('next-btn').should('have.attr', 'disabled');

        });

        it('should show goal minimum message and next-button should be disabled', () => {
            cy.getByDataCy('goal').click().type(0);
            cy.getByDataCy('goal-min-error').should('be.visible');
            cy.getByDataCy('next-btn').should('have.attr', 'disabled');
        });

        it('should fill the fields and go to the set media page', () => {
            cy.getByDataCy('category').click();
            cy.getByDataCy('categories').first().click();
            cy.getByDataCy('goal').click().clear().type(100);
            cy.getByDataCy('next-btn').should('not.have.attr', 'disabled');
            cy.getByDataCy('next-btn').click();
        });
    }
);


describe(
    'Should find all elements on the set fundraiser media page',
    () => {
        it('find elements', () => {
            cy.getByDataCy('intro-message').should('be.visible');
            cy.getByDataCy('image-label').should('be.visible');
            cy.getByDataCy('label-text').should('be.visible');
            cy.getByDataCy('next-btn').should('not.exist');
        });

        it('uploads image', () => {
            cy.getByDataCy('image-label').click();
            // cy.getByDataCy('image').click();
        });
    }
);


