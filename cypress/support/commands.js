Cypress.Commands.add('getByFCName', formControlName => {
    return cy.get(`[formControlName=${formControlName}]`);
});// fc=>form control

Cypress.Commands.add('getByDataCy', dataCy => {
    return cy.get(`[data-cy=${dataCy}]`);
});