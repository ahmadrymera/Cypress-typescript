import {LoginPage} from "./pages/login_pages"
import {DashboardPage} from "./pages/dashboard_pages"

let loginPage = new LoginPage()
let dashboardPage = new DashboardPage()
const URL = 'https://www.saucedemo.com/'

it('Success login with correct credential', () => {
    loginPage.login(URL,'standard_user','secret_sauce')
    loginPage.assertLogin() 
})

it('Test Sauce Demo Invalid Password', () => {
    loginPage.login(URL,'standard_user','invalidPass')
    loginPage.assertLoginFail()
})

it('Test Sauce Demo Sauce labs product backpack', () => {
    loginPage.login(URL,'standard_user','secret_sauce')
    loginPage.assertLogin()
    dashboardPage.openProductPage('Sauce Labs Backpack') 
})

it('Success add product to cart from shop page', ()=>{
    loginPage.login(URL,'standard_user','secret_sauce')
    loginPage.assertLogin()
    dashboardPage.addProductFromShopPage('Sauce Labs Onesie')
    dashboardPage.checkCartValueShouldBe('1')
})

it('Success remove product to cart from shop page', ()=>{
    dashboardPage.removeCurrentAddedProductFromShopPage('Sauce Labs Onesie')
    dashboardPage.checkAddButtonProductOnTheShopPage('Sauce Labs Onesie', 'Add to cart')
})

it('Success add product from product page', ()=>{
    loginPage.login(URL,'standard_user','secret_sauce')
    loginPage.assertLogin()
    dashboardPage.openProductPage('Sauce Labs Onesie')
    dashboardPage.addProductFromProductPage('Sauce Labs Onesie')
    dashboardPage.checkCartValueShouldBe('1')
})

it('Success remove product to cart from product page', ()=>{
    dashboardPage.removeProductFromProductPage('Sauce Labs Onesie')
    dashboardPage.checkAddButtonProductOnTheProductPage('Sauce Labs Onesie', 'Add to cart')
})
