# Pedro's Backend

GraphQL backend for the Pedros frontend. Implements products, offers, locations and orders using MongoDB + Mongoose and Apollo Server.

Quick start

1. Install dependencies

```bash
cd Pedros-Backend
pnpm install # or npm install
```

2. Copy `.env.example` to `.env` and provide `MONGO_URI` and `JWT_SECRET` (JWT not required for frontend features)

3. Seed the database

```bash
pnpm run seed
```

4. Run development server

```bash
pnpm run dev
```

GraphQL endpoint: http://localhost:4000/

Important environment variables

- `MONGO_URI` — MongoDB connection string
- `PORT` — optional server port (default 4000)
- `JWT_SECRET` — optional if you add auth

Example GraphQL queries

Get all menu items:

```
query { menuItems { id name price image tag description } }
```

Create an order:

```
mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(items: $items, subtotal: 100, deliveryFee: 35, total: 135, fulfillment: "delivery", payment: "card", customer: { name: "Thabo", phone: "082..." }) {
    orderNumber
    id
    status
  }
}
```
