import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COURSES } from '../src/utils/courseData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://cadpoint.co.in';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/courses', priority: '0.9', changefreq: 'weekly' },
  { url: '/ecosystem', priority: '0.7', changefreq: 'monthly' },
  { url: '/registration', priority: '0.8', changefreq: 'weekly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/refund-policy', priority: '0.3', changefreq: 'yearly' },
];

const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  // Static pages
  staticPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic Course detail pages
  COURSES.forEach((course) => {
    if (course.slug) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/courses/${course.slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    }
  });

  xml += `</urlset>\n`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Sitemap successfully generated with ${staticPages.length + COURSES.length} URLs at ${outputPath}`);
};

generateSitemap();
