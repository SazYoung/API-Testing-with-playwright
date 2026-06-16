import { test, expect } from "../fixtures/api";

const LOGIN_ENDPOINT = "/api/login";
const VALID_CREDENTIALS = {
  data: { email: "eve.holt@reqres.in", password: "cityslicka" },
};

test.describe("Auth API - Login", () => {
  test("POST /api/login with valid credentials returns 200 and a token", async ({
    api,
  }) => {
    const response = await api.post(LOGIN_ENDPOINT, VALID_CREDENTIALS);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("token");
    expect(typeof body.token).toBe("string");
    expect(body.token.length).toBeGreaterThan(0);
  });

  test("POST /api/login returns the same token on repeated login attempts", async ({
    api,
  }) => {
    const credentials = VALID_CREDENTIALS;

    const [firstResponse, secondResponse] = await Promise.all([
      api.post(LOGIN_ENDPOINT, credentials),
      api.post(LOGIN_ENDPOINT, credentials),
    ]);

    expect(firstResponse.status()).toBe(200);
    expect(secondResponse.status()).toBe(200);

    const firstBody = await firstResponse.json();
    const secondBody = await secondResponse.json();
    expect(firstBody.token).toBe(secondBody.token);
  });

  test("POST /api/login without a password returns 400 and an error message", async ({
    api,
  }) => {
    const response = await api.post(LOGIN_ENDPOINT, {
      data: { email: VALID_CREDENTIALS.data.email },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toBe("Missing password");
  });

  test("POST /api/login without an email returns 400 and an error message", async ({
    api,
  }) => {
    const response = await api.post(LOGIN_ENDPOINT, {
      data: { password: VALID_CREDENTIALS.data.password },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toBe("Missing email or username");
  });

  test("POST /api/login with an unregistered email returns 400", async ({
    api,
  }) => {
    const response = await api.post(LOGIN_ENDPOINT, {
      data: {
        email: "notauser@reqres.in",
        password: "password123",
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(body.error.length).toBeGreaterThan(0);
  });
});
