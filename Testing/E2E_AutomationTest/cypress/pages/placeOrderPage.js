export const placeOrderPage = {

    // SHIPPING ADDRESS
    TXT_FULLNAME: "#fullName",
    TXT_ADDRESS: "#address",
    TXT_CITY: "#city",
    TXT_POSTAL: "#postalCode",
    TXT_COUNTRY: "#country",

    typeFullName(fullname) {
        cy.get(this.TXT_FULLNAME).clear().type(fullname);
        return this;
    },
    typeAddress(address) {
        cy.get(this.TXT_ADDRESS).clear().type(address);
        return this;
    },
    typeCity(city) {
        cy.get(this.TXT_CITY).clear().type(city);
        return this;
    },
    typePostalCode(postalCode) {
        cy.get(this.TXT_POSTAL).clear().type(postalCode);
        return this;
    },
    typeCountry(country) {
        cy.get(this.TXT_COUNTRY).clear().type(country);
        return this;
    },

    typeShippingInfo(fullname, address, city, postalCode, country) {
        this.typeFullName(fullname);
        this.typeAddress(address);
        this.typeCity(city);
        this.typePostalCode(postalCode);
        this.typeCountry(country);
        return this;
    },

    // PAYMENT
    BTN_PAYPAL: "#PayPal",
    BTN_STRIPE: "#Stripe",

    clickPayment(payment) {
        if (payment == 'PayPal') {
            cy.get(this.BTN_PAYPAL).click({ force: true });
        }
        else {
            cy.get(this.BTN_STRIPE).click({ force: true });
        }
        return this;
    },

    clickBtnContinue() {
        cy.get('button').contains('Continue').click({ force: true });
        return this;
    },


    // PREVIEW ORDER
    TITLE: '[class="card-title h5"]',

    clickEditShipping() {
        cy.get(this.TITLE).contains('Shipping').siblings('a').click({ force: true });
        return this;
    },

    clickEditPayment() {
        cy.get(this.TITLE).contains('Payment').siblings('a').click({ force: true });
        return this;
    },

    clickEditOrderItem() {
        cy.get(this.TITLE).contains('Items').siblings('a').click({ force: true });
        return this;
    },

    isShippingCorrect(fullname, address, city, postalCode, country) {
        let str = 'Name: '+fullname+' Address:  '+ address + ',' + city + ', ' + postalCode + ',' + country;
        cy.get(this.TITLE).contains('Shipping').siblings('p')
            .should('contain.text',str);

        return this;
    },

    isPaymentCorrect(payment) {
        cy.get(this.TITLE).contains('Payment').next('p').should('have.text', 'Method: ' + payment);
        return this;
    },

    isOrderItemsCorrect(products) {
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            // Verify name
            cy.get(this.TITLE).contains('Items').next().find('a').contains(product.name)
                .should('have.length', 1);
            // Verify count
            cy.get(this.TITLE).contains('Items').next().find('a').contains(product.name)
                .parent().next().children('span').should('have.text', product.quantity);
            // Verify price
            cy.get(this.TITLE).contains('Items').next().find('a').contains(product.name)
                .parent().next().next().should('have.text', "$" + product.price);

        }
        return this;
    },

    isOrderSummaryCorrect(itemsPrice, taxPrice, totalPrice) {
        cy.get(this.TITLE).contains('Order Summary').next().find('.col')
            .contains('Items').next().should('have.text', "$" + itemsPrice.toFixed(2));
        cy.get(this.TITLE).contains('Order Summary').next().find('.col')
            .contains('Tax').next().should('have.text', "$" + taxPrice.toFixed(2));
        cy.get(this.TITLE).contains('Order Summary').next().find('strong')
            .contains('Order Total').parent().next().children().should('have.text', "$" + totalPrice.toFixed(2));

        return this;
    },

    isOrderCorrect(order) {
        this.isShippingCorrect(order.shippingAddress.fullName,
            order.shippingAddress.address,
            order.shippingAddress.city,
            order.shippingAddress.postalCode,
            order.shippingAddress.country);
        this.isPaymentCorrect(order.paymentMethod);
        this.isOrderItemsCorrect(order.orderItems);
        this.isOrderSummaryCorrect(order.itemsPrice, order.taxPrice, order.totalPrice);
        return this;
    },

    inputOrder(order) {
        this.typeShippingInfo(order.shippingAddress.fullName,
            order.shippingAddress.address,
            order.shippingAddress.city,
            order.shippingAddress.postalCode,
            order.shippingAddress.country)
        this.clickBtnContinue()
        this.clickPayment(order.paymentMethod)
        this.clickBtnContinue()
        this.isOrderCorrect(order)
        return this;
    },

    clickPlaceOrderBtn() {
        cy.get('button').contains('Place Order').click({ force: true });
        return this;
    },
}