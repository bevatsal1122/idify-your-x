# idify your X

## Security launch checklist

1. Set `SOCIALDATA_API_KEY`, `OPENAI_API_KEY`, `TURNSTILE_SECRET_KEY`, and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` from `.env.example` in the deployment platform. Production intentionally rejects analyses if Turnstile is not configured.
2. Put the application behind a trusted proxy/CDN (such as Vercel plus Cloudflare). It must overwrite client IP headers. Enable the platform WAF, bot protection, DDoS protection, and a rate rule for `POST /api/analyze`.
3. Set hard spending, usage, and alert limits in OpenAI and SocialData. The application limit is 3 requests per IP per 15 minutes per running instance; the edge rate rule is required because in-memory limits are not globally shared across serverless instances.
4. Serve only on HTTPS and configure the real production domain in the Turnstile widget. Review the Privacy and Terms pages with counsel before launch and publish a real operator contact method.
5. Run `npm ci`, `npm run build`, and `npm audit --omit=dev` in CI. Keep Next.js, Axios, and their transitive dependencies patched.

## Data handling

The server does not persist analyses and avoids logging profile, tweet, model-response, or provider-error content. Submitted public-profile data is sent to SocialData and OpenAI to perform an analysis; see `/privacy` and `/terms`.
