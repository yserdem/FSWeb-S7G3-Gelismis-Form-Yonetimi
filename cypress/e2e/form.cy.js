describe('Form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('should fill out the form fields and submit the form', () => {
      cy.get('[data-testid=firstName-input]').type('John')
      cy.get('[data-testid=lastName-input]').type('Doe')
      cy.get('[data-testid=email-input]').type('john.doe@example.com')
      cy.get('[data-testid=password-input]').type('123456')
      cy.get('[data-testid=terms-checkbox]').check()
      cy.get('[data-testid=submit-button]').click()
    })
  
    it('should show an error message if any of the form fields are left empty', () => {
      cy.get('[data-testid=firstName-input]').type('John')
      cy.get('[data-testid=submit-button]').click()
      cy.get('[data-testid=form-error]').should('be.visible')
    })
  
    it('should show an error message if an invalid email address is entered', () => {
      cy.get('[data-testid=firstName-input]').type('John Doe')
      cy.get('[data-testid=lastName-input]').type('John Doe')
      cy.get('[data-testid=email-input]').type('invalid-email')
      cy.get('[data-testid=password-input]').type('123456')
      cy.get('[data-testid=terms-checkbox]').check()
      cy.get('[data-testid=submit-button]').click()
      cy.get('[data-testid=form-error]').should('be.visible')
    })
  
    it('should show an error message if the terms checkbox is not checked', () => {
      cy.get('[data-testid=firstName-input]').type('John Doe')
      cy.get('[data-testid=lastName-input]').type('John Doe')
      cy.get('[data-testid=email-input]').type('john.doe@example.com')
      cy.get('[data-testid=password-input]').type('123456')
      cy.get('[data-testid=submit-button]').click()
      cy.get('[data-testid=form-error]').should('be.visible')
    })
  })
  