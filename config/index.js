const dev = process.env.NODE_ENV === "production";

export const server = dev && "https://nextjs-rent-hotel.vercel.app";
