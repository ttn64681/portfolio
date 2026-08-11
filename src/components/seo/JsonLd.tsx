import { siteConfig, getSiteUrl } from '@/lib/site';

/** Person + WebSite structured data for search engines. */
export default function JsonLd() {
  const siteUrl = getSiteUrl();

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteUrl,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    jobTitle: 'Computer Science Student & Software Developer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Georgia',
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.shortTitle,
    url: siteUrl,
    description: siteConfig.description,
    author: { '@type': 'Person', name: siteConfig.name },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
