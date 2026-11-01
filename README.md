# Lifetopia website restoration

Hosting target: the user's own Cloudflare Pages account, with GitHub as the source repository. Follow [CLOUDFLARE.md](CLOUDFLARE.md) to connect the repository and enable deployment on pushes to `main`.

Eight static pages rebuilt from the February 21, 2020 Wayback copy of www.lifetopia.com. Original source pages are preserved in `archive/`; recovered images and styles are local in `dist/`. No runtime dependencies or build service are needed to serve `dist/`.

## Build and host

Run `node build.mjs` to regenerate HTML and `node check.mjs` to verify local links. Serve `dist/` with any static web host. `dist/restore.css` and `dist/site.js` provide responsive navigation, accessible FAQ controls, and the email composer. Original `.aspx` paths have HTML aliases and `_redirects` rules; hosts that ignore `_redirects` need equivalent redirects configured. For an alternative direct upload, run `npm install` and `npm run package:cloudflare` to create a deployment ZIP.

## Restoration decisions

- Recovered home, four product pages, About Us, webinars, and contact content.
- Preserved original logo, purple branding, product illustrations, screenshots, historical testimonial and partner logos.
- Removed old ASP.NET ViewState, Telerik components, Flash player, obsolete JavaScript, tracking code, and hidden unrelated links.
- Replaced 2014 webinar dates with current demo enquiry navigation.
- Original introduction video returned 404; the home hero uses the recovered housing assignment screenshot.
- Contact form explicitly prepares an email draft. It does not store leads or send email from a server. Users must send the draft from their email app.
- Phone, sales email, feature descriptions, integrations, testimonials and product claims come from the historical site. Confirm these before a public relaunch. The restoration does not restore the hosted housing application, student accounts, or historical application databases.

## Domain

GoDaddy is the current domain provider. For the bare domain on Cloudflare Pages, add the domain to the same Cloudflare account and use the nameservers Cloudflare assigns. Configure both apex and www through the Pages Custom domains settings, and preserve email records. See [CLOUDFLARE.md](CLOUDFLARE.md). No DNS changes have been made. The earlier private OpenAI Sites preview is separate from this deployment.

## Validation

Checked all local HTML link/image targets, inspected desktop pages, and exercised FAQ expansion. Browser review is performed through the Codex browser tools.
