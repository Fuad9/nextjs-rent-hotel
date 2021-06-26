import { useEffect, useContext, useState } from "react";
import Footer from "./footer";
import Nav from "../components/Nav";
import RentListComponent from "../components/RentListComponent";
import Services from "./services";
import { RentsContext } from "./_app";
import { server } from "../config/index";
import Image from "next/image";
import rentListStyles from "../styles/RentList.module.scss";
import Link from "next/link";
import { connectToDatabase } from "../utils/mongodb";

export default function Home({ rentsData }) {
  return (
    <>
      <Nav />

      <RentListComponent rentsData={rentsData} />

      <Services />
      <Footer />
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(`${server}/api/rents`);
//   const rentsData = await res.json();

//   if (!rentsData) {
//     return {
//       notFound: true,
//     };
//   }

//   return { props: { rentsData } };
// }

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const rentsData = await db.collection("hotels").find({}).toArray();

  return {
    props: {
      rentsData: JSON.parse(JSON.stringify(rentsData)),
    },
  };
}
