import React, { useEffect } from 'react';

const DEFAULT_SITE_URL = 'https://cadpoint.co.in';
const DEFAULT_SITE_NAME = 'CADPOINT Authorized Training Centre';
const DEFAULT_IMAGE = `${DEFAULT_SITE_URL}/cadpoint_logo.svg`;

/**
 * Reusable SEO Metadata Component for React Architecture
 * Dynamically injects Title, Description, Canonical, OG tags, Twitter cards, Robots, and JSON-LD Structured Data into document head.
 */
export function SEO({
  title,
  description,
  canonical,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  jsonLd = null,
}) {
  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const updateMeta = (nameAttr, nameVal, contentVal) => {
      if (!contentVal) return;
      let element = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // Helper function to update or create link tags
    const updateLink = (relVal, hrefVal) => {
      if (!hrefVal) return;
      let element = document.querySelector(`link[rel="${relVal}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', relVal);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefVal);
    };

    // 2. Standard Meta Tags
    if (description) updateMeta('name', 'description', description);
    if (keywords) updateMeta('name', 'keywords', keywords);
    
    // Robots
    updateMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    updateMeta('name', 'author', DEFAULT_SITE_NAME);

    // 3. Canonical URL
    const fullCanonical = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${DEFAULT_SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
      : window.location.href;
    updateLink('canonical', fullCanonical);

    // 4. Open Graph Tags
    const finalOgTitle = ogTitle || title || DEFAULT_SITE_NAME;
    const finalOgDesc = ogDescription || description || '';
    const finalOgImg = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : `${DEFAULT_SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`
      : DEFAULT_IMAGE;

    updateMeta('property', 'og:title', finalOgTitle);
    updateMeta('property', 'og:description', finalOgDesc);
    updateMeta('property', 'og:url', fullCanonical);
    updateMeta('property', 'og:type', ogType);
    updateMeta('property', 'og:site_name', DEFAULT_SITE_NAME);
    updateMeta('property', 'og:image', finalOgImg);
    updateMeta('property', 'og:locale', 'en_US');

    // 5. Twitter / X Card Tags
    updateMeta('name', 'twitter:card', twitterCard);
    updateMeta('name', 'twitter:title', finalOgTitle);
    updateMeta('name', 'twitter:description', finalOgDesc);
    updateMeta('name', 'twitter:image', finalOgImg);

    // 6. JSON-LD Structured Data
    let scriptTag = document.querySelector('script[id="json-ld-seo"]');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('id', 'json-ld-seo');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [
    title,
    description,
    canonical,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    noindex,
    jsonLd,
  ]);

  return null;
}
