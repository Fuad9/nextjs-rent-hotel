import React, { useContext } from "react";
import Image from "next/image";
import rentListStyles from "../styles/RentList.module.scss";
import Link from "next/link";
import { RentsContext } from "../pages/_app";

const RentListComponent = () => {
  const [rentsData] = useContext(RentsContext);

  return (
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
                <img src={rt.image1} alt="" />
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
                    <Image width={17} height={17} src="/images/bed 1.png" />{" "}
                    {rt.bedroom} Bedrooms
                  </h5>
                  <h5>
                    <Image width={17} height={17} src="/images/bath 1.png" />{" "}
                    {rt.bathroom} Bathrooms
                  </h5>
                </span>
                <span>
                  <h2>${rt.price}</h2>
                  <Link href={`${rt._id}`}>
                    <button>View Details</button>
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RentListComponent;
