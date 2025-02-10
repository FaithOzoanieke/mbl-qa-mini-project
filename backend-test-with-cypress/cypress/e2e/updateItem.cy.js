describe("Update Item Test", () => {
    const baseUrl = 'https://qa-test-9di7.onrender.com';
  
    it("Should create an item and then update it successfully", () => {
      // Step 1: Log in to obtain a valid authentication token.
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        body: { username: "joe234", password: "josh" }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(201);
        expect(loginResponse.body).to.have.property('accessToken');
        const token = loginResponse.body.accessToken;
  
        // Step 2: Create an item.
        const newItem = {
          name: "Item4",
          description: "This is my description"
        };
  
        cy.request({
          method: 'POST',
          url: `${baseUrl}/items`,
          headers: { 'Authorization': `Bearer ${token}` },
          body: newItem
        }).then((createResponse) => {
          expect(createResponse.status).to.eq(201);
          const createdItem = createResponse.body;
          const createdItemId = createdItem.id;
  
          // Step 3: Update the created item.
          const updatePayload = {
            name: "Update working???",
            description: "Testing update endpoint... 123"
          };
  
          cy.request({
            method: 'PATCH',
            url: `${baseUrl}/items/${createdItemId}`,
            headers: { 'Authorization': `Bearer ${token}` },
            body: updatePayload
          }).then((updateResponse) => {
            expect(updateResponse.status).to.eq(200);
            const updatedItem = updateResponse.body;
  
            // Validate that the item has been updated.
            expect(updatedItem).to.have.property('id', createdItemId);
            expect(updatedItem).to.have.property('name', updatePayload.name);
            expect(updatedItem).to.have.property('description', updatePayload.description);
            expect(updatedItem).to.have.property('createdAt'); 
            expect(updatedItem).to.have.property('updatedAt'); 
            expect(updatedItem).to.have.property('deletedAt', null);
            expect(updatedItem).to.have.property('userId', "07b2d3cc-211e-4694-a17f-849b2601cfbc");
          });
        });
      });
    });
  });
  