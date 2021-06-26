import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import rentListStyles from "../styles/RentList.module.scss";
import Link from "next/link";
import { server } from "../config/index";
import searchRentStyles from "../styles/SearchRent.module.scss";
import axios from "axios";

const RentListComponent = ({ rentsData }) => {
  const [searchedRentsData, setSearchedRentsData] = useState(rentsData);
  const [search, setSearch] = useState("");

  const getRentsData = useCallback(async () => {
    const res = await axios.get(`${server}/api/rents?search=${search}`);
    setSearchedRentsData(res.data);
  }, [search]);

  useEffect(() => {
    getRentsData();
  }, [getRentsData]);

  return (
    <section className="container">
      <div className={`container ${searchRentStyles.searchContainer}`}>
        <h1 className="text-center">find your house rent</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Find Now</button>
        </div>
      </div>
      <h4 className="text-center">House Rent</h4>
      <h3 className="text-center">
        Discover the latest Rent <br /> available today
      </h3>
      <div className="split">
        <div className="row">
          {searchedRentsData == false ? (
            <h2 style={{ textAlign: "center", color: "red" }}>Not found</h2>
          ) : (
            searchedRentsData?.map((rt) => (
              <div className={`col-md-4 ${rentListStyles.rents}`} key={rt._id}>
                <div>
                  <Image src={rt.image1} width={500} height={350} alt="" />
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RentListComponent;
