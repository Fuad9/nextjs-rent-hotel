import React, { useState, useEffect } from "react";
import Image from "next/image";
import rentListStyles from "../styles/RentList.module.scss";
import Link from "next/link";
import { server } from "../config";
import { connectToDatabase } from "../utils/mongodb";

const RentList = ({ rentsData }) => {
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
                  <Image src={rt.image1} width={500} height={500} alt="" />
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
  const { db } = await connectToDatabase();

  const rentsData = await db.collection("hotels").find({}).toArray();

  return {
    props: {
      rentsData: JSON.parse(JSON.stringify(rentsData)),
    },
  };
}
