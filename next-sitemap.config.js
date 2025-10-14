/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://beltdrivingschool.com', // your domain
  generateRobotsTxt: true, // automatically generate robots.txt
  sitemapSize: 7000, // split sitemaps if needed
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'], // exclude private routes
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://beltdrivingschool.com/sitemap.xml',
    ],
  },
};
