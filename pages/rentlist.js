import React, { useState, useEffect } from "react";
import Image from "next/image";
import rentListStyles from "../styles/RentList.module.scss";
import Link from "next/link";
import { server } from "../config";

const RentList = ({ apartments }) => {
  const [rentsData, setRentsData] = useState([]);

  useEffect(() => {
    setRentsData(apartments);
  }, [apartments]);

  return (
    <>
      <section className="container">
        <h4 className="text-center">House Rent</h4>
        <h3 className="text-center">
          Discover the latest Rent <br /> available today
        </h3>
        <div className="split">
          <div className="row">
            {rentsData?.map((rt) => (
              <div className={`col-md-4 ${rentListStyles.rents}`} key={rt._id}>
                <div>
                  <Image src={rt.image1} alt="" />
                </div>

                <div>
                  <h4>{rt.name}</h4>
                  <h5>
                    <Image
                      width={17}
                      height={17}
                      src="/images/map-marker-alt-solid 1.png"
                      alt=""
                    />{" "}
                    {rt.location}
                  </h5>
                  <span>
                    <h5>
                      <Image
                        width={17}
                        height={17}
                        src="/images/bed 1.png"
                        alt=""
                      />{" "}
                      {rt.bedroom} Bedrooms
                    </h5>
                    <h5>
                      <Image
                        width={17}
                        height={17}
                        src="/images/bath 1.png"
                        alt=""
                      />{" "}
                      {rt.bathroom} Bathrooms
                    </h5>
                  </span>
                  <span>
                    <h2>${rt.price}</h2>
                    <Link href={`${rt._id}`} passHref>
                      <button>View Details</button>
                    </Link>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RentList;

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
