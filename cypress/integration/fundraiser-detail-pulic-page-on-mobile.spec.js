/// <reference types="Cypress" />

before('visit the fundraiser-detail-public-page',
    () => {
        cy.visit(
            'fundraiser-detail/610194366c8a250015dddfde'
        );

    }
);

describe(
    'fundraiser detail public page on a mobile device',
    ()=>{
        it('mobile samsung s10', () => {
            cy.viewport('samsung-s10');
        });
    }
);

describe(
    'fundraiser detail public page on a tablet device',
    ()=>{
        it('Tablet ipod-2', () => {
            cy.viewport('ipad-2')
        });
    }
);

describe(
    'fundraiser detail public page on a mobile device',
    ()=>{
        it('mobile iphone-xr', () => {
            cy.viewport('iphone-xr')
        });
    }
);