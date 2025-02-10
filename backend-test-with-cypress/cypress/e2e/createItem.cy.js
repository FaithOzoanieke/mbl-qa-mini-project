describe("Create Item Test", () => {
    const baseUrl = 'https://qa-test-9di7.onrender.com';
  
    it("Should create an item successfully", () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        body: { username: "joe234", password: "josh" }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(201);
        expect(loginResponse.body).to.have.property('accessToken');
        const token = loginResponse.body.accessToken;
  
        const newItem = {
          name: "Item4",
          description: "This is my description"
        };

        cy.request({
          method: 'POST',
          url: `${baseUrl}/items`,
          headers: { 
            'Authorization': `Bearer ${token}` 
          },
          body: newItem
        }).then((itemResponse) => {

          expect(itemResponse.status).to.eq(201);
  
          const item = itemResponse.body;
          expect(item).to.have.property('name', newItem.name);
          expect(item).to.have.property('description', newItem.description);
          expect(item).to.have.property('userId', "07b2d3cc-211e-4694-a17f-849b2601cfbc");
          expect(item).to.have.property('user');
          
          const user = item.user;
          expect(user).to.have.property('id', "07b2d3cc-211e-4694-a17f-849b2601cfbc");
          expect(user).to.have.property('createdAt');
          expect(user).to.have.property('updatedAt');
          expect(user).to.have.property('deletedAt', null);
          expect(user).to.have.property('username', "joe234");
          expect(user).to.have.property('password').that.matches(/^\$2b\$10/);
          expect(item).to.have.property('createdAt');
          expect(item).to.have.property('updatedAt');
          expect(item).to.have.property('id');
          expect(item).to.have.property('deletedAt', null);
        });
      });
    });
  });
  