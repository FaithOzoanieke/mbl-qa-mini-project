describe("Delete Item Test", () => {
    const baseUrl = 'https://qa-test-9di7.onrender.com';
  
    it("Should create and then delete an item successfully", () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        body: { username: "joe234", password: "josh" }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(201);
        expect(loginResponse.body).to.have.property('accessToken');
        const token = loginResponse.body.accessToken;
  
        const newItem = {
          name: "Item to Delete",
          description: "This item will be deleted"
        };
  
        cy.request({
          method: 'POST',
          url: `${baseUrl}/items`,
          headers: { 'Authorization': `Bearer ${token}` },
          body: newItem
        }).then((createResponse) => {
          expect(createResponse.status).to.eq(201);
          const createdItemId = createResponse.body.id;
  
          cy.request({
            method: 'DELETE',
            url: `${baseUrl}/items/${createdItemId}`,
            headers: { 'Authorization': `Bearer ${token}` }
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.satisfy(status => status === 200 || status === 204);
  
            cy.request({
              method: 'GET',
              url: `${baseUrl}/items/${createdItemId}`,
              headers: { 'Authorization': `Bearer ${token}` },
              failOnStatusCode: false 
            }).then((getResponse) => {
              expect(getResponse.status).to.eq(404);
            });
          });
        });
      });
    });
  });
  