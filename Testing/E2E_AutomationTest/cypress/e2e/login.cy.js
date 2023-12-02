import { loginPage } from "../pages/loginPage";
import { profilePage } from "../pages/profilePage";
import { navBar } from "../pages/navBar";

describe("Sign In successfully", () => {
    beforeEach(() => {
        cy.fixture("account").as("account");
        cy.visit(Cypress.env("login"));
    });

    it("Sign In with correct account", () => {
        cy.get("@account").then((account) => {
            loginPage
                .typeUsername(account.valid[0].email)
                .typePassword(account.valid[0].password)
                .clickLogin();

            navBar
                .clickNavDropDown()
                .clickUserProfile();

            profilePage
                .isEmailCorrect(account.valid[0].email);
        });
    });
});

describe("Can not sign in", () => {
    beforeEach(() => {
        cy.fixture("account").as("account");
        cy.visit(Cypress.env("login"));
    });

    it.only("Can not sign in", () => {
        cy.get("@account").then((account) => {
            loginPage
                .typeUsername(account.invalid[0].email)
                .typePassword(account.invalid[0].password)
                .clickLogin()
                .isNotificationCorrect()
                .clickCloseToastifyButton();
        });
    });
});