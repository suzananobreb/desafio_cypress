describe('HTTP Status 200', () => {
  const url = 'https://www.wcaquino.me/cypress/componentes.html';

  it('deve retornar um status code 200', () => {
    cy.request(url).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

describe('Todos os cenários de testes criados para envio de formulário', () => {
  const url = 'https://www.wcaquino.me/cypress/componentes.html';

  beforeEach(() => {
    cy.visit(url);
  });

  it('Validação do campo nome não preenchido no formulario', () => {
    cy.get('#formCadastrar').click();

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Nome eh obrigatorio');
    });
  });

  it('Validação do campo sobrenome não preechido no formulario', () => {
    cy.get('#formNome').type('Theo');

    cy.get('#formCadastrar').click();

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Sobrenome eh obrigatorio');
    });
  });

  it('Validação do campo sexo não preenchido no formulario', () => {
    cy.get('#formNome').type('Theo');
    cy.get('#formSobrenome').type('Andrade');

    cy.get('#formCadastrar').click();

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Sexo eh obrigatorio');
    });
  });

  it('Validação de formulario cadastrado com sucesso', () => {
    cy.get('#formNome').type('Theo');
    cy.get('#formSobrenome').type('Andrade');
    cy.get('[name="formSexo"][value="M"]').check();
    cy.get('#formComidaPizza').check(); 
    cy.get('#formEscolaridade').select('Superior'); 
    cy.get('#formEsportes').select('Corrida');
    
    cy.get('#formCadastrar').click();

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Cadastrado!');
    });
  });
});
