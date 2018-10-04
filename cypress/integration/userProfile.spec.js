import {Profile} from '../support/constants';

describe('Profile', () => {
    before('login', () => {
        cy.logIn();
    });

    after('login', () => {
        cy.logOut();
    });

    context('Change user data', () => {
        it('Change name', () => {
            moveInProfile();
            const userName = getRandomName();
            cy.get('#name')
                .clear()
                .type(userName);
            cy.get(':nth-child(2) > .MuiButton-label-319').click();
            cy.reLogin();
            moveInProfile();
            cy.get('#name').should('have.value', userName);
        });

        it('Change on new password', () => {
            cy.fixture('user.json').then(user => {
                const oldPassword = user.password;
                const newPassword = user.newPassword;
                cy.logIn();
                moveInProfile();
                changePassword(oldPassword, newPassword);
                cy.logOut();
            });
        });

        it('Change on old password', () => {
            cy.fixture('user.json').then(user => {
                const oldPassword = user.password;
                const newPassword = user.newPassword;
                const email = user.email;

                cy.logIn(email, newPassword);
                moveInProfile();

                changePassword(newPassword, oldPassword);
                cy.reLogin(email, oldPassword);
            });
        });
    });
});

function changePassword(oldPassword, newPassword) {
    cy.get(Profile.btnChangePassword).click();

    cy.get(Profile.inputOldPassword)
        .clear()
        .type(oldPassword);

    cy.get(Profile.newPassword)
        .clear()
        .type(newPassword);

    cy.get(Profile.newPasswordConfirmation)
        .clear()
        .type(newPassword);

    cy.get(Profile.submitChangePassword).click();

    cy.get(Profile.btnCloseModal).click();
}

function getRandomName() {
    const randomNumber = Math.floor(Math.random() * 10 + Math.random() * 10);
    return 'Jack Sparrow ' + randomNumber;
}

function moveInProfile() {
    cy.get('.MuiGrid-container-22 > .MuiButtonBase-root-342').click();

    cy.get(
        '.MuiGrid-spacing-xs-24-46 > :nth-child(1) > .MuiTypography-root-293',
    ).contains('Profile settings');
}
