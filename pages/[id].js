import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/RentDetails.module.scss";
import { server } from "../config/index";
import AddCustomer from "../components/AddCustomer";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import formStyles from "../styles/AddCustomer.module.scss";
import axios from "axios";

const rentDetails = ({ apartments }) => {
  const router = useRouter();
  const [session] = useSession();
  const { id } = router.query;
  const [rentsData, setRentsData] = useState([]);

  useEffect(() => {
    setRentsData(apartments);
  }, []);

  return (
    <>
      {rentsData?.map(
        (rt) =>
          rt._id === id && (
            <section key={rt._id} className="container">
              <div className="split">
                <div className={styles.rentDetailsContainer}>
                  <img className={styles.rentImg1} src={rt.image1} alt="" />

                  <div className={styles.rentImages}>
                    <img src={rt.image2} alt="" />
                    <img src={rt.image3} alt="" />
                    <img src={rt.image4} alt="" />
                    <img src={rt.image5} alt="" />
                  </div>

                  <span>
                    <h2>{rt.name}</h2>
                    <h2>${rt.price}</h2>
                  </span>

                  <h3>Price Details-</h3>
                  <h4>{rt.priceDetails}</h4>

                  <h3>Property Details-</h3>
                  <h4>{rt.propertyDetails}</h4>
                </div>

                <AddCustomer rt={rt} />
              </div>
            </section>
          )
      )}
    </>
  );
};

export default rentDetails;

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

/* getStaticPaths is required for dynamic SSG pages ===================================== */
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/rents`);
  const apartments = await res.json();

  const ids = apartments.map((apartment) => apartment._id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
