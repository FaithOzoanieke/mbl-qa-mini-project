describe("View Items Test", () => {
    const baseUrl = 'https://qa-test-9di7.onrender.com';
  
    it("Should retrieve items with joined user details", () => {
      // First, log in to get a valid authentication token.
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        body: { username: "joe234", password: "josh" }
      }).then((loginResponse) => {
        // Ensure the login is successful.
        expect(loginResponse.status).to.eq(201);
        expect(loginResponse.body).to.have.property('accessToken');
        const token = loginResponse.body.accessToken;
  
        // Now, request the items endpoint with the token in the headers.
        cy.request({
          method: 'GET',
          url: `${baseUrl}/items?join=user`,
          headers: { 'Authorization': `Bearer ${token}` }
        }).then((itemsResponse) => {
          expect(itemsResponse.status).to.eq(200);
  
          expect(itemsResponse.body).to.be.an('array');
  
          // Optionally, check that there is at least one item.
          if (itemsResponse.body.length > 0) {
            const item = itemsResponse.body[0];
            // Validate the structure of the item.
            expect(item).to.have.property('id');
            expect(item).to.have.property('createdAt');
            expect(item).to.have.property('updatedAt');
            expect(item).to.have.property('deletedAt', null);
            expect(item).to.have.property('name');
            expect(item).to.have.property('description');
            expect(item).to.have.property('userId');
            expect(item).to.have.property('user');
  
            // Validate the structure of the joined user object.
            const user = item.user;
            expect(user).to.have.property('id');
            expect(user).to.have.property('createdAt');
            expect(user).to.have.property('updatedAt');
            expect(user).to.have.property('deletedAt', null);
            expect(user).to.have.property('username');
            expect(user).to.have.property('password');
          }
        });
      });
    });
  });
  