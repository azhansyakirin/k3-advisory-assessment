import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between p-8 md:p-24 bg-white sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            K3 Advisory Assessment
          </h1>
          <section className="flex flex-col gap-4 pb-4">
            <h2>Build</h2>
            <p>
              A Next.js App Router landing page for a service, using sample Contentful data from a local JSON file. It should use the fields title, slug, summary, and SEO description, and include a contact link or simple enquiry form. Add a short comment explaining when the page renders and how published content would be refreshed.
            </p>
            <p>
              A server-side form handler (a server function or API route) that accepts name, email, and message, validates the input, and calls a mock createLead function that stands in for the Salesforce integration. Show responses for success, invalid input, and integration failure. Explain where credentials would be stored in production.
            </p>
          </section>

          <section className="flex flex-col gap-4 pb-4">
            <h2>Write (one page max)</h2>
            <p>
              A short explanation of the solution covering the Contentful fields used and how the page submits to the handler.
            </p>
            <p>
              One technical choice, an alternative you considered, and the trade-off between them.
            </p>
            <p>
              The three improvements you’d prioritise before production.
            </p>
          </section>

          <section className="flex flex-col gap-4 pb-4">
            <h2>Prepare</h2>
            <p>
              A 20–30 minute presentation walking through your solution, code, and key decisions, leaving the rest of the slot for Q&A. Slides are optional.
            </p>
          </section>

          <section className="flex flex-col gap-4 pb-4">
            <h2>Scope notes</h2>
            <p>
              Two standalone code files plus the written explanation is enough. TypeScript or JavaScript both work.
            </p>
            <p>
              You don’t need a running app, live Contentful or Salesforce accounts, a database, or deployment.
            </p>
            <p>
              State your assumptions explicitly.
            </p>
            <p>
              Validation and the integration call should be real code. Peripheral details can be pseudocode.
            </p>
            <p>
              Keep it focused. Extra features are welcome if they improve the solution, but they aren’t required.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-4 py-4 sm:flex-row">
          <Link
            className="py-2 px-4 rounded-xl inline-flex justify-center text-center min-w-[200px] border border-[var(--border-color)] bg-black text-white"
            href="/services"
          >
            Live Demo
          </Link>
          <a
            className="py-2 px-4 rounded-xl inline-flex items-center justify-center gap-2 min-w-[200px] border border-[var(--border-color)]"
            href="https://github.com/azhansyakirin/k3-advisory-assessment"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="size-6 fill-slate-900"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg>
            See full code
          </a>
        </div>
      </main>
    </div>
  );
}
