# Glow-Me-Webshop

This repository stores the source code for glowshops.com, an online webshop created for two shops (GHOSTS and CATS) in York, England.

# Setting up local development
This information is not necessarily fully verbose, but is rather a collection of notes to myself to remind myself how to set up the local development environment should I need to in the future. This repository is not intended to be collaborated on at this stage so this is more than adequate.

```bash
# Login to Netlify to use Netlify CLI local development.
netlify login

# Start the local development server.
netlify dev
```

## `.env.secret`
For obvious reasons, the contents of this file is not tracked by Git. Unfortunately, there are certain secrets that have to be provided for parts of local development to function as expected.

In the meantime, the following values must be provided in `.env.secret` for certain serverside functionality to work in local development:
```dotenv
SUPABASE_SERVICE_ROLE_KEY=?????
GA4_MEASUREMENT_PROTOCOL_SECRET=?????
```

## Stripe Webhooks
You must run `stripe login` before attempting to develop anything that relies on Stripe webhooks. This generates a key that expires in 90 days.
```bash
# Login to Stripe CLI
stripe login
```

Note that this will supply you with a locally applicable webhook secret which should be placed in `.env` as `STRIPE_HOOK_SECRET`:
```
Ready! You are using Stripe API Version [2026-02-25.clover]. Your webhook signing secret is whsec_********
```

## `lordis-react-components`
To test with a local development version of  `lordis-react-components`, you'll need to symlink its `react` and `react-dom` packages from its own `node_modules` directory by going into each of these and running `npm link`, then run the following in the root directory of this project: 
```bash
npm link lordis-react-components react react-dom
``` 
This is because React throws a hissyfit when it detects "multiple instances of React", which is flagged because by symlinking `lordis-react-components`, it detects a duplicate instance of React, so instead, we can just symlink React too. This is detailed in a post on Medium [here](https://medium.com/bbc-product-technology/solving-the-problem-with-npm-link-and-react-hooks-266c832dd019).
