describe('Reusable API Tests with Expect in Test Case', () => {

    const postId = 1;
  
    beforeEach(() => {
      cy.fixture('postData').as('postData');
    });
  
    it('should retrieve a post with GET method', function() {
      cy.getPost(postId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', postId);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
      });
    });
  
    it('should create a new post with POST method', function() {
      cy.createPost(this.postData).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('title', this.postData.title);
        expect(response.body).to.have.property('body', this.postData.body);
      });
    });
  
    it('should update the post with PUT method', function() {
      const updatedData = { title: 'Updated Title', body: 'Updated body content' };
      cy.updatePost(postId, updatedData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('title', updatedData.title);
        expect(response.body).to.have.property('body', updatedData.body);
      });
    });
  
    it('should partially update the post with PATCH method', function() {
      const patchData = { title: 'Partially Updated Title' };
      cy.partialUpdatePost(postId, patchData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('title', patchData.title);
      });
    });
  
    it('should delete the post with DELETE method', function() {
      cy.deletePost(postId).then((response) => {
        expect(response.status).to.eq(200);
      });
  
      cy.request({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
        failOnStatusCode: false, 
      }).should((response) => {
        expect(response.status).to.eq(200); 
      });
    });
  
  });
  