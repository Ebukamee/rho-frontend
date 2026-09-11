from pathlib import Path
import re
p=Path('/mnt/data/rho_frontend_edit/src/data/docs.ts')
s=p.read_text()

def replace_page(src, route, newpage):
    start=src.index(f"  '{route}': {{")
    # find next route at same indent
    m=re.search(r"\n  '/docs/[^']+': \{", src[start+5:])
    end=start+5+m.start() if m else len(src)
    return src[:start]+newpage+src[end:]

getting = r'''  '/docs/getting-started': {
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
'''
s=replace_page(s,'/docs/getting-started',getting)

orders = r'''  '/docs/orders': {
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
'''
s=replace_page(s,'/docs/orders',orders)

# Add concrete examples to previously prose/card-only areas.
repls={
"""      {
        id: 'layers',
        title: 'Recommended layers',
        cards: [""":"""      {
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
        cards: [""",
"""      {
        id: 'states',
        title: 'Loading, empty, and error states',
        cards: [""":"""      {
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
        cards: [""",
"""      {
        id: 'checkout-ui',
        title: 'Recommended checkout UI',
        list: [""":"""      {
        id: 'checkout-ui',
        title: 'Recommended checkout UI',
        code: code(`const preview = await rho.checkout.preview({
  discountCode: couponCode || undefined
})

checkoutTotal.value = preview.total
checkoutCurrency.value = preview.currency`),
        list: [""",
"""      {
        id: 'failure',
        title: 'Checkout failure handling',
        table: {""":"""      {
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
        table: {""",
"""      {
        id: 'ui',
        title: 'Notification UI',
        cards: [""":"""      {
        id: 'ui',
        title: 'Notification UI',
        code: code(`const unread = notifications.filter(n => !n.readAt)

async function openNotification(id: string) {
  await rho.notifications.markRead(id)
  await reloadNotifications()
}`),
        cards: [""",
"""      {
        id: 'admin',
        title: 'Admin modules',
        body: ['The SDK also exposes products, categories, inventory, discounts, users, shipping creation/update/delete, and order status mutation. Those methods should only be reachable from an admin UI and still rely on API authorization.']
      },""":"""      {
        id: 'admin',
        title: 'Admin modules',
        body: ['The SDK also exposes products, categories, inventory, discounts, users, shipping creation/update/delete, and order status mutation. Those methods should only be reachable from an admin UI and still rely on API authorization.'],
        code: code(`const products = await rho.products.adminList({
  page: 1,
  limit: 20,
  active: false
})

const users = await rho.users.list({ page: 1, limit: 20 })`)
      },""",
"""      {
        id: 'errors',
        title: 'SDK HTTP errors',
        code:""":"""      {
        id: 'errors',
        title: 'SDK HTTP errors',
        body: ['Use the error status to choose the frontend response. Keep raw server details out of customer-facing messages unless they are intentionally safe to display.'],
        code:""",
"""      {
        id: 'payment-return',
        title: 'Payment return URL',
        body: ['Make sure the frontend route used after payment exists in the deployed application and that your payment flow knows how to associate the return with the relevant Rho payment/order state. Do not trust arbitrary query parameters as proof of payment.']
      },""":"""      {
        id: 'payment-return',
        title: 'Payment return URL',
        body: ['Make sure the frontend route used after payment exists in the deployed application and that your payment flow knows how to associate the return with the relevant Rho payment/order state. Do not trust arbitrary query parameters as proof of payment.'],
        code: code(`// Example route: /payment/return?paymentId=...
const paymentId = new URLSearchParams(location.search).get('paymentId')

if (!paymentId) {
  throw new Error('Missing payment reference')
}

const payment = await rho.payments.get(paymentId)`)
      },""",
}
for a,b in repls.items():
    if a not in s:
        print('MISSING replacement',a[:60])
    else:
        s=s.replace(a,b,1)

p.write_text(s)
