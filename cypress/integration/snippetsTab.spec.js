import { SnippetsTab } from '../support/constants';


describe('snippets tab', () => {
    beforeEach(() => {
        cy.server();
    });

    it('login ', () => {
        cy.logIn();
    });

    it('click snippets tab', () => {
        cy.get(SnippetsTab.snippetsTab).click();

    });

    it('exist iframe', () => {
        cy.get('iframe')
            .should('exist');
    });

    it('add snippet', () => {
        cy.route('/api/v1/snippets').as('loadSnippet');
        cy.get('table')
            .should('not.exist');
        cy.get(SnippetsTab.btnAddSnippets).click();
        cy.get('input').first().click().type('name');
        cy.get('.jodit_wysiwyg').click().type('next');
        cy.saveClose();
        cy.wait('@loadSnippet');
        cy.get('table')
            .should('exist');
        cy.get('table')
            .should('length', 1);
        cy.get('table')
            .find('th')
            .should('contain', 'name');
        cy.get('table')
            .children()
            .first()
            .click();
        cy.get('.jodit_wysiwyg')
            .should('contain', 'next');
    });

    it('delete snippet', () => {
        cy.route('/api/v1/snippets').as('RefreshSnippet');
        cy.deleteConfirm();
        cy.wait('@RefreshSnippet');
        cy.get('table')
            .should('not.exist');
    });
});
