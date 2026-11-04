import { fetchServices } from "@/services";
import Link from "next/link";

export const metadata = {
  title: 'Services',
  description: 'Browse our services we offered.'
}

const ServicesPage = async () => {

  const services = await fetchServices();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 font-sans">
      <h1 className="text-3xl font-semibold">Services</h1>

      <p>Welcome to the services page. Here you can find information about our services.</p>
      
      <div className="flex flex-row flex-wrap items-center gap-4 max-w-[800px] justify-center">
        {services.map((service, id) =>
        (<div key={id} className="border border-[var(--border-color)] rounded-xl p-4 flex flex-col items-stretch max-w-[250px] aspect-[3/4] overflow-hidden">
          <h2 className="text-xl font-semibold break-words pb-4">{service.title}</h2>
          <p className="flex-1 overflow-hidden line-clamp-5">{service.summary}</p>
          <Link href={`/services/${service.slug}`} className="inline-flex items-start gap-1 hover:opacity-80">
            View Service
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>

          </Link>
        </div>)
        )}
      </div>
      
      <Link href="/" className="underline hover:opacity-80">Back to home</Link>
    </main>
  );
}

export default ServicesPage;