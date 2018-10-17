import { TrainingsTab } from '../support/constants';

describe('Trainings tab', function() {
    before('login ', () => {
        cy.logIn();
    });

    it('User click on training tab', function() {
        cy.server();
        cy.route(TrainingsTab.trainingsAPIUrl).as('loadTraining');

        cy.get(TrainingsTab.trainingsTab).click();
        cy.wait('@loadTraining');
    });

    it('User select trainer ', function () {
        cy.get(TrainingsTab.rowTrainers).click();
    });

    it('User select training ', function () {
        cy.get(TrainingsTab.rowTrainings).click();
    });

    it('User open training page', function () {
        cy.get(TrainingsTab.video)
            .should('exist');
    });

    it('User click nav buttons', function () {
        cy.get(TrainingsTab.btnNext).click();
        cy.get(TrainingsTab.btnBack).click();
    });

    it('User click breadcrumbs', function () {
        cy.get(TrainingsTab.btnBreadTrainings).click();
        cy.get(TrainingsTab.btnBreadTrainers).click();
    });

    after('logout', () => {
        cy.logOut();
    });
});
