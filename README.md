# Rho Docs Site — Combined README

This repo is a Vue + Vite frontend for the Rho product documentation and API reference. The goal is a dark-mode docs site with a shared layout, route-based navigation, and a consistent design system across the full documentation set.

## Project purpose

Rho is a commerce platform with a public storefront API, authenticated customer flows, order and payment processing, and an admin-facing backend. The docs site should help developers understand the product quickly, navigate by domain, and find the exact API reference and SDK usage patterns they need.

The frontend should present the docs as a structured, route-driven experience with:

- a fixed sticky header
- a left sidebar navigation by section
- a main article area per page
- a right table of contents for the current page
- shared visual styling across all documentation pages
- direct links between concept pages, API pages, and SDK usage examples

## Site map

- `/` — Landing
- `/docs/getting-started` — Getting Started
- `/docs/architecture` — Architecture
- `/docs/auth` — Auth
- `/docs/storefront` — Storefront
- `/docs/cart-checkout` — Cart & Checkout
- `/docs/orders` — Orders
- `/docs/payments` — Payments
- `/docs/inventory-discounts` — Inventory & Discounts
- `/docs/addresses-shipping` — Addresses & Shipping
- `/docs/notifications` — Notifications
- `/docs/api-reference` — API Reference
- `/docs/sdk` — SDK
- `/docs/deployment` — Deployment
- `/docs/contributing` — Contributing

## Shared navigation and page conventions

- Every page uses the same dark docs shell and visual style.
- Side navigation is grouped by route domain, using the same names as the site map above.
- Keep code blocks consistent with actual SDK names and route naming.
- Cross-page security language should match exactly wherever the same concept reappears.
- The checkout transaction is described in full on the Cart & Checkout page and linked from other pages instead of being repeated in long form.

## Detailed page breakdown

## `/` — Landing

Purpose: answer “what is this” in under 30 seconds and route into the docs.

### Hero

- One-line positioning statement + one paragraph.
- Framing: platforms asking you to move into their building vs. Rho letting you keep your own.
- This is the “Why Rho?” opening.

### Feature grid or list

Use the features list from the product summary:

- Auth
- Products
- Categories
- Cart
- Checkout
- Orders
- Payments
- Inventory
- Discounts
- Addresses
- Shipping
- Notifications

Each item should be a one-line description pulled from the Features section.

### Architecture snapshot

Include the top-level flow diagram:

Your Application → Rho REST API → Auth / Commerce / Payments → PostgreSQL

This should be rendered as a real visual diagram, not ASCII.

### Quickstart CTA

Use a short code block:

```bash
git clone <repository-url>
cd rho
cp .env.example .env
```

Add a CTA to `/docs/getting-started` for the full local setup guide.

### Footer strip

Links to:

- API Reference
- SDK
- GitHub
- License

---

## `/docs/getting-started`

Purpose: get a working local instance running.

### Prerequisites

List:

- Go
- PostgreSQL
- Node.js
- npm

Add a note that the exact Go version is pinned in `go.mod`.

### Clone and configure

```bash
git clone <repository-url>
cd rho
cp .env.example .env
```

Add a note or toggle for Windows users:

```powershell
Copy-Item .env.example .env
```

### Minimum environment variables

Use a small table with these required values:

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | Primary database connection |
| `JWT_SECRET` | Yes | Required for auth tokens |

Link out to `/docs/deployment` for the full production environment variable list.

### Install and run

```bash
go mod download
# apply migrations (see /docs/architecture#database for tooling)
go run ./cmd/api
```

### Install the SDK

```bash
npm install rho-commerce/sdk
```

### Alternative: Docker Compose

```bash
docker compose up --build
```

Add a warning callout:

> Warning: `docker compose down -v` deletes local data.

### Confirm it's running

Explain the difference between:

- `GET /health` — process is alive
- `GET /ready` — database is reachable

Then include the request/response examples for both endpoints.

**Next step link:** → Architecture

---

## `/docs/architecture`

Purpose: explain the mental model before someone reads source or builds an integration.

### Request flow

Include a diagram showing:

Handler → Service → Repository → PostgreSQL

Then directly below it, the concrete example:

Order Handler → Order Service → Order Repository → PostgreSQL

### Why explicit SQL

One paragraph explaining that `pgx` is used directly, without an ORM, so the query behavior is visible rather than generated. Frame this as a design choice, not a limitation.

### Project structure

