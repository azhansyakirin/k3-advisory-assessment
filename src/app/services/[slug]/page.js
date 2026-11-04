import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchServices, fetchServiceBySlug } from '@/services';

export const generateStaticParams = async () => {
  const services = await fetchServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export const generateMetadata = async ({ params }) => {

  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'Error: Service not found'
    }
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
  }
}


const Page = async ({ params }) => {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className='text-3xl'>{service.title}</h1>
      <p>{service.summary}</p>
      <div className="flex flex-row items-center gap-2">
        <Link href="/services" className="inline-flex items-center gap-1 py-2 px-8 underline hover:opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back to services
        </Link>
        <Link href={`/services/${service.slug}/enquiry`} className="py-2 px-8 border border-[var(--border-color)] rounded-xl hover:opacity-80">
          Create an enquiry
        </Link>
      </div>
    </main>
  );
}

export default Page;