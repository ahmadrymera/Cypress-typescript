export class DashboardPage {
  slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  openProductPage(productName: string) {
    cy.contains(productName).click();
    cy.contains(productName).should("be.visible");
  }

  addProductFromShopPage(productName: string) {
    cy.get(".inventory_item_description")
      .contains(productName)
      .parentsUntil(".inventory_item")
      .find(`#add-to-cart-${this.slugify(productName)}`)
      .should("contain.text", "Add to cart")
      .click();
  }

  removeCurrentAddedProductFromShopPage(productName: string) {
    cy.get(".inventory_item_description")
      .contains(productName)
      .parentsUntil(".inventory_item")
      .find(`#remove-${this.slugify(productName)}`);
    cy.contains("Remove").click();
  }

  addProductFromProductPage(productName: string) {
    cy.get(".inventory_details_name")
      .contains(productName)
      .nextAll(`#add-to-cart-${this.slugify(productName)}`)
      .should("contain.text", "Add to cart")
      .click();
  }

  removeProductFromProductPage(productName: string) {
    cy.get(".inventory_details_name")
      .contains(productName)
      .nextAll(`#remove-${this.slugify(productName)}`)
      .should("contain.text", "Remove")
      .click();
  }

  checkAddButtonProductOnTheShopPage(productName: string, status: string) {
    cy.get(".inventory_item_description")
      .contains(productName)
      .parentsUntil(".inventory_item")
      .find(`#${this.slugify(status)}-${this.slugify(productName)}`)
      .should("contain.text", status);
  }

  checkAddButtonProductOnTheProductPage(productName: string, status: string) {
    cy.get(".inventory_details_name")
      .contains(productName)
      .nextAll(`#${this.slugify(status)}-${this.slugify(productName)}`)
      .should("contain.text", status);
  }

  checkCartValueShouldBe(item: string) {
    cy.get(
      "#shopping_cart_container > .shopping_cart_link > .shopping_cart_badge"
    ).should("have.text", item);
  }
}
