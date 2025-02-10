describe("Item Management Test", () => {
    let token, itemId;

    beforeAll(async () => {
        let token, itemId;

        beforeAll(async () => {
            const login = await request(baseUrl)
            .post('/auth/login')
            .send({ username: "joe", password: "yourpassword" });

            token = login.body.token;
        });

        test("Create an Item", async () => {
            const res = await request(baseUrl)
            .post('/items')
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New Item", description: "Item Description" });

            expect(res.status).toBe(201);
            itemId = res.body._id;
        });

        test("Update an item", async () => {
            const res = await request(baseUrl)
            .patch(`/items/${itemId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Updated Item" });

            expect(res.status).toBe(200);
        });

        test("Delete an item", async () => {
            const res = await request(baseUrl)
            .delete(`/items/${itemId}`)
            .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
        });
    });
});