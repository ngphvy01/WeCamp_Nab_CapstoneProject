export const productDetailPage = {
    TXT_PRODUCT_NAME: ".list-group-item h1",
    TXT_PRODUCT_STATUS:".list-group-item .row .col",

    BTN_ADD_TO_CART: ".card-body div button",

    BTN_TOASTIFY:".Toastify button",
    TXT_TOASTIFY:".Toastify .Toastify__toast-body div",

    BTN_SELECT_RATING: "#rating",
    TXT_INPUT_REVIEW: "#floatingTextarea",
    BTN_SUBMIT_REVIEW: "form button",
    TXT_TOTAL_REVIEW: ".row .rating span",

    // VIEW PRODUCT
    isNameCorrect(name){
        cy.get(this.TXT_PRODUCT_NAME).should('have.text',name);
        return this;
    },

    isPriceCorrect(price){
        cy.get(this.TXT_PRODUCT_NAME).parent().siblings().eq(1).should('have.text',"Pirce : $"+price);
        return this;
    },

    isTotalReviewCorrect(num){
        cy.get(this.TXT_TOTAL_REVIEW).last().should('have.text',' '+num+' reviews');
        return this;
    },

    isStatusCorrect(inStock){
        if (inStock==false){
            cy.get(this.TXT_PRODUCT_STATUS).contains('Status').next().children()
            .should('have.text','Unavailable');
        }
        else{
            cy.get(this.TXT_PRODUCT_STATUS).contains('Status').next().children()
            .should('have.text',"In Stock");
        }
        return this;
    },

    isProductDisplayCorrect(name,num,inStock,price){
        this.isNameCorrect(name);
        this.isTotalReviewCorrect(num);
        this.isPriceCorrect(price);
        this.isStatusCorrect(inStock);
        return this;
    },

    // ADD TO CART
    isAddToCartBtnNotExist(){
        cy.get(this.BTN_ADD_TO_CART).should('have.length',0);
        return this;
    },

    clickAddToCart() {
        cy.get(this.BTN_ADD_TO_CART).click({ force: true });
        return this;
    },

    // REVIEW
    clickSignIn() {
        cy.get('h2').contains('Reviews').parent().find('a').click({ force: true });
        return this;
    },

    selectRating(rate) {
        cy.get(this.BTN_SELECT_RATING).select(rate);
        return this;
    },

    typeReview(review) {
        cy.get(this.TXT_INPUT_REVIEW).type(review);
        return this;
    },

    clickSubmitReview() {
        cy.get(this.BTN_SUBMIT_REVIEW).contains("Submit").click({ force: true });
        return this;
    },

    isToastifyCorrect() {
        cy.get(this.TXT_TOASTIFY).next('div').should('have.text', 'Review submitted successfully');
        //cy.get(this.TXT_TOASTIFY).next('div').should('have.text', 'You already submitted a review');
        
        return this;
    },

    clickCloseToastifyButton() {
        cy.get(this.BTN_TOASTIFY).click({ force: true });
        return this;
    },


    isReviewDisplayCorrect(name, rate, review, date) {
        cy.get('h2').contains('Reviews').siblings('.list-group').find('.list-group-item strong').first()
            .should('have.text', name);
        cy.get('h2').contains('Reviews').siblings('.list-group').find('.list-group-item .rating').first().find('[class="fas fa-star"]')
            .should('have.length', rate);
        cy.get('h2').contains('Reviews').siblings('.list-group').find('.list-group-item').first().children('p').first()
            .should('have.text', date);
        cy.get('h2').contains('Reviews').siblings('.list-group').find('.list-group-item').first().children('p').last()
            .should('have.text', review);
    },

    isReviewCorrect(name, rate, review, date,num){
        this.isToastifyCorrect();
        this.clickCloseToastifyButton();
        this.isReviewDisplayCorrect(name, rate, review, date);
        this.isTotalReviewCorrect(num);
        return this;
    }

}