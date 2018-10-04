import { commands } from './constants';
import { Authorization } from '../support/constants';
require('@cypress/snapshot').register();

Cypress.Commands.add('mockFolders', (mockFolders = 'fixture:folders') => {});

Cypress.Commands.add('logIn', (email, password) => {
  cy.visit('/');
  cy.get(commands.btnSignPassEMail).click();
  cy.get(':nth-child(1) > .MuiInput-root-232 > .MuiInput-input-240');

  cy.fixture('user.json').then(user => {
    cy.get(Authorization.inputLogin)
      .clear()
      .type(email || user.email);

    cy.get(Authorization.inputPassword)
      .clear()
      .type(password || user.password);
    cy.get(Authorization.btnSignIn).click();
  });
});

Cypress.Commands.add('logOut', () => {
  cy.get(commands.btnAccount).click();
  cy.get(commands.btnLogout).click();
});
Cypress.Commands.add('saveClose', () => {
  cy.get(commands.btnSave).click();
  cy.get(commands.btnClose).click();
});
Cypress.Commands.add('deleteConfirm', () => {
  cy.get(commands.btnRemove).click();
  cy.get(commands.confirmationYes).click();
});

Cypress.Commands.add('reLogin', (email, password) => {
  cy.logOut();
  cy.logIn(email, password);
});
