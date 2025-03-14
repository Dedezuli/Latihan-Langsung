describe('Modular API Tests for jsonplaceholder', () => {

    const postId = 1;
    const postData = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
  
    const updatedData = {
      id: postId,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    };
  
    const patchData = {
      title: 'Partially Updated Title'
    };
  
    it('should retrieve a post with GET method', () => {
      cy.getPost(postId).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', postId);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
      });
    });
  
    it('should create a new post with POST method', () => {
      cy.createPost(postData).should((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('title', postData.title);
        expect(response.body).to.have.property('body', postData.body);
      });
    });
  
    it('should update the post with PUT method (Replace)', () => {
      cy.updatePost(postId, updatedData).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('title', updatedData.title);
        expect(response.body).to.have.property('body', updatedData.body);
      });
    });
  
    it('should partially update the post with PATCH method', () => {
      cy.partialUpdatePost(postId, patchData).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('title', patchData.title);
      });
    });
  
    it('should delete the post with DELETE method', () => {
      cy.deletePost(postId).should((response) => {
        expect(response.status).to.eq(200);
      });
  
      cy.request({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
        failOnStatusCode: false 
      }).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
  });
  