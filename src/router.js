import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './pages/LandingPage.vue';
import DocsPage from './pages/DocsPage.vue';
import GettingStartedPage from './pages/GettingStartedPage.vue';
import ArchitecturePage from './pages/ArchitecturePage.vue';
import AuthPage from './pages/AuthPage.vue';
import StorefrontPage from './pages/StorefrontPage.vue';
import CartAndCheckout from './pages/CartAndCheckout.vue';
import Payments from './pages/Payments.vue';
const routes = [
    {
        path: '/',
        name: 'Landing',
        component: LandingPage
    },
    {
        path: '/docs/getting-started',
        name: 'GettingStarted',
        component: GettingStartedPage
    },
    {
        path: '/docs/architecture',
        name: 'Architecture',
        component: ArchitecturePage
    },
    {
        path: '/docs/auth',
        name: 'Auth',
        component: AuthPage
    },
    {
        path: '/docs/storefront',
        name: 'Storefront',
        component: StorefrontPage
    },
    {
        path: '/docs/cart-checkout',
        name: 'CartCheckout',
        component: CartAndCheckout
    },
    {
        path: '/docs/orders',
        name: 'Orders',
        component: DocsPage,
        props: { pageKey: '/docs/orders' }
    },
    {
        path: '/docs/payments',
        name: 'Payments',
        component: Payments
    },
    {
        path: '/docs/inventory-discounts',
        name: 'InventoryDiscounts',
        component: DocsPage,
        props: { pageKey: '/docs/inventory-discounts' }
    },
    {
        path: '/docs/addresses-shipping',
        name: 'AddressesShipping',
        component: DocsPage,
        props: { pageKey: '/docs/addresses-shipping' }
    },
    {
        path: '/docs/notifications',
        name: 'Notifications',
        component: DocsPage,
        props: { pageKey: '/docs/notifications' }
    },
    {
        path: '/docs/api-reference',
        name: 'ApiReference',
        component: DocsPage,
        props: { pageKey: '/docs/api-reference' }
    },
    {
        path: '/docs/sdk',
        name: 'Sdk',
        component: DocsPage,
        props: { pageKey: '/docs/sdk' }
    },
    {
        path: '/docs/deployment',
        name: 'Deployment',
        component: DocsPage,
        props: { pageKey: '/docs/deployment' }
    },
    {
        path: '/docs/contributing',
        name: 'Contributing',
        component: DocsPage,
        props: { pageKey: '/docs/contributing' }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
