describe("Appointments tests", () => {
  beforeEach(() => {
    // reset test database
    cy.request('GET', '/api/debug/reset');

    cy.visit("/");    
  })

  it("should book an interview", () => {
    // check if test data loads
    cy.contains('Monday');

    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones');
    
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('Save').click();

    // check result
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
     cy.get('[alt=Edit]')
      .first()
      .click({ force: true });

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains('Save').click();

    // check result
    cy.contains('.appointment__card--show', 'Archie Cohen');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  })

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]')
      .first()
      .click({ force: true }); 
    
    cy.contains('Confirm')
      .click();
    
    cy.contains('Deleting');
    cy.contains('Deleting').should('not.exist');
    
    cy.contains('body', "Archie Cohen")
      .should('not.exist');
  })
});