describe('Monitor de APIs Públicas', () => {
  const urlValida = 'https://pokeapi.co/api/v2/pokemon/ditto';
  const urlValida2 = 'https://api.github.com';
  const urlQuebrada = 'https://api.inexistente123.com.br/404';
  const urlInvalida = 'site-invalido';

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.clearLocalStorage();
  });

  it('Adiciona uma URL válida e exibe o card da API', () => {
    cy.get('input[type="text"]').type(urlValida);
    cy.contains('Adicionar API').click();

    cy.get('.card', { timeout: 10000 }).should('contain', urlValida);
    cy.contains('Status:').should('exist');
    cy.contains('Código HTTP:').should('exist');
  });

  it('Adiciona múltiplas APIs separadas por vírgula', () => {
    cy.get('input[type="text"]').type(`${urlValida}, ${urlValida2}`);
    cy.contains('Adicionar').click();

    cy.contains(urlValida).should('exist');
    cy.contains(urlValida2).should('exist');
  });

  it('Adiciona uma URL quebrada e exibe como offline', () => {
    cy.get('input[type="text"]').type(urlQuebrada);
    cy.contains('Adicionar API').click();

    cy.get('.card', { timeout: 10000 }).should('contain', urlQuebrada);
    cy.get('.card').should('contain.text', 'Offline');
    cy.get('.card').should('contain.text', 'Código HTTP');
  });

  it('Não permite URL inválida', () => {
    cy.get('input[type="text"]').type(urlInvalida);
    cy.contains('Adicionar API').click();

    cy.get('.error-text').should('contain.text', 'URLs inválidas ou duplicadas: site-invalido');
  });

  it('Remove uma API da lista', () => {
    cy.get('input[type="text"]').type(urlValida);
    cy.contains('Adicionar API').click();

    cy.contains('URL:').should('exist');
    cy.get('.remove-btn').click();
    cy.contains('URL:').should('not.exist');
  });

  it('Alterna entre modo claro e escuro', () => {

    cy.get('body').should('not.have.class', 'dark');

    cy.get('.theme-toggle-container .switch').click();
    cy.get('body').should('have.class', 'dark');

    cy.get('.theme-toggle-container .switch').click();
    cy.get('body').should('not.have.class', 'dark');
  });


  it('Exporta os dados para .docx', () => {

    cy.get('input[type="text"]').type(urlValida);
    cy.contains('Adicionar API').click();

    cy.get('.card', { timeout: 10000 }).should('contain', urlValida);

    cy.get('[data-cy=exportar-docx]').click();

  });

  it('Renderiza gráfico de tempo de resposta com URLs válidas', () => {
    cy.get('input[type="text"]').type(`${urlValida}, ${urlValida2}`);
    cy.contains('Adicionar').click();

    cy.get('.card', { timeout: 10000 }).should('contain', urlValida);
    cy.get('.card', { timeout: 10000 }).should('contain', urlValida2);

    cy.contains('Tempo de Resposta das APIs (ms)').should('be.visible');

    cy.contains(urlValida).should('exist');
    cy.contains(urlValida2).should('exist');

    cy.get('text').contains(/\d+/).should('exist');
  });

  it('Renderiza gráfico de status com APIs online e offline', () => {
    cy.get('input[type="text"]').type(`${urlValida}, ${urlQuebrada}`);
    cy.contains('Adicionar').click();

    cy.get('.card', { timeout: 10000 }).should('contain', urlValida);
    cy.get('.card').should('contain', urlQuebrada);

    cy.contains('Status das APIs').should('be.visible');

    cy.contains('Online').should('exist');
    cy.contains('Offline').should('exist');

    cy.get('text').contains('1').should('exist');
  });

  it('Mantém os dados no localStorage após refresh', () => {
    const urls = `${urlValida}, ${urlValida2}`;

    cy.get('input[type="text"]').type(urls);
    cy.contains('Adicionar API').click();

    cy.get('.card', { timeout: 10000 }).should('have.length.at.least', 2);

    cy.window().should((win) => {
      const item = win.localStorage.getItem('apisSalvas');
      expect(item, 'item armazenado no localStorage').to.not.be.null;

      const urlsArmazenadas = JSON.parse(item);
      expect(urlsArmazenadas).to.have.length.at.least(2);
      expect(urlsArmazenadas).to.include(urlValida);
      expect(urlsArmazenadas).to.include(urlValida2);
    });


    cy.reload();

    cy.get('.card', { timeout: 10000 }).should('contain', urlValida);
    cy.get('.card').should('contain', urlValida2);

    // Verifica se o localStorage ainda está presente após reload
    cy.window().should((win) => {
      const item = win.localStorage.getItem('apisSalvas');
      expect(item, 'item armazenado no localStorage após reload').to.not.be.null;

      const urlsArmazenadas = JSON.parse(item);
      expect(urlsArmazenadas).to.include(urlValida);
      expect(urlsArmazenadas).to.include(urlValida2);
    });
  });


});