Render the repo tree as a collapsible tree, not a wall of text on first view. Include:

- `cmd/`
- `internal/*` — all 17 packages
- `pkg/*`
- `sdk/`
- `migrations/`
- `docs/`
- `Dockerfile`
- `docker-compose.yml`
- `Makefile`
- `openapi.yaml`
- `go.mod`

### Layer responsibilities

Three short subsections:

- Repositories — persistence and encapsulated SQL
- Services — business logic such as checkout’s multi-step flow
- Handlers — request parsing, auth context, calling services, response shaping

The concrete example of service logic should include:

1. validate cart
2. calculate totals
3. apply discount
4. validate inventory
5. reserve inventory
6. create order
7. record discount usage
8. clear cart

### API versioning

Explain the `/api/v1` prefix and that future versions can coexist. State that developers should avoid relying on undocumented behavior.

### Extending Rho

Describe the `internal/example/` scaffold:

- `model.go`
- `repository.go`
- `service.go`
- `handler.go`
- `routes.go`

Also mention the matching migration pair and how the SDK exposes new API surface in:

- `sdk/src/modules/`
- `sdk/src/types/`

This belongs here rather than on Contributing because it is architectural, not process-driven.

---

## `/docs/auth`

### Overview

One paragraph introducing token-based auth for API clients.

### Registration and login

Describe the endpoint flow from the Authentication feature list.

### Access vs. refresh tokens

Explain short-lived access tokens and longer-lived refresh tokens. Call out explicitly that a refresh token cannot be used as an access token.

> Important: refresh tokens are not valid substitutes for access tokens.

### Roles and permissions

Explain role-based authorization and the split between admin and customer privileges. Note that `super_admin` escalation requires the appropriate privilege, and an ordinary admin cannot self-promote.

### Google OAuth

One line noting support exists. If a config reference exists elsewhere, link to it.

### Code sample

```typescript
const result = await rho.auth.login({
  email: "customer@example.com",
  password: "password",
})
```

Add a note that the SDK returns the auth data, but token storage strategy and XSS/CSRF threat model are the application’s responsibility.

### Stateless logout

Explain that logout does not revoke an already-issued access token; tokens are short-lived by design. Apps that need immediate revocation need their own session or revocation layer.

---

## `/docs/storefront`

### Overview

The public, read-only catalog layer — the only part meant to be accessed unauthenticated directly from a frontend.

### Products endpoint

```http
GET /api/v1/storefront/products
```

Pagination example:

```http
GET /api/v1/storefront/products?page=1&limit=20
```

Category filter example:

```http
GET /api/v1/storefront/products?category_id=<category-id>
```

Explain that only active products are returned; this is the boundary between the public storefront and admin-side product management.

### Categories endpoint

```http
GET /api/v1/storefront/categories
```

### Who consumes this

Describe consumers such as:

- web storefronts
- mobile apps
- statically generated stores
- headless frontends

One line each, or a small logo/label row for React / Vue / Nuxt / Next.js / mobile.

### SDK equivalents

```typescript
const products = await rho.storefront.listProducts({ page: 1, limit: 20 })
const categories = await rho.storefront.listCategories()
const filtered = await rho.storefront.listProducts({ categoryId })
```

---

## `/docs/cart-checkout`

### Cart lifecycle

Use the flow diagram: browse → add → update quantity → remove → apply discount → checkout.

State clearly: a cart belongs to its authenticated user; no cross-user access is allowed.

### Checkout as a transaction

This is the most important page in the site. Keep room for the full 11-step ordered list:

1. Retrieve the customer's cart
2. Retrieve product information
3. Calculate prices
4. Apply discounts
5. Validate inventory
6. Reserve inventory
7. Create the order
8. Create order items
9. Record discount usage where applicable
10. Clear the cart
11. Commit the transaction

Immediately follow with the failure paragraph:

If any step fails before commit, everything rolls back. Checkout either fully succeeds or leaves no trace.

### Diagram

Use a real diagram showing:

Cart → Products / Quantities / Discount → Checkout → Order

---

## `/docs/orders`

### Order model

Fields include:

- customer
- order items
- subtotal
- discount
- total
- currency
- status
- created/updated timestamps

### Access rules

Customers can retrieve their own orders; admins act under their permission level. Explicitly state that knowing an order ID is not sufficient to fetch it if it is not yours. This is a security property and should be written plainly.

### SDK example

```typescript
try {
  const order = await rho.orders.get(orderId)
} catch (error) {
  console.error(error)
}
```

