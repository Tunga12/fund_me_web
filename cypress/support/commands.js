Cypress.Commands.add('getByFCName', formContolName => {
    return cy.get(`[formControlName=${formContolName}]`);
});// fc=>form control

Cypress.Commands.add('getByDataCy', dataCy => {
    return cy.get(`[data-cy=${dataCy}]`);
});// fc=>form control