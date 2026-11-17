describe('Portfolio website', () => {
  it('loads the home page and navigates to Projects', () => {
    cy.visit('/');
    cy.contains('h2', 'Mission Statement').should('be.visible');
    cy.contains('a', 'See My Work').click();
    cy.location('pathname').should('eq', '/projects');
    cy.contains('h1', /projects/i).should('be.visible');
  });

  it('submits the Contact form through the API', () => {
    cy.intercept('POST', '/api/contact', {
      statusCode: 201,
      body: { ok: true, message: 'Message saved successfully.' },
    }).as('saveContact');
    cy.visit('/contact');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('Student');
    cy.get('input[name="contactNumber"]').type('4165550100');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('This is a test message.');
    cy.contains('button', 'Send Message').click();
    cy.wait('@saveContact').its('request.body').should('include', {
      firstName: 'Test', lastName: 'Student', email: 'test@example.com',
    });
    cy.get('[role="status"]').should('contain.text', 'Thanks, Test');
  });
});
