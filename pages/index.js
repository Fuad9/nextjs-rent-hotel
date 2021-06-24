import { useEffect, useContext } from "react";
import Footer from "./footer";
import Nav from "../components/Nav";
import RentListComponent from "../components/RentListComponent";
import SearchRent from "../components/SearchRent";
import Services from "./services";
import { RentsContext } from "./_app";
import { server } from "../config/index";

export default function Home({ apartments }) {
  console.log(apartments);
  const [rentsData, setRentsData] = useContext(RentsContext);

  useEffect(() => {
    setRentsData(apartments);
  });

  return (
    <>
      <Nav />
      <SearchRent />
      <RentListComponent />
      <Services />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${server}/api/rents`);
  const apartments = await res.json();

  if (!apartments) {
    return {
      notFound: true,
    };
  }

  return { props: { apartments } };
}
