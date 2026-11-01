# Deploy from GitHub to Cloudflare Pages

Use this repository as the source and Cloudflare Pages as the website host.

1. In your Cloudflare account, open Workers & Pages and create a Pages project using Git integration.
2. Connect GitHub, authorize this repository, and select it.
3. Choose production branch `main`, framework preset `None`, build command `node build.mjs`, and output directory `dist`.
4. Deploy, then use the actual `pages.dev` URL returned by Cloudflare to verify the result.

Subsequent pushes to `main` will deploy through this integration. Do not create a Direct Upload project first if you want Git integration: Cloudflare does not allow switching an existing Direct Upload project to Git integration.

## Custom domain

Add `lifetopia.com` as a zone in the same Cloudflare account, review imported DNS including email records, and use the two actual Cloudflare nameservers in GoDaddy. GoDaddy can remain the registrar. After the zone is active, add `lifetopia.com` and `www.lifetopia.com` under the Pages project's Custom domains.

For only `www.lifetopia.com`, you may retain GoDaddy DNS: first add the hostname as a Pages custom domain, then configure its CNAME to the exact `pages.dev` hostname returned by Cloudflare. The bare domain requires a separate redirect or Cloudflare DNS.

No DNS records or nameservers have been changed by preparing these files. Earlier OpenAI Sites DNS targets do not apply to this deployment.

## Local work

- `node build.mjs` regenerates the pages.
- `node check.mjs` verifies local link and asset targets.
- `npm install` followed by `npm run package:cloudflare` creates a ZIP for the alternative Direct Upload workflow.
- Serve `dist/` with a local static server to preview.

The contact form prepares a draft in the visitor's email app. This repository restores the public marketing website; it does not contain the old student application or databases.

References: [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
