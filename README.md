# FreshCart

FreshCart is a Next.js storefront with product browsing, authentication, cart management, and cash on delivery checkout.

## Local setup

1. Install dependencies with `npm ci`.
2. Add `BETTER_AUTH_SECRET` to `.env.local`. Use a long, random value and keep it private.
3. Start the development server with `npm run dev`.

The catalog and cart APIs use `https://ecommerce.routemisr.com`. Make sure the API is reachable from the deployed server. Product images are allowed from that host in `next.config.ts`.

## Production

Set `BETTER_AUTH_SECRET` in the hosting provider's server-side environment variables, then deploy with the standard Next.js build. The project scripts are:

- `npm run lint`
- `npm run build`
- `npm run start`

Do not commit `.env.local` or any environment file containing secrets.
