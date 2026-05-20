import { test, expect } from "../fixtures/api";

test.describe("Users API", () => {
  test("GET /api/users?page=2 returns a list of users", async ({ api }) => {
    const response = await api.get("/api/users", { params: { page: 2 } });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test("GET /api/users/2 returns a single user with id 2", async ({ api }) => {
    const response = await api.get("/api/users/2");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty("email");
    expect(body.data).toHaveProperty("first_name");
  });

  test("POST /api/users creates a new user and returns id and createdAt", async ({
    api,
  }) => {
    const response = await api.post("/api/users", {
      data: { name: "Sonya Blade", job: "Engineer" },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty("id");
    expect(new Date(body.createdAt).toISOString()).toBe(body.createdAt);
    expect(body.name).toBe("Sonya Blade");
    expect(body.job).toBe("Engineer");
  });

  test("PATCH /api/users/2 updates the user job and returns updatedAt", async ({
    api,
  }) => {
    const response = await api.patch("/api/users/2", {
      data: { job: "Senior Engineer" },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.job).toBe("Senior Engineer");
    expect(new Date(body.updatedAt).toISOString()).toBe(body.updatedAt);
  });

  test("DELETE /api/users/2 returns 204 with no response body", async ({
    api,
  }) => {
    const response = await api.delete("/api/users/2");

    expect(response.status()).toBe(204);

    const body = await response.body();
    expect(body.length).toBe(0);
  });
});
