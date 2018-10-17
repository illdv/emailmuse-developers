import { LayoutTab } from '../support/constants';
describe('snippets tab', () => {
  beforeEach(() => {
    cy.server();
  });

  before('login', () => {
    cy.logIn();
  });

  after('login', () => {
    cy.logOut();
  });

  it('click layout tab', () => {
    cy.get(LayoutTab.layoutTab).click();
  });
});
