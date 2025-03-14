/// <reference types="Cypress"/>
describe('Login and API Access', () => {
    
    it('Getting a resource', function () {
        cy.api({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('userId');
        });
    });

    it('Post a resource', function () {
        cy.api({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            failOnStatusCode: false,
            body: {
                title: "foo",
                body: "bar",
                userId: 1
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('title', 'foo');
            expect(response.body).to.have.property('userId', 1);
        });
    });

    it('Update a resource', function () {
        cy.api({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            failOnStatusCode: false,
            body: {
                title: "foo",
                body: "baruuu",
                userId: 1
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 1);
            expect(response.body).to.have.property('title', 'foo');
            expect(response.body).to.have.property('body', 'baruuu');
            expect(response.body).to.have.property('userId', 1);
        });
    });

    it('Delete a resource', function () {
        cy.api({
            method: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/posts/2',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.empty; 
        });
    });

    it('PATCH a resource', function () {
        cy.api({
            method: 'PATCH',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            failOnStatusCode: false,
            body: {
                title: "updated title"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 1);
            expect(response.body).to.have.property('title', 'updated title');
        });
    });

});
