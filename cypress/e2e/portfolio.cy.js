describe('Portfolio website', () => {
  it('loads the home page and navigates to Projects', () => {
    cy.visit('/');
    cy.contains('h2', 'Mission Statement').should('be.visible');
    cy.contains('a', 'See My Work').click();
    cy.location('pathname').should('eq', '/projects');
    cy.contains('h1', /projects/i).should('be.visible');
  });

  it('validates and submits the contact form', () => {
    cy.visit('/contact');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('Student');
    cy.get('input[name="contactNumber"]').type('4165550100');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('This is a test message.');
    cy.contains('button', 'Send Message').click();
    cy.location('pathname').should('eq', '/');
    cy.get('[role="status"]').should('contain.text', 'Thanks, Test Student');
  });
});
