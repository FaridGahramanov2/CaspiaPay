# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Investor sandbox (local feature branch)

Open `/investor-demo` after signing into the dashboard. Existing demo pages remain available separately; their historical mock records are not the sandbox ledger.

The sandbox connects merchant onboarding, a unified payment request, transparent provider routing/failover, allocations, proportional refunds, settlement matching, seller payout scheduling, reconciliation exceptions, accounting JSON export and a subscription retry. All figures and providers are illustrative. No real funds move.

- Local `npm run dev` and `npm run preview` expose `/api/sandbox/*` through Vite middleware, using in-memory state.
- Static builds run the same engine in browser storage, explicitly labelled **Browser simulation**. They do not expose HTTP endpoints.
- The key `sk_test_caspiapay_investor_only` is public and only prevents accidental unauthenticated demo requests. It is not a production security boundary. Bind the server to localhost.
- Local server state is shared across tabs and resets on restart. Reset clears all sandbox records. Reload to see requests made outside the UI.
- Webhook delivery is an internal simulation. Generic accounting exports are not certified 1C/e-Qaimə integrations.
- See the docs app's `/investor-sandbox` page for curl examples and the walkthrough.
- Run `npm test` in `dashboard` for financial-state invariant tests.

### Corrections to the original concept notes

Earlier claims in the pitch notes about 200+ merchants, fixed pricing, zero bank risk or automatically operating under a partner's licence are not established facts. No customer commitments, bank agreements, regulatory permissions or production certifications are demonstrated by this prototype. A real launch requires an agreed legal perimeter and responsibility model.
