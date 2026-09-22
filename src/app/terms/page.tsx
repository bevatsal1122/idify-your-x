export const metadata = { title: 'Terms | idify your X' };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-x-bg text-x-text px-6 py-12">
      <article className="max-w-2xl mx-auto space-y-6 text-[16px] leading-7">
        <h1 className="text-3xl font-bold">Terms of use</h1>
        <p>Last updated: September 22, 2026.</p>
        <p>Use this service only to analyze public X profiles and in accordance with applicable law and the terms of X, SocialData, OpenAI, and Cloudflare. Do not use it to harass, profile unlawfully, evade platform restrictions, or make consequential decisions about people.</p>
        <p>Results are automated suggestions, not professional, financial, legal, employment, or investment advice. They may be incomplete or incorrect. The service is provided as available and may be rate-limited or changed to protect users and service providers.</p>
      </article>
    </main>
  );
}
