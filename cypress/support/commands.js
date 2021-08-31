Cypress.Commands.add('getByFCName', formContolName => {
    return cy.get(`[formControlName=${formContolName}]`);
});// fc=>form control