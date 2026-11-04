import { fetchServiceBySlug } from "@/services";

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
    title: `Enquiry | ${service.seo.title}`,
    description: service.seo.description,
  }
}

const EnquiryLayout = ({ children }) => {
  return children;
}

export default EnquiryLayout;