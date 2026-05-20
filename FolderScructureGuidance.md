## Folder Structure Guidance
/tests
  /api
    users.spec.ts
    products.spec.ts
/fixtures
  api.ts          ← shared APIRequestContext
  auth.ts         ← token fixture
/test-data
  product.json    ← static fixture file
/.env.example     ← safe to commit