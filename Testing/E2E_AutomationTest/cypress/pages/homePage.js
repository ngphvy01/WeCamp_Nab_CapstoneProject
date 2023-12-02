export const homePage = {
    BTN_NAV_DROPDOWN: "#basic-nav-dropdown",
    BTN_PRODUCT: ".products .card-body a div",

    clickNavDropDown() {
        cy.get(this.BTN_NAV_DROPDOWN).click({ force: true });
        return this;
    },
    
    clickUserProfile() {
        cy.get('a').contains('User Profile').click({ force: true });
        return this;
    },

    clickProduct(){
        cy.get().click({force:true});
        return this;
    }

}