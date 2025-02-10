const request = require('supertest');
const baseUrl = 'https://qa-test-9di7.onrender.com';

describe("Authentication Test", () => {
    let token;

    test("Valid login", async () => {
        const res = await request(baseUrl)
        .post('/auth/login')
        .send({ username: "joe", password: "yourpassword" })
    

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
});

test("Incorrect login credentials", async () => {
    const res = await request(baseUrl)
    .post('/auth/login')
    .send({ username: "wrongUser", password: "wrongPassword" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
});

test("Token expiration and refresh", async () => {
    //Simulate token expiration
    const expiredToken = "expiredTokenHere";

    const res = await request(baseUrl)
    .get('/protected-route')
    .set('Authorization', `Bearer ${expiredToken}`);

    expect(res.status).toBe(401);
});

});