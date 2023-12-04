import { cartPage } from "../pages/cartPage";
import { loginPage } from "../pages/loginPage";
import { navBar } from "../pages/navBar";
import { orderDetailPage, orderHistoryPage } from "../pages/orderHistoryPage";
import { placeOrderPage } from "../pages/placeOrderPage";
import { productDetailPage } from "../pages/productDetailPage";
import { productListPage } from "../pages/productListPage"

describe("Add To Cart successfully", () => {
    beforeEach(() => {
        cy.fixture("account").as("account");
        cy.visit(Cypress.env("home"));

    });

    it("Add To Cart from Product Detail", () => {
        cy.get("@account").then((account) => {
            productListPage
                .clickProduct('Nike Slim shirt');

            productDetailPage
                .isProductDisplayCorrect('Nike Slim shirt', 11, true, 120)
            // .clickAddToCart();

            // navBar
            //     .isProductCountInCartCorrect(1);

        });
    });

    it("Add To Cart from Home", () => {
        cy.get("@account").then((account) => {
            productListPage
                .clickAddProductToCart('Nike Slim shirt');

            navBar
                .isProductCountInCartCorrect(1)
                .clickViewCart();
        });
    });

    it("Add and remove from cart page", () => {
        cy.get("@account").then((account) => {
            let productList = [{ "productName": 'Nike Slim shirt', "productPrice": 120, "count": 2 },
            { "productName": 'Orchid Flower Shirt', "productPrice": 65, "count": 1 }]
            var totalPrice = 0;
            var totalProduct = 0;
            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                totalProduct = totalProduct + product.count;
                totalPrice = totalPrice + product.count * product.productPrice;
                for (let i = 0; i < product.count; i++) {
                    productListPage
                        .clickAddProductToCart(product.productName);
                    cy.wait(1000);
                }
            }

            navBar
                .isProductCountInCartCorrect(totalProduct)
                .clickViewCart();
            cy.wait(1000);

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                cartPage
                    .isProductAddedCorrect(product);
            }

            cartPage
                //     .clickRemoveProduct('Nike Slim shirt')
                //     .clickAddProduct('Nike Slim shirt')
                //     .clickDeleteProductByName('Nike Slim shirt');
                .isTotalCountCorrect(totalProduct, totalPrice);

        });
    });


    it("Can not place order with empty cart", () => {
        cy.get("@account").then((account) => {
            productListPage
                .clickAddProductToCart('Nike Slim shirt');
            cy.wait(1000);
            productListPage
                .clickAddProductToCart('Nike Slim shirt');
            cy.wait(1000);
            productListPage
                .clickAddProductToCart('Orchid Flower Shirt');

            navBar
                .isProductCountInCartCorrect(3)
                .clickViewCart();
            cy.wait(1000);

            cartPage
                .clickDeleteAllProduct()
                .isCartEmpty();

        });
    });

    it("Out of stock", () => {
        cy.get("@account").then((account) => {
            productListPage
                .clickProduct('Adidas Fit Shirt');

            productDetailPage
                .isProductDisplayCorrect('Adidas Fit Shirt', 0, false, 250)
                .isAddToCartBtnNotExist();

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


describe("Place order", () => {
    beforeEach(() => {
        cy.fixture("order").as("order");
        cy.visit(Cypress.env("home"));
    });

    it.only("Place order successfully", () => {
        cy.get("@order").then((order) => {

            productListPage.addProductsToCart(order.orderItems);

            navBar
                .isProductCountInCartCorrect(order.totalItems)
                .clickViewCart();

            cy.wait(1000);

            for (let index = 0; index < order.orderItems.length; index++) {
                cartPage.isProductAddedCorrect(order.orderItems[index]);
            }

            cartPage
                .isTotalCountCorrect(order.totalItems, order.itemsPrice)
                .clickPlaceOrder();

            loginPage
                .typeUsername(order.user.email)
                .typePassword(order.user.password)
                .clickLogin();
            
            placeOrderPage
                .inputOrder(order)
                .clickPlaceOrderBtn();


        });
    });

    it("View order history", () => {
        cy.get("@order").then((order) => {
            navBar.clickSignIn();

            loginPage
                .typeUsername(order.user.email)
                .typePassword(order.user.password)
                .clickLogin();

            navBar.clickNavDropDown()
            .clickOrderHistory();

            orderHistoryPage
            .isOrderDisplayedCorrectly('656c9651fa31af28deb533cb',order)
            .clickViewOrderDetail('656c9651fa31af28deb533cb');

            orderDetailPage
            .isOrderIdCorrect('656c9651fa31af28deb533cb');
            placeOrderPage.isOrderCorrect(order);

            


        });
    });
});