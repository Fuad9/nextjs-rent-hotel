import { useEffect, useContext, useState } from "react";
import Footer from "./footer";
import Nav from "../components/Nav";
import RentListComponent from "../components/RentListComponent";
import SearchRent from "../components/SearchRent";
import Services from "./services";
import { RentsContext } from "./_app";
import { server } from "../config/index";
import Image from "next/image";
import rentListStyles from "../styles/RentList.module.scss";
import Link from "next/link";

// const myLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
// }

export default function Home({ apartments }) {
  const [rentsData, setRentsData] = useState([]);
  console.log(rentsData);

  useEffect(() => {
    setRentsData(apartments);
  }, [apartments]);

  return (
    <>
      <Nav />
      {/* <SearchRent /> */}

      <RentListComponent rentsData={rentsData} />

      <Services />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${server}/api/rents`, {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
  });
  const apartments = await res.json();

  if (!apartments) {
    return {
      notFound: true,
    };
  }

  return { props: { apartments } };
}
