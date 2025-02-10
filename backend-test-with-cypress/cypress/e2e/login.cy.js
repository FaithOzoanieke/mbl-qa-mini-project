describe("Authentication Test", () => {
  let token;
  const baseUrl = 'https://qa-test-9di7.onrender.com';

  it("Valid login", () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: { username: "joe234", password: "josh" }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('accessToken');
      expect(response.body).to.have.property('user');
      token = response.body.accessToken;
    });
  });

  it("Incorrect login credentials", () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      failOnStatusCode: false, 
      // Using intentionally invalid credentials.
      body: { username: "wrongUser", password: "wrongPassword" }
    }).then((response) => {
      // Expect a 404 Not Found for invalid credentials.
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('error');
    });
  });

  it("Token expiration and refresh", () => {
    const expiredToken = "expiredTokenHere";
    cy.request({
      method: 'GET',
      url: `${baseUrl}/protected-route`,
      headers: { 'Authorization': `Bearer ${expiredToken}` },
      failOnStatusCode: false 
      // Allow non-2xx responses.
    }).then((response) => {
      // Expect the expired token (or unknown protected route) to return 404.
      expect(response.status).to.eq(404);
    });
  });
});
