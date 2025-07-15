describe('Monitor de APIs Públicas', () => {
  const urlTeste = 'https://pokeapi.co/api/v2/pokemon/ditto';
  const urlQuebrada = 'https://api.inexistente123.com.br/404';

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Adiciona uma URL válida e exibe o card da API', () => {
    cy.get('input[type="text"]').type(urlTeste);
    cy.contains('Adicionar API').click();


    cy.get('.card', { timeout: 10000 }).should('contain', urlTeste);

    cy.contains('Status:').should('exist');
    cy.contains('Código HTTP:').should('exist');
  });

  it('Adiciona uma url quebrada e exibe o card da API', () => {
    cy.get('input[type="text"]').type(urlQuebrada);
    cy.contains('Adicionar API').click();

    cy.get('.card', { timeout: 10000 }).should('contain', urlQuebrada);

    cy.get('.card').should('contain.text', 'Offline');
    cy.get('.card').should('contain.text', 'Código HTTP');
  });

  it('Não permite URL inválida', () => {
    cy.get('input[type="text"]').type('site-invalido');
    cy.contains('Adicionar API').click();
    cy.contains('URL inválida').should('exist');
  });

  it('Remove uma API da lista', () => {
    cy.get('input[type="text"]').type(urlTeste);
    cy.contains('Adicionar API').click();
    cy.contains('URL:').should('exist');


    cy.get('.remove-btn').click();
    cy.contains('URL:').should('not.exist');
  });
});
