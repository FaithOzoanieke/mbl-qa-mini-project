describe("View One Item Test", () => {
    const baseUrl = 'https://qa-test-9di7.onrender.com';
    it("Should create an item and retrieve that single item", () => {
      // First, log in to get a valid authentication token.
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        body: { username: "joe234", password: "josh" }
      }).then((loginResponse) => {
        // Verify that login is successful.
        expect(loginResponse.status).to.eq(201);
        expect(loginResponse.body).to.have.property('accessToken');
        const token = loginResponse.body.accessToken;
  
        // Next, create an item.
        const newItem = {
          name: "Item4",
          description: "This is my description"
        };
  
        cy.request({
          method: 'POST',
          url: `${baseUrl}/items`,
          headers: { 'Authorization': `Bearer ${token}` },
          body: newItem
        }).then((createItemResponse) => {
          expect(createItemResponse.status).to.eq(201);
          // Save the created item's ID.
          const createdItemId = createItemResponse.body.id;
          
          // Now retrieve that item using its ID.
          cy.request({
            method: 'GET',
            url: `${baseUrl}/items/${createdItemId}`,
            headers: { 'Authorization': `Bearer ${token}` }
          }).then((itemResponse) => {
            expect(itemResponse.status).to.eq(200);
            const item = itemResponse.body;
            
            // Validate the structure and values of the retrieved item.
            expect(item).to.have.property('id', createdItemId);
            expect(item).to.have.property('name', newItem.name);
            expect(item).to.have.property('description', newItem.description);
            expect(item).to.have.property('deletedAt', null);
            expect(item).to.have.property('createdAt');
            expect(item).to.have.property('updatedAt');
            expect(item).to.have.property('userId');
          });
        });
      });
    });
  });
  