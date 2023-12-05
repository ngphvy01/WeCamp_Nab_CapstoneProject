export const productListPage = {

    BTN_PRODUCT: ".products .card-body a div",
    
    clickProduct(productName){
        cy.get(this.BTN_PRODUCT).contains(productName).click({force:true});
        return this;
    },

    clickAddProductToCart(productName){
        cy.get(this.BTN_PRODUCT).contains(productName).parent().siblings('button').click({force:true});
        return this;
    },

    isOutOfStock(productName){
        cy.get(this.BTN_PRODUCT).contains(productName).parent().siblings('button')
        .should('have.text', 'Out of stock')
        .should('be.disabled');
        return this;
    },

    addProductsToCart(products){
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            for (let i = 0; i < product.quantity; i++) {
                this.clickAddProductToCart(product.name);
                cy.wait(1000);
            }
        }
        return this;
    }

}