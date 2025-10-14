export default async function handler(req, res) {
  const baseUrl = 'https://beltdrivingschool.com';

  const pages = [
    '/',
    '/about',
    '/contact',
    '/lessons',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((url) => {
        return `
        <url>
          <loc>${baseUrl}${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`;
      })
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