Pair this with the general error-handling guidance on the SDK page rather than duplicating the full explanation here. Link to that page instead.

---

## `/docs/payments`

### Payment flow

Use the full diagram:

Customer → Checkout → Order → Payment Initialization → Paystack → (Verification / Webhook) → Rho Payment → Order Paid

### Server-side amount verification

State this first: the charged amount comes from the server-side order, never a client-supplied value. This is the “why”; the verification logic explains the “how.”

### Verification

Explain what is checked:

- expected amount
- expected currency
- provider reference

Successful verification transitions the order to `paid`.

### Webhooks

```http
POST /api/v1/webhooks/paystack
```

Include the HMAC-SHA512 signature verification requirement before any event is processed.

> Callout: self-hosted deployments must point their Paystack webhook config at the public Rho API.

### Money and currency

Explain integer minor units using this conversion table:

| Display | Stored |
|---|---|
| ₦100.00 | 10000 |
| ₦50.00 | 5000 |
| ₦5.50 | 550 |

Close with the instruction to confirm minor-unit conventions per currency/provider instead of assuming they are the same everywhere.

---

## `/docs/inventory-discounts`

### Inventory

Product-level tracking. The critical property is that inventory is validated and reserved inside the checkout transaction, not when the cart is built or a storefront page is rendered.

Include the flow:

Product → Available inventory → Checkout → (fail/succeed) → Reserved → Order created

This prevents stale “in stock” badges from leading to overselling.

### Discounts

Describe percentage vs. fixed-value discounts, including optional caps on percentage discounts.

Use the flow:

Subtotal → discount calculation → discount amount → final total

Tie discount usage to the same checkout transaction as order creation, and point back to the checkout page instead of repeating the full transaction explanation.

---

## `/docs/addresses-shipping`

### Addresses

Fields include:

- label
- first name
- last name
- company
- phone
- address lines
- city
- state
- postal code
- country
- default flag

Explain that addresses are scoped to the authenticated customer. Note that the default-address constraint is enforced at the database level: one default per user.

SDK examples:

```typescript
const address = await rho.addresses.create({ /* fields */ })
const addresses = await rho.addresses.list()
await rho.addresses.update(addressId, { city: "Abuja" })
await rho.addresses.setDefault(addressId)
```

### Shipping

Explain that resources attach to orders. Admins can create, update, and delete; customers can read shipping info for their own orders only. State that the ownership check is enforced in the order repository at the same layer as order access, not duplicated separately.

---

## `/docs/notifications`

### Endpoints

```http
GET /api/v1/notifications
PUT /api/v1/notifications/:id/read
```

These are user-scoped by default.

### What triggers notifications

Framed as the intended event surface:

- payment success
- order status changes
- shipping updates
- account events

Explain that the notification layer is intentionally decoupled from the business services that emit these events.

### SDK

```typescript
const notifications = await rho.notifications.list()
await rho.notifications.markRead(notificationId)
```

---

## `/docs/api-reference`

Purpose: lookup, not narrative. Keep prose minimal.

### Route index by domain

Group entries exactly like the sidebar:

- auth
- products/categories
- storefront
- cart
- checkout
- orders
- payments
- addresses
- notifications
- shipping
- inventory
- discounts

Each entry should include:

- method
- path
- one-line description
- auth requirement: public / customer / admin

### OpenAPI

Embed or deep-link the `openapi.yaml` file. If the site supports generation, create the tables directly from the spec rather than maintaining a second duplicate source of truth.

---

## `/docs/sdk`

### Install

```bash
npm install rho-commerce/sdk
```

### Client initialization

```typescript
import { RhoClient } from "rho-commerce/sdk"

const rho = new RhoClient({ baseURL: "https://api.example.com" })
```

Add the local-dev variant:

```typescript
const rho = new RhoClient({ baseURL: "http://localhost:8080" })
```

### Why use the SDK over raw fetch

One short comparison:

- `fetch("/api/v1/storefront/products")`
- `rho.storefront.listProducts()`

Explain that the SDK is typed, autocompleted, and generated against the actual route definitions so it cannot silently drift from the server.

### Module reference

Include one subsection per module:

- `rho.auth` — login, session/token handling
- `rho.storefront` — `listProducts`, `listCategories`
- `rho.cart` / `rho.checkout` — cart lifecycle and completing an order
- `rho.orders` — `get`, `list`
- `rho.addresses` — `create`, `list`, `update`, `setDefault`
- `rho.notifications` — `list`, `markRead`

