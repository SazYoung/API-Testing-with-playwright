import { test as base, expect, APIRequestContext } from "@playwright/test";

type ApiFixtures = {
  request: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  request: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: "https://reqres.in",
      extraHTTPHeaders: {
        "x-api-key": process.env.REQRES_API_KEY!,
      },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect };
