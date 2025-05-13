# Pension API

## Getting Started

**1. Install dependencies**

```bash
npm install
```

**2. Create `.env`**

```bash
cp .env.example .env
```

**3. Run service**

```bash
# For development
docker compose up -f docker-compose.dev.yaml up

# For production
docker compose up
```

**4. Prepare database**

```bash
# Run migrations
npm run migrate:run

# Seed database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres npm run seed
```

## Scope

1. Get all pension pots
2. Get all searched pension pots
3. Get all pots
4. Search for a specific pot by name
5. Search for a specific pot by ID
6. Search for pots with a value over X
7. Search for pots with a value under X
8. Show all FOUND search pensions
9. Find all pots with a specific employer
10. Find all pots with a specific pension provider
11. Get all pension pots with a forecasted balance after X number of years given their interest rate and monthly payment
