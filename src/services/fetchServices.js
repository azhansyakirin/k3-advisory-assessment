import { BASE_URL } from '@/utils/constants';

const parseService = (data) => {
  const { title, slug, seoDescription, summary } = data.fields;

  return ({
    seo: {
      title: title || '',
      description: seoDescription || ''
    },
    summary: summary || '',
    slug: slug || '',
    title: title || ''
  })
}

/**
 * This fetch all services from the mock API
 */
export const fetchServices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/mock/contentful.mock.json`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return (data.items ?? []).map(parseService);
  } catch (error) {
    console.error('[ERROR] FETCHSERVICES ::::', error);
    return [];
  }
}

/**
 * this fetch a service by slug from the mock API
 */
export const fetchServiceBySlug = async (slug) => {
  const services = await fetchServices();
  return services.find((service) => service.slug === slug);
}