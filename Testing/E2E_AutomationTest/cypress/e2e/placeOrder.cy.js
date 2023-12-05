import { cartPage } from "../pages/cartPage";
import { loginPage } from "../pages/loginPage";
import { navBar } from "../pages/navBar";
import { orderDetailPage, orderHistoryPage } from "../pages/orderHistoryPage";
import { placeOrderPage } from "../pages/placeOrderPage";
import { productDetailPage } from "../pages/productDetailPage";
import { productListPage } from "../pages/productListPage"

describe("Place Order Successfully", () => {
    beforeEach(() => {
        cy.fixture("order").as("order");
        cy.visit(Cypress.env("home"));
    });

    it("Place order successfully", () => {
        cy.get("@order").then((orders) => {

            let order = orders.valid;
            productListPage.addProductsToCart(order[0].orderItems);

            navBar.clickViewCart();
            cy.wait(1000);

            cartPage.clickPlaceOrder();
            cy.wait(200);

            loginPage
                .typeUsername(order[1].user.email)
                .typePassword(order[1].user.password)
                .clickLogin();

            placeOrderPage
                .inputOrder(order[0])
                .clickEditShipping()
                .typeShippingInfo(order[1].shippingAddress)
                .clickBtnContinue()
                .clickBtnContinue()
                .clickEditPayment()
                .clickPayment(order[1].paymentMethod)
                .clickBtnContinue()
                .clickEditOrderItem();

            for (let index = 0; index < order[0].orderItems.length; index++) {
                const product = order[0].orderItems[index];

                cartPage.clickAddProduct(product.name);
                cy.wait(500);
            }

            cartPage.clickPlaceOrder();
            placeOrderPage
                .clickBtnContinue()
                .clickBtnContinue()
                .isOrderCorrect(order[1])
                .clickPlaceOrderBtn()
                .isOrderCorrect(order[1]);

            cy.get('h1').then(($e) => {
                let orderId= $e.text();
                orderId = orderId.replace('Order ','');
                cy.log(orderId);

                navBar
                    .clickNavDropDown()
                    .clickOrderHistory();

                orderHistoryPage
                    .isOrderDisplayedCorrectly(orderId, order[1])
                    .clickViewOrderDetail(orderId);
                
                cy.wait(500);

                orderDetailPage.isOrderIdCorrect(orderId);
                placeOrderPage.isOrderCorrect(order[1]);

            });
        });
    });
});


describe("Can not place order", () => {
    beforeEach(() => {
        cy.fixture("order").as("order");
        cy.visit(Cypress.env("home"));
        cy.get("@order").then((order) => {
            navBar.clickSignIn();
            loginPage
                .typeUsername(order.invalid.user.email)
                .typePassword(order.invalid.user.password)
                .clickLogin();
            cy.wait(500);

        });
    });

    it.only("Can not place order with empty cart", () => {
        cy.get("@order").then((order) => {
            productListPage
                .clickAddProductToCart('Nike Slim shirt');

            navBar.clickViewCart();
            cy.wait(500);

            cartPage
                .clickDeleteAllProduct()
                .isCartEmpty();

        });
    });

    const order = require('../fixtures/order.json');
    const invalidOrder = order.invalid.shippingAddress;

    invalidOrder.forEach((data) => {
        it.only(data.testName, () => {
                productListPage
                    .clickAddProductToCart('Nike Slim shirt');
    
                navBar.clickViewCart();
                cy.wait(500);
    
                cartPage.clickPlaceOrder();
                placeOrderPage
                    .typeShippingInfo(data)
                    .clickBtnContinue()
                    .checkErrorMessage(data.error.errorMessage,data.error.errorField);  
        });
    });
});


describe("Review successfully", () => {
    beforeEach(() => {
        cy.fixture("account").as("account");
        cy.visit(Cypress.env("home"));
    });

    it("Review without sign in", () => {
        cy.get("@account").then((account) => {
            productListPage
                .clickProduct('Nike Slim shirt');


            cy.scrollTo('bottom');
            cy.wait(1000);
            productDetailPage
                .clickSignIn();

            loginPage
                .typeUsername(account.valid[0].email)
                .typePassword(account.valid[0].password)
                .clickLogin();

            productDetailPage
                .selectRating('3- Good')
                .typeReview('nice')
                .clickSubmitReview()
                .isReviewCorrect();

        });
    });
});