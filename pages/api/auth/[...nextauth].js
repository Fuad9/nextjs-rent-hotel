import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: {
      signingKey: {
        kty: "oct",
        kid: `${process.env.kid}`,
        alg: "HS512",
        k: `${process.env.k}`,
      },
      secret: `${process.env.SECRET}`,
    },
    callbacks: {
      redirect: async (url, _) => {
        if (url === "/api/auth/signin") {
          return Promise.resolve("/profile");
        }
        return Promise.resolve("/api/auth/signin");
      },
    },
  },

  debug: true,

  theme: "dark",
});
