export const loginPage = {
    TXT_USERNAME: "#email",
    TXT_PASSWORD: "#password",

    typeUsername(username) {
        cy.get(this.TXT_USERNAME).type(username);
        return this;
    },

    typePassword(password) {
        cy.get(this.TXT_PASSWORD).type(password);
        return this;
    },

    clickLogin() {
        cy.get('button').contains('Sign In').click({ force: true });
        return this;
    },
    
    clickSignUp() {
        cy.get('a').contains('Create your account').click({ force: true });
        return this;
    },

    clickResetPassword() {
        cy.get('a').contains('Reset Password').click({ force: true });
        return this;
    },

    isNotificationCorrect(){
        cy.get('.Toastify .Toastify__toast-body div').next('div').should('have.text','Invalid email or password');
        return this;
    },

    clickCloseToastifyButton(){
        cy.get('.Toastify button').click({ force: true });
        return this;
    },
}