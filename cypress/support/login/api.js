// cypress/support/commands.js

Cypress.Commands.add('getPost', (postId) => {
  cy.request('GET', `https://jsonplaceholder.typicode.com/posts/${postId}`);
});

Cypress.Commands.add('createPost', (postData) => {
  cy.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: postData,
    headers: {
      'Content-Type': 'application/json',
    },
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
  });
});

Cypress.Commands.add('deletePost', (postId) => {
  cy.request({
    method: 'DELETE',
    url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
  });
});
