# reqres-k6-load-tests

## Performance Testing (k6)

This project includes a basic **k6 load test** for the `POST /api/users` endpoint of the ReqRes API.

### 📁 Location
Performance tests are located in:

performance/
└─ create-user.k6.js

### 🚀 What is tested
- Endpoint: `POST https://reqres.in/api/users`
- Payload: user creation request
- Validation:
  - HTTP status code `201`
  - Basic response checks

### ▶️ How to run from terminal
Make sure `k6` is installed, then run:
ss
```mkdir -p target```
```k6 run performance/create-user.k6.js```

### Extensibility

The performance test can be easily extended with:

Different load profiles (smoke, load, stress)

Thresholds to fail CI builds

Multiple endpoints and scenarios

CI/CD execution (e.g., Jenkins)