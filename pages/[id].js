import { useRouter } from "next/router";
import styles from "../styles/RentDetails.module.scss";
import { server } from "../config/index";
import AddCustomer from "../components/AddCustomer";
import { useSession } from "next-auth/client";
import axios from "axios";
import Image from "next/image";
import { connectToDatabase } from "../utils/mongodb";

export default function RentDetails({ rentsData }) {
  const router = useRouter();
  const [session] = useSession();
  const { id } = router.query;

  return (
    <>
      {rentsData?.map(
        (rt) =>
          rt._id === id && (
            <section key={rt._id} className="container">
              <div className="split">
                <div className={styles.rentDetailsContainer}>
                  <div>
                    <Image width={1000} height={500} src={rt.image1} alt="" />

                    <div className={styles.rentImages}>
                      <Image width={250} height={250} src={rt.image2} alt="" />
                      <Image width={250} height={250} src={rt.image3} alt="" />
                      <Image width={250} height={250} src={rt.image4} alt="" />
                      <Image width={250} height={250} src={rt.image5} alt="" />
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

                  <AddCustomer rt={rt} session={session} />
                </div>
              </div>
            </section>
          )
      )}
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(`${server}/api/rents`, {
//     method: "GET",
//     headers: {
//       // update with your user-agent
//       "User-Agent":
//         "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
//       Accept: "application/json; charset=UTF-8",
//     },
//   });
//   const apartments = await res.json();

//   if (!apartments) {
//     return {
//       notFound: true,
//     };
//   }

//   return { props: { apartments } };
// }

// direct query database inside getStaticProps
export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const rentsData = await db.collection("hotels").find({}).toArray();

  return {
    props: {
      rentsData: JSON.parse(JSON.stringify(rentsData)),
    },
  };
}

/* getStaticPaths is required for dynamic SSG pages ===================================== */
export const getStaticPaths = async () => {
  const { db } = await connectToDatabase();

  const rentsData = await db.collection("hotels").find({}).toArray();

  const ids = rentsData.map((rentData) => rentData._id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
