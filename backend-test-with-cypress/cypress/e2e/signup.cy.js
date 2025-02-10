describe("Signup Test", () => {
    const baseUrl = 'https://qa-test-9di7.onrender.com';
  
    it("Valid signup", () => {
      // Generate a unique username to avoid "Username already exists" errors.
      const uniqueUsername = `joe234_${Date.now()}`;
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/signup`,
        body: { username: uniqueUsername, password: "josh" }
      }).then((response) => {
        expect(response.status).to.eq(201);
        
        // Verify the response body contains the expected properties.
        expect(response.body).to.have.property('username', uniqueUsername);
        expect(response.body).to.have.property('password');
        // Check that the password appears to be hashed (starts with "$2b$10")
        expect(response.body.password).to.match(/^\$2b\$10/);
        expect(response.body).to.have.property('createdAt');
        expect(response.body).to.have.property('updatedAt');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('deletedAt', null);
      });
    });
  });
  