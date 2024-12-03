describe('HTTP Status 200', () => {
  const url = 'https://fakerestapi.azurewebsites.net/api/v1/Books';

  it('should return a 200 status code', () => {
    cy.request(url).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

describe('HTTP Status 404', () => {
  const site = 'https://fakerestapi.azurewebsites.net/api/v1/Book';

  it('should return a 404 status code', () => {
    cy.request({url: site, failOnStatusCode: false}).then((response) => {
      expect(response.status).to.eq(404)
    })
  })
})

describe('Apenas testes CRUD para a api de livros', () => {
  const apiUrl = 'https://fakerestapi.azurewebsites.net/api/v1/Books';

  it('Dado que o usuário cadastra um livro com informações válidas, quando enviar o request POST para a api /api/v1/Books, então retorna status 200 com o response contendo as mesmas informações enviadas.', () => {
    const body = {
      id: 45,
      title: 'Virtudes no cotidiano',
      description: 'Livro escrito por Vitor Sales Pinheiro',
      pageCount: 443,
      excerpt: 'Lorem ipsum odor amet, consectetuer adipiscing elit.',
      publishDate: '2024-12-01',
    };

    cy.request('POST', apiUrl, body).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.exist; 
      expect(response.body.id).to.eq(45);
      expect(response.body.title).to.eq('Virtudes no cotidiano');
      expect(response.body.description).to.eq('Livro escrito por Vitor Sales Pinheiro');
      expect(response.body.pageCount).to.eq(443);
      expect(response.body.excerpt).to.eq('Lorem ipsum odor amet, consectetuer adipiscing elit.');
      expect(response.body.publishDate).to.eq('2024-12-01T00:00:00');
    });
  });

  it('Dado um id valido de um livro, quando fizer o request da consulta pelo id, entao a api retornara status 200 e as informacoes do livro', () => {
    cy.request('GET', `${apiUrl}/45`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(45);
      expect(response.body.title).to.eq('Book 45');
      expect(response.body.description).to.eq('Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n');
      expect(response.body.pageCount).to.eq(4500);
      expect(response.body.excerpt).to.eq('Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n');
    });
  });

  it('Dado um id valido de um livro, quando fizer o request da atualização do livro pelo id, entao a api retornara status 200 e as informacoes do livro', () => {
    const body = {
      id: 45,
      title: 'Virtudes no cotidiano',
      description: 'Livro escrito por Vitor Sales Pinheiro',
      pageCount: 443,
      excerpt: 'Lorem ipsum odor amet, consectetuer adipiscing elit.',
      publishDate: '2024-12-01',
    };

    cy.request('PUT', `${apiUrl}/45`, body).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.exist; 
      expect(response.body.id).to.eq(45);
      expect(response.body.title).to.eq('Virtudes no cotidiano');
      expect(response.body.description).to.eq('Livro escrito por Vitor Sales Pinheiro');
      expect(response.body.pageCount).to.eq(443);
      expect(response.body.excerpt).to.eq('Lorem ipsum odor amet, consectetuer adipiscing elit.');
      expect(response.body.publishDate).to.eq('2024-12-01T00:00:00');
    });
  });

  it('Dado um id valido de um livro, quando fizer o request da exclusão do livro pelo id, entao a api retornara status 200 de sucesso', () => {
    cy.request('DELETE', `${apiUrl}/45`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
