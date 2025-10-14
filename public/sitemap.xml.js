export async function getServerSideProps({ res }) {
  const baseUrl = 'https://beltdrivingschool.com';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/lessons',
    '/pricing',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((path) => {
        return `
          <url>
            <loc>${baseUrl}${path}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
          </url>
        `;
      })
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
