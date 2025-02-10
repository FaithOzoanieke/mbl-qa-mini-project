describe("User Management Test", () => {
    let token; 

    beforeAll(async () => {
        const login = await request(baseUrl)
        .post('/auth/login')
        .send({ username: "joe", password: "yourpassword" });
        token = login.body.token;
});

test("Create User", async () => {
    const res = await request(baseUrl)
    .post('/users')
    .set("Authorization", `Bearer ${token}`)
    .send({ username: "newUser", password: "newPassword" });
    expect(res.status).toBe(201);
});

test("Fetch user details", async () => {
    const res = await request(baseUrl)
    .get('/users/me')
    .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username');
});

test("Access control: Prevent unauthorized user access", async () => {
    const res = await request(baseUrl)
    .get('/users/anotherUser')
    .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
});
});