import Link from 'next/link';
import { NotFound } from 'next/navigation';

export const generateMetadata = async ({ params }) => {

  /**
   * slug: {
   *  title: 'Title',
   *  description: 'Description'
   * }
   */
  const { slug } = await params;
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'Error: Service not found'
    }
  }

  return {
    title: slug.title,
    description: slug.description,
  }
}

const Page = async ({ params }) => {
  const { slug } = await params;

  if (!slug) {
    return <NotFound />;
  }

  return (
    <div>
      <h1>{slug.title}</h1>
      <p>{slug.description}</p>
      <Link href={`/services/${slug}/enquire`}>
        Create an enquiry
      </Link>
    </div>
  );
}