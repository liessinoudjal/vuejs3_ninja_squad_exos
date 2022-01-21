const user = {
  id: 1,
  login: 'cedric',
  money: 1000,
  registrationInstant: '2015-12-01T11:00:00Z',
  token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
};

function startBackend() {
  cy.intercept('POST', 'api/users', user).as('registerUser');
}

describe('Register', () => {
  beforeEach(() => startBackend());

  it('should display a register page', () => {
    cy.visit('/register');

    const loginInput = () => cy.get('input').first();
    const passwordInput = () => cy.get('input[type=password]').first();
    const birthYearInput = () => cy.get('input[type=number]');
    const errorMessage = () => cy.get('.invalid-feedback');

    cy.get('button').should('be.visible').and('be.disabled');
    loginInput().type('c');
    loginInput().clear();
    errorMessage().should('be.visible').and('contain', 'The login is required');
    loginInput().type('ced');
    errorMessage().should('not.exist');

    passwordInput().type('p');
    passwordInput().clear();
    errorMessage().should('be.visible').and('contain', 'The password is required');
    passwordInput().type('pa');
    errorMessage().should('not.exist');

    birthYearInput().clear();
    errorMessage().should('be.visible').and('contain', 'The birth year is required');
    birthYearInput().type(1986);
    errorMessage().should('not.exist');

    cy.get('form > button').click();
    cy.wait('@registerUser');

    cy.location('pathname').should('eq', '/');
  });
});
