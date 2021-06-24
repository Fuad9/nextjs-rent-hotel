// This is an example of how to read a JSON Web Token from an API route
import jwt from "next-auth/jwt";

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  if (!token || token === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/profile",
      },
    };
  }
};
