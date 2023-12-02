import { loginPage } from "../pages/loginPage";
import { navBar } from "../pages/navBar";
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
                .isProductDisplayCorrect('Nike Slim shirt',11,true,120)
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

    it.only("Out of stock", () => {
        cy.get("@account").then((account) => {
            productListPage
                .clickProduct('Adidas Fit Shirt');

            productDetailPage
                .isProductDisplayCorrect('Adidas Fit Shirt',0,false,250)
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