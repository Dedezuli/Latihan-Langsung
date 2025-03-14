// cypress/support/commands.js

Cypress.Commands.add('getPost', (postId) => {
  cy.request('GET', `https://jsonplaceholder.typicode.com/posts/${postId}`)
    .should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', postId);
    });
});

Cypress.Commands.add('createPost', (postData) => {
  cy.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: postData,
    headers: {
      'Content-Type': 'application/json',
    },
  }).should((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('title', postData.title);
    expect(response.body).to.have.property('body', postData.body);
  });
});

Cypress.Commands.add('updatePost', (postId, postData) => {
  cy.request({
    method: 'PUT',
    url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
    body: postData,
    headers: {
      'Content-Type': 'application/json',
    },
  }).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('title', postData.title);
    expect(response.body).to.have.property('body', postData.body);
  });
});

Cypress.Commands.add('partialUpdatePost', (postId, postData) => {
  cy.request({
    method: 'PATCH',
    url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
    body: postData,
    headers: {
      'Content-Type': 'application/json',
    },
  }).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('title', postData.title);
  });
});

Cypress.Commands.add('deletePost', (postId) => {
  cy.request({
    method: 'DELETE',
    url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
  }).should((response) => {
    expect(response.status).to.eq(200);
  });
});
