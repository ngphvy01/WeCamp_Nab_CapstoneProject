export const navBar ={

    BTN_NAV_DROPDOWN: "#basic-nav-dropdown",
    BTN_NAV:"#basic-navbar-nav a",
    BTN_NAV_CATEGORY:"nav button",
    BTN_NAV_CATEGORY_ITEM:".nav-item a",
    TXT_CARD_COUNT: "#basic-navbar-nav a span",

    clickNavCategory(){
        cy.get(this.BTN_NAV_CATEGORY).click({force:true});
        return this;
    },

    clickNavCategoryItem(categoryItem){
        cy.get(this.BTN_NAV_CATEGORY_ITEM).contains(categoryItem).click({force:true});
        return this;
    },

    clickViewCart(){
        cy.get(this.BTN_NAV).contains('Cart').click({force:true});
        return this;
    },

    clickSignIn(){
        cy.get(this.BTN_NAV).contains('Sign In').click({force:true});
        return this;
    },
    
    clickNavDropDown() {
        cy.get(this.BTN_NAV_DROPDOWN).click({ force: true });
        return this;
    },
    
    clickUserProfile() {
        cy.get('a').contains('User Profile').click({ force: true });
        return this;
    },

    clickGoToHome(){
        cy.get('a').contains('amazona').click({force:true});
        return this;
    },

    clickOrderHistory(){
        cy.get('a').contains('Order History').click({force:true});
        return this;
    },

    isProductCountInCartCorrect(numItems){
        if (numItems >0){
            cy.get(this.TXT_CARD_COUNT).should('have.text',numItems);
        }else{
            cy.get(this.BTN_NAV).contains('Cart').children().should('have.length', 0);
        }
        return this;
    }
}