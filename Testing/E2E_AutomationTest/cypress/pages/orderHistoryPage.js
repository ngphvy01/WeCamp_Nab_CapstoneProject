export const orderHistoryPage = {
    
    isOrderDisplayedCorrectly(orderID,order){
        cy.get('tr').each(($el, index, $list) => {
            let text = $el.children().first().text();
            cy.log(text);
            if (text.includes(orderID)) {
                cy.get('tr').eq(index).children().eq(1).should('have.text',order.date);
                cy.get('tr').eq(index).children().eq(2).should('have.text',order.totalPrice.toFixed(2));
            };
        });
        return this;
    },

    clickViewOrderDetail(orderID){
        cy.get('tr').each(($el, index, $list) => {
            let text = $el.children().first().text();
            cy.log(text);
            if (text.includes(orderID)) {
                cy.get('tr td button').eq(index-1).click({force:true});
            };
        });
        return this;
    }
}

export const orderDetailPage = {

    isOrderIdCorrect(orderId){
        cy.get('h1').should('have.text','Order '+orderId)
        return this;
    },  

    // Use function isOrderCorrect from placeOrderPage to check order detail

}