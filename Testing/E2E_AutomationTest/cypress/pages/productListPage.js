export const productListPage = {

    BTN_PRODUCT: ".products .card-body a div",
    
    clickProduct(productName){
        cy.get(this.BTN_PRODUCT).contains(productName).click({force:true});
        return this;
    },

    clickAddProductToCart(productName){
        cy.get(this.BTN_PRODUCT).contains(productName).parent().siblings('button').click({force:true});
        return this;
    }

}