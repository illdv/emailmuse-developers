import { EmailsTab } from '../support/constants';

const iconEmailSelf = () =>
  cy
    .get(EmailsTab.rowInTable)
    .first()
    .children()
    .first()
    .click();
const ValueSubjectFirst = () =>
  cy
    .get(EmailsTab.rowInTable)
    .first()
    .children()
    .first()
    .next();
const PrevLastElemsThead = () =>
  cy
    .get('thead tr')
    .children()
    .last()
    .prev();
const FolderName = 'Folder Name';
const firstElemTable = () => cy.get(EmailsTab.rowInTable).first();

describe('Emails tabs', () => {
  before('login', () => {
    cy.logIn();
  });

  beforeEach(() => {
    cy.server();
  });

  it('tab click emails tab', () => {
    cy.get(EmailsTab.emailsTab).click();
  });

  context('add elems and sort email search folder', () => {
    it('add email', () => {
      const firstChildElemTable = () =>
        cy
          .get(EmailsTab.rowInTable)
          .first()
          .children()
          .first()
          .next();
      const DataObj = {
        subjectValue: 'a',
        desValue: 'Z'
      };
      cy.route('/api/v1/folders?s=').as('addEmail');
      cy.get(EmailsTab.btnNewEmail).click();
      cy.get(EmailsTab.btnSelectScratch).click();
      cy.get('#subject')
        .clear()
        .type(DataObj.subjectValue);
      cy.get('#description')
        .clear()
        .type(DataObj.desValue);
      cy.saveClose();
      cy.wait('@addEmail');
      cy.get(EmailsTab.rowInTable).should('have.length', 1);
      firstChildElemTable().should('contain', DataObj.subjectValue);
      firstChildElemTable()
        .next()
        .should('contain', DataObj.desValue);
    });

    it('add folder', () => {
      cy.route('/api/v1/folders?s=').as('addFolder');
      cy.get(EmailsTab.btnAddFolder).click();
      cy.focused()
        .should('have.class', 'MuiInput-input-415')
        .type(FolderName);
      cy.get(EmailsTab.btnSaveFolder).click();
      cy.wait('@addFolder');
      firstElemTable()
        .next()
        .find('th')
        .should('contain', FolderName);
      cy.get(EmailsTab.rowInTable).should('have.length', 2);
    });
  });

  context('sort and search', () => {
    it('emails sort', () => {
      ValueSubjectFirst().should('contain', 'a');

      PrevLastElemsThead().click();
      ValueSubjectFirst().should('contain', FolderName);

      PrevLastElemsThead()
        .prev()
        .click();
      ValueSubjectFirst().should('contain', 'a');
    });

    it('search folder', () => {
      cy.route('/api/v1/folders?s=Folder Name').as('search');
      cy.route('/api/v1/folders?s=').as('backFolders');
      cy.get('#search')
        .click()
        .type(FolderName);
      cy.wait('@search');
      ValueSubjectFirst().should('contain', FolderName);
      cy.get('#search').clear();
      cy.wait('@backFolders');
    });
  });

  context('delete elems', () => {
    it('delete folder', () => {
      cy.route('DELETE', '/api/v1/folders').as('deleteFolder');
      firstElemTable()
        .next()
        .find('th')
        .should('contain', FolderName);
      firstElemTable()
        .next()
        .last()
        .find('button')
        .last()
        .click();
      cy.wait('@deleteFolder');
      cy.get(EmailsTab.rowInTable).should('have.length', 1);
    });

    it('delete email', () => {
      cy.route('DELETE', '/api/v1/emails').as('deleteEmail');
      iconEmailSelf();
      cy.deleteConfirm();
      cy.wait('@deleteEmail');
      cy.get(EmailsTab.rowInTable).should('have.length', 0);
    });
  });

  after('logout', () => {
    cy.logOut();
  });
});