### Error handling

Use the `try/catch` pattern and list the categories the app should handle:

- authentication failures
- validation errors
- not-found
- permission errors
- payment failures
- inventory failures
- network failures
- server errors

Close with: do not expose raw server errors to end users.

### Versioning

Explain SemVer (`0.2.0` style) and instruct readers to review release notes on upgrade for breaking changes.

---

## `/docs/deployment`

### Pre-deploy checklist

Render as a real checklist component, not a paragraph. Include:

- PostgreSQL
- strong JWT secrets
- payment provider credentials
- HTTPS
- CORS
- backups
- logging
- monitoring
- rate limiting
- secure env vars
- Paystack webhook URL pointed at the public deployment

### Don'ts

- Do not reuse development secrets in production.
- Do not expose PostgreSQL directly to the public internet unless the architecture specifically requires it.
- Put Rho behind a reverse proxy or load balancer where appropriate.

### Backups

What to back up:

- users
- products
- inventory
- orders
- payments
- addresses
- discounts
- other app data

Call out this line prominently:

> Test restoration. Don’t assume a backup is usable just because it exists.

### Observability

Monitor:

- API availability
- DB availability
- HTTP error rate
- latency
- payment failures
- checkout failures
- inventory failures
- DB connection health

Call out `/health` and `/ready` as the infra hooks for monitoring.

### Security considerations

List: HTTPS, secret management, firewall rules, DB access controls, rate limiting, CORS restrictions, secure token handling, monitoring, and backups.

Explicitly state that these values must never reach frontend code:

- `DATABASE_URL`
- `JWT_SECRET`
- `PAYSTACK_SECRET_KEY`

---

## `/docs/contributing`

### Before submitting a change

```bash
go test ./...
go vet ./...
go test -tags=integration ./...
```

SDK side:

```bash
npm run typecheck
npm run build
```

### CI

Describe what GitHub Actions checks:

- formatting
- dependency consistency
- vetting
- backend unit + integration tests
- SDK install, typecheck, and build

### Database changes

Every migration needs both `.up.sql` and `.down.sql`. Keep the API contract and SDK in sync with backend changes rather than merging them separately.

### Roadmap (optional)

If kept on the site, list items such as:

- integration test coverage
- more payment providers
- more shipping providers
- more notification channels
- product images
- search
- tax calculation
- multi-currency
- coupons
- admin dashboard
- generated API clients
- observability
- horizontal scaling

Recommend dating or sequencing the list, or keeping it only in the repo README instead of the public site so it doesn’t age into a stale wishlist.

---

## Cross-page consistency notes

- Every code sample across pages should use real method names exactly as shown in the SDK reference page. Do not paraphrase `rho.cart.addItem` as `rho.cart.add` on one page and use the real name elsewhere.
- The checkout transaction is referenced from Cart & Checkout, Inventory & Discounts, and Orders. Write it out in full once on the Cart & Checkout page and link to it elsewhere instead of re-summarizing it three different ways.
- Security properties such as ownership checks, server-side amount verification, webhook signatures, and stateless logout are spread across the source material. Keep the wording consistent wherever the same concept recurs so it reads as one coherent story.

## Frontend implementation notes

- Use the same docs shell for all pages: header, sidebar, content article, right-side table of contents.
- Treat the landing page as a marketing/product overview, not a literal dump of all docs.
- The API reference page should be mostly lookup-oriented and minimal in narrative text.
- The docs should feel like a product site, not a raw OpenAPI dump.
- Use real SDK method names, not invented aliases.
- Security properties must be repeated with consistent phrasing across pages.
- Every route should correspond to an actual page in the router.

## Recommended route file structure

- `/` → landing
- `/docs/getting-started` → Getting Started
- `/docs/architecture` → Architecture
- `/docs/auth` → Auth
- `/docs/storefront` → Storefront
- `/docs/cart-checkout` → Cart & Checkout
- `/docs/orders` → Orders
- `/docs/payments` → Payments
- `/docs/inventory-discounts` → Inventory & Discounts
- `/docs/addresses-shipping` → Addresses & Shipping
- `/docs/notifications` → Notifications
- `/docs/api-reference` → API Reference
- `/docs/sdk` → SDK
- `/docs/deployment` → Deployment
- `/docs/contributing` → Contributing

This is the exact delivery spec for the frontend implementation.
