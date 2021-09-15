/// <reference types="Cypress" />

before('visit the fundraiser-detail-public-page',
    () => {
        cy.visit(
            'fundraiser-detail/610194366c8a250015dddfde'
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
        // cy.get('app-organizer-and-beneficiary-section').should('exist').and('be.visible');
        cy.get('app-comment-section').should('exist').and('be.visible');
        cy.getByDataCy('card-desktop').should('exist').and('be.visible');
        // cy.get('app-team-and-organizer-section').should('exist').and('be.visible');
    });

    it('should find all elements on the update section', () => {
        cy.getByDataCy('update-header').should('exist').and('be.visible');
        cy.getByDataCy('updates').should('exist').and('be.visible');
        cy.getByDataCy('update-info').should('exist').and('be.visible');
        cy.getByDataCy('update-content').should('exist').and('be.visible');
    });

    it('should find all elements on the comment section', () => {
        cy.getByDataCy('comment-header').should('exist').and('be.visible');
        cy.getByDataCy('comments').should('exist').and('be.visible');
        cy.getByDataCy('comment-info').should('exist').and('be.visible');
        cy.getByDataCy('comment-content').should('exist').and('be.visible');
    });

    it('should find all elements on the card', () => {
        cy.getByDataCy('data').should('exist').and('be.visible');
        cy.getByDataCy('card-share-btn').should('exist').and('be.visible');
        cy.getByDataCy('card-donate-btn').should('exist').and('be.visible');
        cy.getByDataCy('people').should('exist').and('be.visible');
        cy.getByDataCy('recent-donation').should('exist').and('be.visible');
        cy.getByDataCy('recent-donor-name').should('exist').and('be.visible').should('have.length', 2);
        cy.getByDataCy('top-donation').should('exist').and('be.visible');
        cy.getByDataCy('top-donor-name').should('exist').and('be.visible').should('have.length', 2);
        cy.getByDataCy('first-donation').should('exist').and('be.visible');
        cy.getByDataCy('first-donor-name').should('exist').and('be.visible').should('have.length', 2);//.equals(1);
        // cy.getByDataCy('all-donations-btn').should('exist').and('be.visible');
        // cy.getByDataCy('top-donations-btn').should('exist').and('be.visible');
        // cy.getByDataCy('you-have-donated').should('exist').and('be.visible');
    });

    it('should find all elements on the statistics component', () => {
        cy.getByDataCy('goal').should('be.visible');
        cy.getByDataCy('total-raised').should('be.visible');
        cy.getByDataCy('donors').should('be.visible');
        cy.getByDataCy('shares').should('be.visible');
        cy.getByDataCy('followers').should('be.visible');
        cy.getByDataCy('progress').should('be.visible');
    });

    it('should find all elements on all donations->dialog components', () => {
        cy.getByDataCy('all-donations-btn')
            .should('be.visible')
            .last()
            .click();
        cy.getByDataCy('donations-title').should('be.visible')
        cy.getByDataCy('toggle-btn').should('be.visible')
        cy.getByDataCy('donate-btn').should('be.visible')
        cy.getByDataCy('donor-name').should('be.visible')
        cy.getByDataCy('donation-time').should('be.visible')

        cy.getByDataCy('close-btn').click();
    });

    it('should find all elements on  top donations->dialog components', () => {
        cy.getByDataCy('top-donations-btn')
            .last()
            .click();
        cy.getByDataCy('donations-title').should('be.visible')
        cy.getByDataCy('toggle-btn').should('be.visible')
        cy.getByDataCy('donate-btn').should('be.visible')
        cy.getByDataCy('donor-name').should('be.visible')
        cy.getByDataCy('donation-time').should('be.visible')
        cy.getByDataCy('close-btn').click();
    });

    it('should find all elements on the report dialog', () => {
        cy.getByDataCy('report-btn').click();
        cy.getByDataCy('report-title').should('be.visible');
        cy.getByDataCy('close-btn').should('be.visible');
        cy.getByDataCy('radio-group').should('be.visible');
        cy.getByDataCy('option').should('be.visible');
        cy.getByDataCy('cancel-btn').should('be.visible');
        cy.getByDataCy('submit-btn').should('be.visible');
        
        setTimeout(() => {
        }, 2000);
        cy.getByDataCy('cancel-btn').click();
    });

});