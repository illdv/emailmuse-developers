import {ImageTab} from '../support/constants';

describe('Images library tab', function () {
    const inputName = 'my awesome image';
    before('login ', () => {
        cy.logIn();
    });

    it('User click on image tab', () => {
        cy.server();
        cy.route(ImageTab.imageAPIURL).as('loadImages');
        cy.get(ImageTab.imageLibraryTab).click();
        cy.wait('@loadImages');
        countImages('imageCountStart');
        // .should('have.length', 0);
    });

    it('User click upload button ', function () {
        cy.get(ImageTab.btnUploadImg).click();

    });

    it.skip('User click on delete button on footer first card', function () {
        cy.get(ImageTab.imageCard).first()
            .find(ImageTab.btnImageCardDelete)
            .click();
    });

    context('Header Images library', () => {
        it('header should contain image count', () => {
            cy.get(ImageTab.imageCounter).first();
            const count = this.imageCountStart;
        });

        it('User type on search input', function () {
            cy.get(ImageTab.searchInput).clear()
                .type(inputName);
        });

        it('User click input button', function () {
            cy.get(ImageTab.searchInput);
        });
    });

    context.skip('Image card', () => {
        it('User click on image card ', function () {
            cy.get(ImageTab.imageCard).first().click();
        });

        it('User type text in name field ', function () {
            cy.get(ImageTab.inputImageName).click()
                .clear()
                .type(inputName);
        });

        it('User click on URL field ', function () {
            cy.get(ImageTab.inputImageURL).click();
            //ToDo: check tost
        });

        it('User click update button ', function () {
            cy.get(ImageTab.btnPopupUpdate).click();
        });
    });

    after('logout', () => {
        cy.logOut();
    });
});

function countImages(name) {
    return cy.get(ImageTab.imageList)
        .then(ulElem => ulElem.find('li'))
        .its('length').as(name);
}