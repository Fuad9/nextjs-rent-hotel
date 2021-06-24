module.exports = {
  // distDir: "build",
  reactStrictMode: true,
  env: {
    BASE_URL: `${process.env.BASE_URL}`,
    MONGO_URI: `${process.env.MONGO_URI}`,
  },
  images: {
    domains: ["i.ibb.co"],
  },
};
