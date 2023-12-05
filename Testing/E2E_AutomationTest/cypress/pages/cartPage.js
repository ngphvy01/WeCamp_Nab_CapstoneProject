import { navBar } from "./navBar";

export const cartPage = {

    clickViewProductDetail(productName){
        cy.get('.list-group').first().find('a').contains(productName).click({force:true});
        return this;
    },

    clickDeleteAllProduct() {
        cy.get('.list-group').first().find('[class="fas fa-trash"]').its('length')
            .then((n) => {
                let count = n
                while (count > 0) {
                    cy.get('.list-group').first().find('[class="fas fa-trash"]')
                        .parent().first().click({ force: true });
                    count = count - 1;
                    cy.wait(1000);
                }
            });

        return this;
    },

    clickDeleteProductByName(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-trash"]')
            .parent().click({ force: true });
        return this;
    },

    clickRemoveProduct(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-minus-circle"]')
            .parent().click({ force: true });
        return this;
    },

    clickAddProduct(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-plus-circle"]')
            .parent().click({ force: true });
        return this;
    },

    clickGoShopping() {
        cy.get('a').contains('Go Shopping').click({ force: true });
        return this;
    },

    isProductOutOfStock(productName){
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-plus-circle"]')
            .parent().should('be.disabled');
        return this;
    },

    isTotalCountCorrect(numItems, totalPrice) {
        //Verify total product count in cart
        //Verify total price
        cy.get('h3').contains('Subtotal').should('have.text', "Subtotal (" + numItems + " items) : $" + totalPrice);
        return this;
    },

    isCartEmpty() {
        //Verify Cart Status
        cy.get('h1').contains('Shopping Cart').next().find('div').contains("Cart is empty. ").should('have.length', 1);
        //Verify total product count in cart
        navBar.isProductCountInCartCorrect(0);
        //Verify total price
        this.isTotalCountCorrect(0, 0);
        //Verify button place order disable
        cy.get('button').contains('Proceed to Checkout').should('be.disabled');
        return this;
    },

    isProductAddedCorrect(product,quantity) {
        // Verify name
        cy.get('.list-group').first().find('a').contains(product.name).should('have.length', 1);
        // Verify count
        cy.get('.list-group').first().find('a').contains(product.name).parent().next().children('span').should('have.text', quantity);
        // Verify price
        cy.get('.list-group').first().find('a').contains(product.name).parent().next().next().should('have.text', "$" + product.price);

        return this;
    },

    clickPlaceOrder(){
        cy.get('button').contains('Proceed to Checkout').click({force:true});
        return this;
    }

}