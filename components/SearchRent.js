import React, { useEffect, useState } from "react";
import searchRentStyles from "../styles/SearchRent.module.scss";
import { RentsContext } from "../pages/_app";
import axios from "axios";
import { server } from "../config/index";

const SearchRent = () => {
  const [rentsData, setRentsData] = useState([]);
  const [search, setSearch] = useState("");

  console.log(rentsData);

  const getRentsData = async () => {
    const res = await axios.get(
      `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/apartment-hunt-ogagn/service/apartment-service/incoming_webhook/searchRents?search=${search}`
    );
    setRentsData(res);
  };

  useEffect(() => {
    getRentsData();
  }, []);

  return (
    <>
      <div className={`container ${searchRentStyles.searchContainer}`}>
        <h1 className="text-center">find your house rent</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onBlur={(e) => setSearch(e.target.value)}
          />
          <button>Find Now</button>
        </div>
      </div>
    </>
  );
};

export default SearchRent;
