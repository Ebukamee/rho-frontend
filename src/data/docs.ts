export type DocTable = {
  headers: string[]
  rows: string[][]
}

export type DocCard = {
  title: string
  text: string
}

export type DocSection = {
  id: string
  title: string
  eyebrow?: string
  body?: string[]
  list?: string[]
  code?: string
  table?: DocTable
  cards?: DocCard[]
  callout?: string
}

export type DocPage = {
  title: string
  eyebrow: string
  summary: string
  sections: DocSection[]
}

const code = (value: string) => value.trim()

export const docsMap: Record<string, DocPage> = {
  '/': {
    title: 'Rho Documentation',
    eyebrow: 'Frontend',
    summary: 'Build a web storefront on top of Rho with a typed TypeScript SDK. Your application owns the interface and customer experience; Rho provides the commerce API.',
    sections: [
      {
        id: 'what-is-rho',
        title: 'What you are building',
        body: [
          'Rho is the commerce backend behind your frontend. A typical application has a product catalogue, product details, cart, checkout, payment return page, account area, and order views.',
          'The frontend does not connect directly to PostgreSQL. It calls the Rho API through @rho-commerce/sdk and renders the returned data.'
        ],
        cards: [
          { title: 'Catalog', text: 'Load products and categories, build product cards, filters, category pages, pagination, and product detail views.' },
          { title: 'Customer account', text: 'Create accounts, sign in, restore sessions, manage profiles, addresses, and notifications.' },
          { title: 'Checkout', text: 'Manage cart state, preview the authoritative total, create the order, initialize payment, and display the result.' },
          { title: 'Operations', text: 'Build admin screens for products, categories, inventory, discounts, users, shipping, and order status.' }
        ]
      },
      {
        id: 'quick-path',
        title: 'The shortest path to a storefront',
        list: [
          'Install @rho-commerce/sdk.',
          'Create one RhoClient instance with your API URL.',
          'Load products and categories for the public storefront.',
          'Authenticate the customer before cart, checkout, account, and payment operations.',
          'Add products to the authenticated cart.',
          'Preview checkout and show the returned subtotal, discount, total, and currency.',
          'Create checkout to create the order from the cart.',
          'Initialize the payment and redirect the customer to the returned authorizationUrl.',
          'When the customer returns, retrieve or verify the payment and render the server-confirmed state.',
          'Load the order from Rho and render its status and item snapshots.'
        ]
      },
      {
        id: 'boundary',
        title: 'Frontend boundary',
        code: code(`Browser
  |
  | @rho-commerce/sdk
  v
Rho API
  |
  +-- PostgreSQL
  +-- Paystack
  +-- Google OAuth`),
        callout: 'The browser may know the Rho API URL. It must not know PostgreSQL credentials, JWT signing secrets, Paystack secret keys, or OAuth client secrets.'
      },
      {
        id: 'pages',
        title: 'Where to go next',
        table: {
          headers: ['Page', 'Use it when you need to'],
          rows: [
            ['Getting Started', 'Install and connect the SDK.'],
            ['Architecture', 'Decide where API state, session state, and UI state live.'],
            ['Auth', 'Implement signup, login, refresh, logout, and account UI.'],
            ['Storefront', 'Build catalogue pages and product browsing.'],
            ['Cart & Checkout', 'Build the purchase flow.'],
            ['Orders', 'Build order detail and status UI.'],
            ['Payments', 'Handle payment initialization, redirect, and verification.'],
            ['Addresses & Shipping', 'Build address-book and fulfillment UI.'],
            ['Notifications', 'Add in-app notifications.'],
            ['SDK', 'Learn the client options, modules, types, and errors.'],
            ['API Reference', 'Use raw HTTP or map SDK calls to endpoints.'],
            ['Deployment', 'Deploy the frontend against a production Rho API.']
          ]
        }
      }
    ]
  },

  '/docs/getting-started': {
    title: 'Getting Started',
    eyebrow: 'Frontend Setup',
    summary: 'Start Rho locally, connect your database and payment provider, then point your frontend at the running API.',
    sections: [
      {
        id: 'clone',
        title: '1. Clone Rho',
        body: [
          'Rho is self-hosted. Start by cloning the Rho repository and running the API yourself. Your frontend will consume the API; it does not connect directly to the database.',
          'The repository is github.com/ebukamee/rho. Clone it wherever you keep your backend projects.'
        ],
        code: code(`git clone https://github.com/ebukamee/rho.git
cd rho`)
      },
      {
        id: 'database',
        title: '2. Create your PostgreSQL database',
        body: [
          'Rho stores products, users, carts, orders, payments, addresses, inventory, discounts, shipping, and notifications in PostgreSQL. Create a database and put its connection string in the environment configuration.'
        ],
        code: code(`# .env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/rho?sslmode=disable`)
      },
      {
        id: 'secrets',
        title: '3. Add Rho secrets',
        body: [
          'Copy .env.example to .env and fill in the values required by your deployment. DATABASE_URL points to PostgreSQL. JWT_SECRET signs authentication tokens. PAYSTACK_SECRET_KEY is used by the server for Paystack operations.',
          'These values belong on the Rho server. Never copy them into your Vue/React/Nuxt/Next environment variables.'
        ],
        code: code(`cp .env.example .env

# .env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/rho?sslmode=disable
JWT_SECRET=replace-with-a-long-random-secret
PAYSTACK_SECRET_KEY=your_paystack_secret_key
CORS_ORIGINS=http://localhost:5173
PORT=8080
ENVIRONMENT=development`)
      },
      {
        id: 'optional-oauth',
        title: '4. Configure Google OAuth when you need it',
        body: ['Google authentication is optional. If your frontend uses Google sign-in, configure the Google client values and callback URL on the Rho server.'],
        code: code(`GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URL=http://localhost:8080/api/v1/auth/google/callback`)
      },
      {
        id: 'migrations',
        title: '5. Run the database migrations',
        body: ['Apply the repository migrations before starting the API. Rho expects its database schema to exist before application requests are served.'],
        code: code(`# Use the migration command documented by the repository/Makefile.
make migrate-up`)
      },
      {
        id: 'run-api',
        title: '6. Start Rho',
        code: code(`make run

# Check the API
curl http://localhost:8080/health
curl http://localhost:8080/ready`)
      },
      {
        id: 'frontend-env',
        title: '7. Point your frontend at Rho',
        body: ['Now create your frontend environment variable. This URL is safe to expose because it identifies the API; it is not a server secret.'],
        code: code(`# Vite
VITE_RHO_API_URL=http://localhost:8080

# Then create the SDK client
import { RhoClient } from '@rho-commerce/sdk'

export const rho = new RhoClient({
  baseURL: import.meta.env.VITE_RHO_API_URL
})`)
      },
      {
        id: 'public-request',
        title: '8. Test the frontend connection',
        body: ['Start with a public storefront request. This proves that the frontend can reach the Rho API before you add authentication or checkout.'],
        code: code(`const result = await rho.storefront.products({
  page: 1,
  limit: 24
})

console.log('products:', result.products)
console.log('pages:', result.totalPages)`)
      },
      {
        id: 'auth',
        title: '9. Add customer authentication',
        body: ['Once the public catalogue works, authenticate a customer and attach the access token to subsequent SDK requests.'],
        code: code(`const auth = await rho.auth.signup({
  email: 'customer@example.com',
  password: 'strong-password',
  firstName: 'Ada',
  lastName: 'Lovelace'
})

rho.setToken(auth.accessToken)

const profile = await rho.auth.getProfile()
console.log(profile.email)`)
      },
      {
        id: 'purchase',
        title: '10. Build the first purchase flow',
        body: ['The normal customer flow is storefront → cart → checkout preview → checkout creation → payment initialization → payment verification → order display.'],
        code: code(`const cart = await rho.cart.addItem({
  productId: 'product-id',
  quantity: 1
})

const preview = await rho.checkout.preview({
  discountCode: 'WELCOME10'
})

console.log(preview.total, preview.currency)

const checkout = await rho.checkout.create({
  discountCode: 'WELCOME10'
})

const payment = await rho.payments.initialize({
  orderId: checkout.orderId,
  provider: 'paystack'
})

window.location.assign(payment.authorizationUrl)`)
      },
      {
        id: 'frontend-checklist',
        title: 'What the frontend owns',
        list: [
          'Rendering catalogue, cart, checkout, account, payment-return, and order screens.',
          'Collecting form input and showing loading, empty, validation, and error states.',
          'Storing the current frontend session according to your application security model.',
          'Calling the SDK and reacting to server responses.',
          'Never exposing DATABASE_URL, JWT_SECRET, PAYSTACK_SECRET_KEY, or Google client secrets.'
        ]
      }
    ]
  },

  '/docs/architecture': {
    title: 'Architecture',
    eyebrow: 'Frontend Architecture',
    summary: 'Keep UI code focused on presentation while Rho remains the source of truth for commerce state.',
    sections: [
      {
        id: 'layers',
        title: 'Recommended layers',
        body: ['A useful frontend split is page → feature/composable → RhoClient → UI. The exact folder names are yours, but keeping API orchestration separate makes commerce flows easier to test and change.'],
        code: code(`// features/cart/useCart.ts
export async function addProduct(productId: string) {
  return rho.cart.addItem({ productId, quantity: 1 })
}

// pages/Product.vue
async function addToCart() {
  cart.value = await addProduct(product.id)
}`),
        cards: [
          { title: 'Pages', text: 'Own route-level composition: catalogue, product detail, checkout, account, and admin screens.' },
          { title: 'Components', text: 'Render reusable pieces such as ProductCard, CartItem, AddressForm, OrderStatus, and PaymentState.' },
          { title: 'Application services', text: 'Centralize RhoClient calls, token refresh, request orchestration, and mapping that is specific to your frontend.' },
          { title: 'State', text: 'Use your preferred state library for session and server-backed data where global access is useful.' }
        ]
      },
      {
        id: 'server-state',
        title: 'Server state vs UI state',
        table: {
          headers: ['State', 'Examples', 'Owner'],
          rows: [
            ['Server state', 'Products, cart, orders, addresses, notifications, payments', 'Rho API'],
            ['Session state', 'Access token, current user', 'Frontend + Rho auth contract'],
            ['UI state', 'Modal open, selected tab, loading indicator', 'Frontend'],
            ['Form state', 'Unsaved address fields, coupon input', 'Frontend until submitted']
          ]
        }
      },
      {
        id: 'authoritative-data',
        title: 'Do not duplicate business rules',
        body: [
          'The browser can calculate a display subtotal for responsiveness, but the checkout preview and checkout response are authoritative for the amount that should be displayed as payable.',
          'The same rule applies to stock and payment. A product appearing in the catalogue does not guarantee stock at checkout, and returning from a payment provider does not by itself prove that the payment succeeded.'
        ],
        callout: 'Use optimistic UI for interaction speed, then reconcile with Rho whenever the operation affects money, inventory, authentication, or order state.'
      },
      {
        id: 'request-service',
        title: 'Keep API calls out of large components',
        body: ['For a small application, calling rho directly from a component is fine. As the application grows, move orchestration into a service/composable/hook so pages do not contain endpoint-level details.'],
        code: code(`// api/rho.ts
export const rho = new RhoClient({
  baseURL: import.meta.env.VITE_RHO_API_URL
})

// features/storefront/useProducts.ts
export async function loadProducts(page = 1) {
  return rho.storefront.products({ page, limit: 24 })
}`)
      },
      {
        id: 'project-shape',
        title: 'Example frontend structure',
        code: code(`src/
  api/
    rho.ts
  features/
    auth/
    storefront/
    cart/
    checkout/
    orders/
    payments/
    account/
  components/
    ProductCard.vue
    CartDrawer.vue
    AddressForm.vue
  pages/
    Home.vue
    Product.vue
    Checkout.vue
    Account.vue
  router/
  stores/`)
      }
    ]
  },

  '/docs/auth': {
    title: 'Authentication',
    eyebrow: 'Customer Accounts',
    summary: 'Implement customer signup, login, token lifecycle, profile management, password changes, and protected UI.',
    sections: [
      {
        id: 'signup',
        title: 'Sign up',
        body: ['Signup requires email, password, firstName, and lastName.'],
        code: code(`const result = await rho.auth.signup({
  email: 'customer@example.com',
  password: 'strong-password',
  firstName: 'Ada',
  lastName: 'Lovelace'
})

rho.setToken(result.accessToken)`)
      },
      {
        id: 'login',
        title: 'Log in',
        code: code(`const result = await rho.auth.login({
  email: 'customer@example.com',
  password: 'strong-password'
})

rho.setToken(result.accessToken)
const user = result.user`)
      },
      {
        id: 'tokens',
        title: 'Access and refresh tokens',
        body: ['The access token is used in the Authorization header by the SDK. The refresh token is used with auth.refresh() to obtain a new AuthResponse. Decide how your application persists session credentials based on your security requirements.'],
        code: code(`const refreshed = await rho.auth.refresh({
  refreshToken
})

rho.setToken(refreshed.accessToken)`)
      },
      {
        id: 'profile',
        title: 'Profile',
        code: code(`const user = await rho.auth.getProfile()

const updated = await rho.auth.updateProfile({
  firstName: 'Augusta',
  lastName: 'King'
})`)
      },
      {
        id: 'password',
        title: 'Change password',
        code: code(`await rho.auth.changePassword({
  currentPassword: 'old-password',
  newPassword: 'new-password'
})`)
      },
      {
        id: 'google',
        title: 'Google login',
        body: ['googleLogin() returns the login URL exposed by the Rho API. Redirect the browser to that URL.'],
        code: code(`const result = await rho.auth.googleLogin()
window.location.assign(result.url)`)
      },
      {
        id: 'route-guards',
        title: 'Protect frontend routes',
        body: ['A frontend route guard is a UX feature, not an authorization mechanism. The API still decides whether a protected request is allowed.'],
        code: code(`// Vue Router example
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  try {
    await rho.auth.getProfile()
    return true
  } catch {
    return { path: '/login' }
  }
})`)
      },
      {
        id: 'logout',
        title: 'Logout',
        body: ['Call logout according to the API contract, then clear the client token and your local user/session state. The current authentication model is stateless JWT authentication, so the frontend must clear its credentials.'],
        code: code(`await rho.auth.logout()
rho.clearToken()
// clear your user/session store here`)
      },
      {
        id: 'errors',
        title: 'Authentication error handling',
        table: {
          headers: ['Status', 'What the UI should do'],
          rows: [
            ['401', 'Refresh according to your session strategy or send the user to login.'],
            ['403', 'Show that the authenticated user is not authorized for the operation.'],
            ['400/422', 'Show validation or credential errors near the relevant form.'],
            ['Network error', 'Preserve form state and offer retry.']
          ]
        }
      }
    ]
  },

  '/docs/storefront': {
    title: 'Storefront',
    eyebrow: 'Catalog UI',
    summary: 'Build catalogue pages from Rho products and categories, with pagination, category filtering, and proper loading states.',
    sections: [
      {
        id: 'products',
        title: 'Products',
        code: code(`const result = await rho.storefront.products({
  page: 1,
  limit: 24
})

// result.products
// result.total
// result.page
// result.limit
// result.totalPages`)
      },
      {
        id: 'categories',
        title: 'Categories',
        code: code(`const result = await rho.storefront.categories({
  page: 1,
  limit: 20
})`)
      },
      {
        id: 'filter',
        title: 'Filter by category',
        body: ['Use categoryId in the SDK. The client converts it to category_id in the HTTP query string.'],
        code: code(`const result = await rho.storefront.products({
  page: 1,
  limit: 24,
  categoryId: selectedCategoryId
})`)
      },
      {
        id: 'pagination',
        title: 'Pagination',
        body: ['The response gives you totalPages, so your UI can disable next/previous buttons without guessing from the returned array length.'],
        code: code(`const previousDisabled = result.page <= 1
const nextDisabled = result.page >= result.totalPages

async function nextPage() {
  if (!nextDisabled) {
    await loadProducts(result.page + 1)
  }
}`)
      },
      {
        id: 'product-fields',
        title: 'Product data',
        table: {
          headers: ['Field', 'Frontend use'],
          rows: [
            ['id', 'Stable React/Vue key and product identifier.'],
            ['categoryId', 'Associate the product with a category.'],
            ['name', 'Product title.'],
            ['slug', 'Human-readable route segment.'],
            ['description', 'Product detail content.'],
            ['sku', 'Display or internal catalogue reference.'],
            ['price', 'Product price returned by Rho.'],
            ['currency', 'Currency used when formatting price.'],
            ['imageUrl', 'Product image.'],
            ['active', 'Whether the product is active in the catalogue.']
          ]
        }
      },
      {
        id: 'price',
        title: 'Format prices',
        body: ['Use the product currency rather than hardcoding a currency symbol.'],
        code: code(`function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency
  }).format(price)
}`)
      },
      {
        id: 'states',
        title: 'Loading, empty, and error states',
        body: ['Treat request state as part of the component contract. A catalogue should have distinct loading, empty, and failure UI rather than rendering a blank page for all three cases.'],
        code: code(`const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    products.value = (await rho.storefront.products({ page: 1, limit: 24 })).products
  } catch {
    error.value = 'Could not load products.'
  } finally {
    loading.value = false
  }
}`),
        cards: [
          { title: 'Loading', text: 'Use skeleton cards or a loading indicator while the initial catalogue request is pending.' },
          { title: 'Empty', text: 'Show a useful empty state when a category contains no products.' },
          { title: 'Error', text: 'Show a retry action and avoid exposing raw API response bodies to customers.' },
          { title: 'Changing filters', text: 'Disable or cancel stale requests so an older response cannot replace a newer filter selection.' }
        ]
      },
      {
        id: 'detail',
        title: 'Product detail pages',
        body: ['The Product model includes slug for human-readable URLs, while the SDK product lookup uses an ID. If your route is slug-based, your frontend needs a strategy for resolving that slug to the product record. Do not invent a slug lookup method that the current SDK does not expose.']
      }
    ]
  },

  '/docs/cart-checkout': {
    title: 'Cart & Checkout',
    eyebrow: 'Purchase Flow',
    summary: 'Build an authenticated cart and turn it into an authoritative order through checkout.',
    sections: [
      {
        id: 'auth',
        title: 'The cart is authenticated',
        body: ['Cart endpoints require authentication. Set the access token before calling cart methods.'],
        code: code(`rho.setToken(accessToken)

const cart = await rho.cart.get()`)
      },
      {
        id: 'read',
        title: 'Read the cart',
        code: code(`const cart = await rho.cart.get()

for (const item of cart.items) {
  console.log(item.productId, item.quantity)
}`)
      },
      {
        id: 'add',
        title: 'Add an item',
        code: code(`const cart = await rho.cart.addItem({
  productId,
  quantity: 1
})`)
      },
      {
        id: 'update',
        title: 'Update quantity',
        code: code(`await rho.cart.updateItem(itemId, {
  quantity: 3
})`)
      },
      {
        id: 'remove',
        title: 'Remove and clear',
        code: code(`await rho.cart.removeItem(itemId)

await rho.cart.clear()`)
      },
      {
        id: 'checkout-preview',
        title: 'Preview checkout',
        body: ['Preview is useful before the final confirmation step. The current CheckoutRequest only contains an optional discountCode.'],
        code: code(`const preview = await rho.checkout.preview({
  discountCode: couponCode || undefined
})

console.log(preview.subtotal)
console.log(preview.discount)
console.log(preview.total)
console.log(preview.currency)`)
      },
      {
        id: 'checkout-create',
        title: 'Create checkout',
        body: ['checkout.create creates the order from the authenticated cart and returns the created order ID plus the authoritative totals. Do not build a customer checkout by calling the admin-only orders.create() method.'],
        code: code(`const checkout = await rho.checkout.create({
  discountCode: couponCode || undefined
})

const orderId = checkout.orderId`),
        callout: 'The checkout request does not currently accept an addressId. Address selection can be handled in your frontend account/checkout UI, but do not send unsupported fields to checkout.'
      },
      {
        id: 'checkout-ui',
        title: 'Recommended checkout UI',
        code: code(`const preview = await rho.checkout.preview({
  discountCode: couponCode || undefined
})

checkoutTotal.value = preview.total
checkoutCurrency.value = preview.currency`),
        list: [
          'Show cart items and quantities.',
          'Collect/select the delivery address using the addresses API.',
          'Allow the customer to enter a discount code.',
          'Call checkout.preview() when the discount code or cart changes enough to require a fresh total.',
          'Show subtotal, discount, total, and currency from the preview response.',
          'On final confirmation, call checkout.create().',
          'Use the returned orderId to initialize payment.',
          'Disable duplicate submission while checkout.create() is pending.'
        ]
      },
      {
        id: 'failure',
        title: 'Checkout failure handling',
        code: code(`try {
  await rho.checkout.create({
    discountCode: couponCode || undefined
  })
} catch (error) {
  if (error instanceof RhoApiError && error.status === 409) {
    await rho.cart.get()
    // Tell the customer availability changed.
  }
}`),
        table: {
          headers: ['Failure', 'Frontend response'],
          rows: [
            ['Expired session', 'Refresh or re-authenticate, then reload cart state.'],
            ['Invalid discount', 'Show the API error and remove/re-enter the code.'],
            ['Inventory changed', 'Explain that availability changed and refresh the cart.'],
            ['Network failure', 'Do not assume an order was not created; reload order/cart state before blindly retrying.']
          ]
        }
      }
    ]
  },

  '/docs/orders': {
    title: 'Orders',
    eyebrow: 'Order UI',
    summary: 'Use the order returned by checkout to build confirmation, detail, status, and admin order-management screens.',
    sections: [
      {
        id: 'create-customer',
        title: '1. Create an order through checkout',
        body: ['Customer frontends normally do not call orders.create(). checkout.create() turns the authenticated cart into an order and returns its orderId.'],
        code: code(`const checkout = await rho.checkout.create({
  discountCode: couponCode || undefined
})

const orderId = checkout.orderId
console.log('created order:', orderId)`)
      },
      {
        id: 'create-admin',
        title: '2. Create an order directly as an admin',
        body: ['The SDK also exposes orders.create(). This is an admin operation because the request contains the complete order data. It is not the normal customer checkout path.'],
        code: code(`const order = await rho.orders.create({
  userId: customerId,
  subtotal: 50000,
  discount: 5000,
  total: 45000,
  currency: 'NGN',
  items: [
    {
      id: 'item-1',
      orderId: 'order-1',
      productId: 'product-1',
      name: 'Example Product',
      sku: 'SKU-001',
      quantity: 2,
      unitPrice: 25000,
      totalPrice: 50000
    }
  ]
})`),
        callout: 'Do not expose this form in a customer storefront. The API must enforce the admin permission even if the frontend hides the screen.'
      },
      {
        id: 'get',
        title: '3. Get an order',
        body: ['Use orders.get(id) for the confirmation page, order detail page, or an admin order detail screen. Customers can retrieve their own orders; admins can retrieve orders according to their permissions.'],
        code: code(`const order = await rho.orders.get(orderId)

console.log(order.id)
console.log(order.status)
console.log(order.total, order.currency)
console.log(order.items)`)
      },
      {
        id: 'confirmation',
        title: '4. Build an order confirmation page',
        code: code(`const order = await rho.orders.get(orderId)

const heading = order.status === 'paid'
  ? 'Payment confirmed'
  : 'Order received'

return {
  heading,
  orderNumber: order.id,
  total: order.total,
  currency: order.currency,
  itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0)
}`)
      },
      {
        id: 'items',
        title: '5. Render each order item',
        body: ['Order items contain historical product information. Use the item name, SKU, quantity, unit price, and total price from the order instead of assuming the current product record still has the same values.'],
        code: code(`for (const item of order.items) {
  console.log({
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    total: item.totalPrice
  })
}`)
      },
      {
        id: 'status-display',
        title: '6. Render every order status',
        table: {
          headers: ['Status', 'Frontend meaning'],
          rows: [
            ['pending', 'Order exists but payment has not reached paid state.'],
            ['paid', 'Payment has succeeded.'],
            ['processing', 'The store is processing the order.'],
            ['shipped', 'The order has been shipped.'],
            ['delivered', 'The order has been delivered.'],
            ['cancelled', 'The order has been cancelled.']
          ]
        },
        code: code(`function orderLabel(status: OrderStatus) {
  switch (status) {
    case 'pending': return 'Awaiting payment'
    case 'paid': return 'Paid'
    case 'processing': return 'Processing'
    case 'shipped': return 'Shipped'
    case 'delivered': return 'Delivered'
    case 'cancelled': return 'Cancelled'
  }
}`)
      },
      {
        id: 'update-status',
        title: '7. Update an order status as an admin',
        body: ['Admin dashboards can move an order through the operational statuses. Customer-facing applications should display the status but not expose this mutation.'],
        code: code(`await rho.orders.updateStatus(orderId, {
  status: 'processing'
})

const refreshed = await rho.orders.get(orderId)
console.log(refreshed.status)`)
      },
      {
        id: 'history',
        title: '8. Order history',
        body: ['The current SDK exposes orders.get(id), orders.create(), and orders.updateStatus(), but it does not expose orders.list(). Therefore an account page cannot call rho.orders.list() in the current SDK. If you need a customer order-history screen, the API/SDK needs an order-list capability first.'],
        code: code(`// Current SDK: this does NOT exist
// await rho.orders.list()

// Existing method:
const order = await rho.orders.get(orderId)`)
      }
    ]
  },

  '/docs/payments': {
    title: 'Payments',
    eyebrow: 'Payment UI',
    summary: 'Connect a Rho order to a payment provider and build a safe payment-return experience.',
    sections: [
      {
        id: 'initialize',
        title: 'Initialize payment',
        body: ['The current SDK request contains orderId and provider. For the current Paystack integration, use provider: "paystack".'],
        code: code(`const payment = await rho.payments.initialize({
  orderId,
  provider: 'paystack'
})

window.location.assign(payment.authorizationUrl)`)
      },
      {
        id: 'response',
        title: 'Initialization response',
        table: {
          headers: ['Field', 'Use'],
          rows: [
            ['paymentId', 'Rho payment identifier for later reads/verification.'],
            ['provider', 'Payment provider used by the payment record.'],
            ['providerRef', 'Provider-side reference.'],
            ['authorizationUrl', 'URL where the customer authorizes payment.']
          ]
        }
      },
      {
        id: 'return',
        title: 'Build the payment return page',
        body: ['The return page should not blindly show “Payment successful” because the browser reached the route. Retrieve/verify the Rho payment record and render the resulting status.'],
        code: code(`const payment = await rho.payments.verify(paymentId)

switch (payment.status) {
  case 'succeeded':
    // show confirmed payment
    break
  case 'failed':
    // show retry/payment failure
    break
  default:
    // show pending state
}`)
      },
      {
        id: 'states',
        title: 'Payment states',
        table: {
          headers: ['Status', 'UI treatment'],
          rows: [
            ['pending', 'Payment has not reached a confirmed success state.'],
            ['succeeded', 'Show the confirmed paid state.'],
            ['failed', 'Show failure and provide another payment attempt when appropriate.'],
            ['refunded', 'Show that the payment was refunded.']
          ]
        }
      },
      {
        id: 'get',
        title: 'Get a payment',
        code: code(`const payment = await rho.payments.get(paymentId)
console.log(payment.status)`)
      },
      {
        id: 'secrets',
        title: 'Payment security',
        list: [
          'Never place the Paystack secret key in frontend code.',
          'Only use the authorizationUrl returned by Rho for the browser redirect.',
          'Treat Rho payment state as authoritative.',
          'Do not calculate a payment amount in the browser and send it as the amount to charge.',
          'Keep payment return handling idempotent because users can refresh or revisit the return page.'
        ],
        callout: 'The browser initiates the payment flow. Provider verification and webhook processing remain server-side responsibilities.'
      }
    ]
  },

  '/docs/inventory-discounts': {
    title: 'Inventory & Discounts',
    eyebrow: 'Store Operations',
    summary: 'Build customer discount inputs and admin inventory/discount interfaces using the SDK contracts.',
    sections: [
      {
        id: 'inventory',
        title: 'Inventory is server-owned',
        body: ['Customer UIs should not mutate inventory. Product availability can change between page load and checkout, so the frontend should treat checkout as the point where availability is confirmed.']
      },
      {
        id: 'inventory-read',
        title: 'Admin: inspect inventory',
        code: code(`const inventory = await rho.inventory.getByProduct(productId)

console.log(inventory.quantity)
console.log(inventory.reserved)
console.log(inventory.available)`)
      },
      {
        id: 'inventory-adjust',
        title: 'Admin: adjust inventory',
        code: code(`await rho.inventory.adjust(productId, {
  quantity: 10
})`)
      },
      {
        id: 'discount-apply',
        title: 'Apply a discount code',
        body: ['The apply endpoint takes both the coupon code and the total you want the discount evaluated against. The result contains the original total, discount, and final total.'],
        code: code(`const result = await rho.discounts.apply({
  code: couponCode,
  total: cartTotal
})

console.log(result.discount)
console.log(result.finalTotal)`)
      },
      {
        id: 'discount-types',
        title: 'Discount model',
        table: {
          headers: ['Field', 'Meaning'],
          rows: [
            ['code', 'Customer-facing discount code.'],
            ['type', 'percentage or fixed.'],
            ['value', 'Discount value according to type.'],
            ['minimumOrder', 'Minimum order total required.'],
            ['usageLimit', 'Optional maximum usage.'],
            ['usageCount', 'Current usage count.'],
            ['startsAt / expiresAt', 'Optional validity window.'],
            ['active', 'Whether the discount is active.']
          ]
        }
      },
      {
        id: 'admin-boundary',
        title: 'Admin operations',
        body: ['Inventory mutation and discount management are admin concerns. Build them into an authenticated admin application and still rely on the API for authorization. Do not treat hiding an admin button as security.']
      },
      {
        id: 'checkout-total',
        title: 'Discounts and checkout',
        body: ['A discount preview is useful for immediate feedback, but checkout.preview() and checkout.create() remain the important purchase-flow operations. The frontend should display the totals returned by those operations rather than assuming its own coupon calculation is final.']
      }
    ]
  },

  '/docs/addresses-shipping': {
    title: 'Addresses & Shipping',
    eyebrow: 'Account & Fulfillment',
    summary: 'Build address-book screens and display shipping information associated with an order.',
    sections: [
      {
        id: 'list',
        title: 'List addresses',
        code: code(`const result = await rho.addresses.list()

const addresses = result.addresses
const defaultAddress = addresses.find(address => address.isDefault)`)
      },
      {
        id: 'create',
        title: 'Create an address',
        body: ['The SDK uses line1 and line2 for street address fields and countryCode for the two-letter country code. isDefault is optional.'],
        code: code(`const address = await rho.addresses.create({
  label: 'Home',
  firstName: 'Ada',
  lastName: 'Lovelace',
  phone: '+2348000000000',
  line1: '1 Example Street',
  city: 'Lagos',
  state: 'Lagos',
  postalCode: '100001',
  countryCode: 'NG',
  isDefault: true
})`)
      },
      {
        id: 'update',
        title: 'Update and set default',
        code: code(`await rho.addresses.update(addressId, {
  line1: '2 Example Street'
})

await rho.addresses.setDefault(addressId)`)
      },
      {
        id: 'delete',
        title: 'Delete an address',
        code: 'await rho.addresses.delete(addressId)'
      },
      {
        id: 'form',
        title: 'Address form UX',
        list: [
          'Keep unsaved form values in local component/form state.',
          'Validate obvious required fields locally for good UX.',
          'Still handle server-side validation errors.',
          'Make the current default address obvious.',
          'Confirm destructive deletion where appropriate.',
          'Disable submit while the request is pending to avoid duplicate submissions.'
        ]
      },
      {
        id: 'shipping',
        title: 'Display shipping',
        code: code(`const shipping = await rho.shipping.getByOrder(orderId)

console.log(shipping.carrier)
console.log(shipping.service)
console.log(shipping.trackingNumber)
console.log(shipping.status)
console.log(shipping.estimatedDays)`)
      },
      {
        id: 'shipping-status',
        title: 'Shipping statuses',
        table: {
          headers: ['Status', 'UI meaning'],
          rows: [
            ['pending', 'Shipping has not started.'],
            ['processing', 'Shipment is being prepared.'],
            ['shipped', 'Shipment is in transit.'],
            ['delivered', 'Shipment has been delivered.'],
            ['cancelled', 'Shipment was cancelled.']
          ]
        }
      }
    ]
  },

  '/docs/notifications': {
    title: 'Notifications',
    eyebrow: 'Customer Experience',
    summary: 'Add an in-app notification list and read state to the customer account area.',
    sections: [
      {
        id: 'list',
        title: 'Load notifications',
        code: code(`const result = await rho.notifications.list()

const notifications = result.notifications
const unreadCount = notifications.filter(n => !n.readAt).length`)
      },
      {
        id: 'read',
        title: 'Mark a notification as read',
        code: 'await rho.notifications.markRead(notificationId)'
      },
      {
        id: 'model',
        title: 'Notification fields',
        table: {
          headers: ['Field', 'Use'],
          rows: [
            ['id', 'Stable notification identifier.'],
            ['type', 'Application-specific notification type.'],
            ['title', 'Notification heading.'],
            ['message', 'Notification content.'],
            ['readAt', 'Absent/unset when unread; present when read.'],
            ['createdAt', 'Creation timestamp.']
          ]
        }
      },
      {
        id: 'ui',
        title: 'Notification UI',
        code: code(`const unread = notifications.filter(n => !n.readAt)

async function openNotification(id: string) {
  await rho.notifications.markRead(id)
  await reloadNotifications()
}`),
        cards: [
          { title: 'Unread count', text: 'Derive the count from readAt instead of maintaining an independent counter that can become stale.' },
          { title: 'Read action', text: 'Mark the notification as read after the user opens it or uses an explicit read action.' },
          { title: 'Refresh', text: 'Refresh when opening the notification panel or according to the polling strategy of your application.' },
          { title: 'Empty state', text: 'Tell the user there are no notifications rather than treating an empty list as an error.' }
        ]
      },
      {
        id: 'scope',
        title: 'Current capability',
        body: ['The current notification SDK exposes list and markRead. The frontend should not imply that Rho automatically creates notification records for every commerce event unless the deployed backend actually does so.']
      }
    ]
  },

  '/docs/api-reference': {
    title: 'API Reference',
    eyebrow: 'HTTP Map',
    summary: 'Use this map when you need to understand which HTTP operation sits behind an SDK method.',
    sections: [
      {
        id: 'public',
        title: 'Public catalogue',
        table: {
          headers: ['SDK', 'HTTP'],
          rows: [
            ['rho.storefront.products()', 'GET /api/v1/storefront/products'],
            ['rho.storefront.categories()', 'GET /api/v1/storefront/categories'],
            ['rho.products.list()', 'GET /api/v1/products'],
            ['rho.products.get(id)', 'GET /api/v1/products/:id'],
            ['rho.categories.list()', 'GET /api/v1/categories'],
            ['rho.categories.get(id)', 'GET /api/v1/categories/:id']
          ]
        }
      },
      {
        id: 'auth',
        title: 'Authentication',
        table: {
          headers: ['SDK', 'HTTP'],
          rows: [
            ['rho.auth.signup()', 'POST /api/v1/auth/signup'],
            ['rho.auth.login()', 'POST /api/v1/auth/login'],
            ['rho.auth.refresh()', 'POST /api/v1/auth/refresh'],
            ['rho.auth.logout()', 'POST /api/v1/auth/logout'],
            ['rho.auth.getProfile()', 'GET /api/v1/auth/me'],
            ['rho.auth.updateProfile()', 'PUT /api/v1/auth/profile'],
            ['rho.auth.changePassword()', 'PUT /api/v1/auth/password'],
            ['rho.auth.googleLogin()', 'GET /api/v1/auth/google/login']
          ]
        }
      },
      {
        id: 'commerce',
        title: 'Cart, checkout, orders, payments',
        table: {
          headers: ['SDK', 'HTTP'],
          rows: [
            ['rho.cart.get()', 'GET /api/v1/cart'],
            ['rho.cart.addItem()', 'POST /api/v1/cart/items'],
            ['rho.cart.updateItem()', 'PUT /api/v1/cart/items/:itemID'],
            ['rho.cart.removeItem()', 'DELETE /api/v1/cart/items/:itemID'],
            ['rho.cart.clear()', 'DELETE /api/v1/cart'],
            ['rho.checkout.preview()', 'POST /api/v1/checkout/preview'],
            ['rho.checkout.create()', 'POST /api/v1/checkout'],
            ['rho.orders.get(id)', 'GET /api/v1/orders/:id'],
            ['rho.payments.initialize()', 'POST /api/v1/payments/initialize'],
            ['rho.payments.get(id)', 'GET /api/v1/payments/:id'],
            ['rho.payments.verify(id)', 'POST /api/v1/payments/:id/verify']
          ]
        }
      },
      {
        id: 'account',
        title: 'Addresses, shipping, notifications',
        table: {
          headers: ['SDK', 'HTTP'],
          rows: [
            ['rho.addresses.list()', 'GET /api/v1/addresses'],
            ['rho.addresses.get(id)', 'GET /api/v1/addresses/:id'],
            ['rho.addresses.create()', 'POST /api/v1/addresses'],
            ['rho.addresses.update(id)', 'PUT /api/v1/addresses/:id'],
            ['rho.addresses.setDefault(id)', 'PUT /api/v1/addresses/:id/default'],
            ['rho.addresses.delete(id)', 'DELETE /api/v1/addresses/:id'],
            ['rho.shipping.get(id)', 'GET /api/v1/shipping/:id'],
            ['rho.shipping.getByOrder(id)', 'GET /api/v1/shipping/order/:order_id'],
            ['rho.notifications.list()', 'GET /api/v1/notifications'],
            ['rho.notifications.markRead(id)', 'PUT /api/v1/notifications/:id/read']
          ]
        }
      },
      {
        id: 'admin',
        title: 'Admin modules',
        body: ['The SDK also exposes products, categories, inventory, discounts, users, shipping creation/update/delete, and order status mutation. Those methods should only be reachable from an admin UI and still rely on API authorization.'],
        code: code(`const products = await rho.products.adminList({
  page: 1,
  limit: 20,
  active: false
})

const users = await rho.users.list({ page: 1, limit: 20 })`)
      },
      {
        id: 'errors',
        title: 'SDK HTTP errors',
        body: ['Use the error status to choose the frontend response. Keep raw server details out of customer-facing messages unless they are intentionally safe to display.'],
        code: code(`import { RhoApiError } from '@rho-commerce/sdk'

try {
  await rho.cart.get()
} catch (error) {
  if (error instanceof RhoApiError) {
    console.log(error.status)
    console.log(error.body)
  }
}`)
      }
    ]
  },

  '/docs/sdk': {
    title: 'TypeScript SDK',
    eyebrow: '@rho-commerce/sdk',
    summary: 'The SDK is the main frontend integration layer for Rho. It provides typed domain methods, token handling, query conversion, and normalized API errors.',
    sections: [
      {
        id: 'install',
        title: 'Install',
        code: 'npm install @rho-commerce/sdk'
      },
      {
        id: 'init',
        title: 'Initialize',
        code: code(`import { RhoClient } from '@rho-commerce/sdk'

const rho = new RhoClient({
  baseURL: 'https://api.example.com'
})`)
      },
      {
        id: 'options',
        title: 'Client options',
        table: {
          headers: ['Option', 'Type', 'Purpose'],
          rows: [
            ['baseURL', 'string', 'Rho API base URL.'],
            ['token', 'string | undefined', 'Optional initial access token.'],
            ['fetch', 'typeof fetch | undefined', 'Optional custom fetch implementation.'],
            ['headers', 'Record<string, string> | undefined', 'Additional default headers.']
          ]
        }
      },
      {
        id: 'token',
        title: 'Token management',
        code: code(`const rho = new RhoClient({
  baseURL: apiUrl,
  token: accessToken
})

rho.setToken(nextAccessToken)
rho.clearToken()`)
      },
      {
        id: 'modules',
        title: 'Client modules',
        table: {
          headers: ['Module', 'Methods'],
          rows: [
            ['auth', 'signup, login, refresh, logout, getProfile, updateProfile, changePassword, googleLogin'],
            ['storefront', 'products, categories'],
            ['products', 'list, adminList, get, create, update, delete'],
            ['categories', 'list, adminList, get, create, update, delete'],
            ['cart', 'get, addItem, updateItem, removeItem, clear'],
            ['checkout', 'preview, create'],
            ['orders', 'create, get, updateStatus'],
            ['payments', 'initialize, get, verify'],
            ['inventory', 'create, get, getByProduct, update, adjust, delete'],
            ['discounts', 'apply, create, get, update, delete'],
            ['addresses', 'list, get, create, update, setDefault, delete'],
            ['shipping', 'create, get, getByOrder, update, delete'],
            ['notifications', 'list, markRead'],
            ['users', 'list, get, update, delete, updateRole']
          ]
        }
      },
      {
        id: 'conversion',
        title: 'CamelCase in the frontend',
        body: ['The client recursively converts request bodies and query parameters from camelCase to snake_case before sending them. It recursively converts JSON responses back to camelCase.'],
        code: code(`await rho.storefront.products({
  categoryId: 'category-123'
})

// HTTP query contains category_id.
// Frontend response fields use categoryId, createdAt, etc.`)
      },
      {
        id: 'auth-example',
        title: 'Typed authentication flow',
        code: code(`const auth = await rho.auth.login({
  email: 'customer@example.com',
  password: 'strong-password'
})

rho.setToken(auth.accessToken)

const profile = await rho.auth.getProfile()`)
      },
      {
        id: 'storefront-example',
        title: 'Typed storefront flow',
        code: code(`const result = await rho.storefront.products({
  page: 1,
  limit: 24,
  categoryId: categoryId || undefined
})

result.products.forEach(product => {
  console.log(product.name, product.price, product.currency)
})`)
      },
      {
        id: 'checkout-example',
        title: 'Typed checkout flow',
        code: code(`const preview = await rho.checkout.preview({
  discountCode: couponCode || undefined
})

const checkout = await rho.checkout.create({
  discountCode: couponCode || undefined
})

const payment = await rho.payments.initialize({
  orderId: checkout.orderId,
  provider: 'paystack'
})`)
      },
      {
        id: 'errors',
        title: 'Handle RhoApiError',
        code: code(`import { RhoApiError } from '@rho-commerce/sdk'

try {
  await rho.auth.getProfile()
} catch (error) {
  if (error instanceof RhoApiError) {
    if (error.status === 401) {
      // refresh or redirect to login
    }
  }
}`)
      },
      {
        id: 'types',
        title: 'Use exported types',
        code: code(`import type {
  Product,
  Cart,
  Order,
  Payment,
  Address,
  User
} from '@rho-commerce/sdk'`)
      },
      {
        id: 'raw-http',
        title: 'Raw HTTP when the SDK does not expose a method',
        body: ['The SDK is a convenience client, not a requirement. If your frontend needs an endpoint that the current SDK does not expose, use fetch in a dedicated API/service layer. Do not scatter raw endpoint strings through components.']
      },
      {
        id: 'security',
        title: 'What the SDK does not do',
        list: [
          'It does not make server secrets safe to expose.',
          'It does not replace frontend state management.',
          'It does not provide authorization for admin UI.',
          'It does not make client-side totals authoritative.',
          'It does not automatically create notifications for commerce events.',
          'It does not provide an orders.list() method in the current version.'
        ]
      }
    ]
  },

  '/docs/deployment': {
    title: 'Deployment',
    eyebrow: 'Frontend Deployment',
    summary: 'Deploy the frontend separately and configure it to call your public HTTPS Rho API.',
    sections: [
      {
        id: 'shape',
        title: 'Production shape',
        code: code(`Customer browser
      |
      | HTTPS
      v
Frontend hosting
      |
      | HTTPS API calls
      v
Rho API
      |
      v
PostgreSQL`)
      },
      {
        id: 'environment',
        title: 'Production API URL',
        body: ['Configure the public Rho API URL in the hosting platform. For a Vite build, this becomes part of the generated browser bundle, which is fine because the URL is not a secret.'],
        code: 'VITE_RHO_API_URL=https://api.example.com'
      },
      {
        id: 'cors',
        title: 'CORS',
        body: ['Your deployed Rho API must allow requests from the origin where the frontend is hosted. Configure this on the API side; adding an origin to the frontend cannot bypass a server CORS policy.']
      },
      {
        id: 'secrets',
        title: 'Never ship server secrets',
        table: {
          headers: ['Value', 'Browser?'],
          rows: [
            ['Rho API base URL', 'Yes'],
            ['DATABASE_URL', 'No'],
            ['JWT signing secret', 'No'],
            ['Paystack secret key', 'No'],
            ['OAuth client secret', 'No']
          ]
        }
      },
      {
        id: 'payment-return',
        title: 'Payment return URL',
        body: ['Make sure the frontend route used after payment exists in the deployed application and that your payment flow knows how to associate the return with the relevant Rho payment/order state. Do not trust arbitrary query parameters as proof of payment.'],
        code: code(`// Example route: /payment/return?paymentId=...
const paymentId = new URLSearchParams(location.search).get('paymentId')

if (!paymentId) {
  throw new Error('Missing payment reference')
}

const payment = await rho.payments.get(paymentId)`)
      },
      {
        id: 'deployment-checklist',
        title: 'Deployment checklist',
        list: [
          'Production Rho API URL configured.',
          'Frontend origin allowed by API CORS configuration.',
          'HTTPS enabled.',
          'No server secrets in the client bundle.',
          'Authentication failure states work in production.',
          'Payment return route is deployed.',
          '404 routing is configured for your SPA framework/host.',
          'API failures have useful customer-facing error states.'
        ]
      }
    ]
  },

  '/docs/contributing': {
    title: 'Contributing',
    eyebrow: 'Frontend Docs',
    summary: 'Contribute to the Vue documentation application while keeping examples aligned with the real Rho SDK.',
    sections: [
      {
        id: 'project',
        title: 'Project structure',
        code: code(`src/
  data/docs.ts       # documentation content
  pages/             # route-level Vue pages
  components/        # reusable UI
  router.ts          # documentation routes
  App.vue            # navigation and site shell
  style.css          # global CSS`)
      },
      {
        id: 'content',
        title: 'Where documentation content lives',
        body: ['The current site uses structured data in src/data/docs.ts and a shared DocsPage renderer. Route-specific page components simply select the corresponding documentation page.'],
        callout: 'Update the documentation data for content changes. Do not duplicate an entire documentation page in a route component unless the page genuinely needs custom UI.'
      },
      {
        id: 'accuracy',
        title: 'Verify examples against the SDK',
        list: [
          'Check the actual module method name.',
          'Check the request type before adding a payload field.',
          'Check the response type before documenting a returned property.',
          'Check whether the endpoint requires authentication.',
          'Do not invent list methods that the SDK does not expose.',
          'Do not silently substitute common fields from another commerce API.',
          'If a capability is missing, document that limitation clearly.'
        ]
      },
      {
        id: 'local',
        title: 'Run locally',
        code: code(`npm install
npm run dev`)
      },
      {
        id: 'build',
        title: 'Build before submitting',
        code: 'npm run build'
      },
      {
        id: 'content-rules',
        title: 'Frontend documentation rules',
        body: [
          'Prefer examples that solve an actual frontend task: rendering a list, submitting a form, managing session state, handling an error, or moving through checkout.',
          'Explain what belongs in the browser and what remains server-owned.',
          'Keep code examples small enough to copy into a real application.',
          'When an API capability does not exist, say so instead of creating fictional API usage.'
        ]
      }
    ]
  }
}
