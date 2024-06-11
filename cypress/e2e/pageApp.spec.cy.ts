describe("template spec", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/about");

    // The new page should contain an h1 with "About"
    cy.get("h1").contains("About");
  });

  it("should navigate back to the main page when clicking on 'Home' link", () => {
    // Start from the about page
    cy.visit("http://localhost:3000/about");

    // Ensure the about page is loaded by checking for the h1 with "About"
    cy.get("h1").contains("About");

    // Find the link with href="/" and click it
    cy.get('a[href="/"]').click();

    // The new URL should be "/"
    cy.url().should("eq", "http://localhost:3000/");

    // The new page should contain a link with "Click here" that navigates to "/about"
    cy.get('a[href="/about"]').contains("Click here");
  });
});
