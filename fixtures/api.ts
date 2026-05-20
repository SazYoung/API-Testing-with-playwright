import { test as base, expect, APIRequestContext } from "@playwright/test";

type ApiFixtures = {
  api: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  api: async ({ playwright }, use) => {
    const apiKey = process.env.REQRES_API_KEY;
    if (!apiKey) throw new Error("REQRES_API_KEY env var is not set");

    const context = await playwright.request.newContext({
      baseURL: "https://reqres.in",
      extraHTTPHeaders: { "x-api-key": apiKey },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect };
