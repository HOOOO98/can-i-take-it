const sitemapConfig = {
  siteUrl: "https://www.canitakeit.vercel.app",
  generateRobotsTxt: true,
  extraPaths: async () => {
    const numbers = ["123456789", "987654321"];
    const paths = numbers.map((number) => `/details/${number}`);
    return paths;
  },
};

module.exports = sitemapConfig;
