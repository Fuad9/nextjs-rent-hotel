module.exports = {
  // distDir: "build",
  reactStrictMode: true,
  env: {
    BASE_URL: `${process.env.BASE_URL}`,
    MONGODB_URI: `${process.env.MONGODB_URI}`,
    MONGODB_DB: `${process.env.MONGODB_DB}`,
  },
  images: {
    domains: ["i.ibb.co", "lh3.googleusercontent.com"],
  },
};
