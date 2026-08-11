import { COMPANY_INFO, SOCIAL_LINKS } from './constants';

const SITE_URL = 'https://cadpoint.co.in';

/**
 * Organization & EducationalOrganization Schema
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: 'CADPOINT Authorized Training Centre',
  legalName: COMPANY_INFO.legalName || 'CADPOINT',
  url: SITE_URL,
  logo: `${SITE_URL}/cadpoint_logo.svg`,
  image: `${SITE_URL}/cadpoint_logo.svg`,
  description: COMPANY_INFO.tagline || 'Premier ISO Certified training & engineering solutions institute pioneering CAD, BIM, IT, AI, Multimedia and Accounting education.',
  telephone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, CPS Tower, Advaitha Ashram Rd, Fairlands',
    addressLocality: 'Salem',
    addressRegion: 'Tamil Nadu',
    postalCode: '636007',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '11.6643',
    longitude: '78.1460',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: SOCIAL_LINKS.map((s) => s.url),
});

/**
 * WebSite Schema with SearchAction
 */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'CADPOINT Authorized Training Centre',
  description: 'CADPOINT offers ISO Certified CAD, BIM, IT, AI, Multimedia, and Accounting courses.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/courses?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * BreadcrumbList Schema
 * @param {Array<{name: string, url: string}>} items
 */
export const getBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
  })),
});

/**
 * Course Schema for Individual Course Pages
 * @param {Object} course
 */
export const getCourseSchema = (course) => {
  if (!course) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: `${course.title} course at CADPOINT Authorized Training Centre. Software covered: ${course.software}. Industry-oriented practical training with ISO certification.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'CADPOINT Authorized Training Centre',
      url: SITE_URL,
    },
    courseCode: course.id,
    educationalCredentialAwarded: 'ISO Certified Professional Certificate',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite / Practical Lab Training',
      duration: course.duration || 'Flexible Hours',
      location: {
        '@type': 'Place',
        name: 'CADPOINT Salem Head Office',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Salem',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
      },
    },
  };
};

/**
 * FAQPage Schema
 * @param {Array<{question: string, answer: string}>} faqs
 */
export const getFAQSchema = (faqs = []) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};
