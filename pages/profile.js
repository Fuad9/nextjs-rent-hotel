import React, { useEffect, useState } from "react";
import ProfileItem from "../components/ProfileItem";
import AddRent from "../components/AddRent";
import RentListTable from "../components/RentListTable";
import ProfileStyles from "../styles/Profile.module.scss";
import Nav from "../components/Nav";
import { useSession } from "next-auth/client";
import { server } from "../config";

export default function Profile({ customers, admins, apartments }) {
  const [session, loading] = useSession();
  const [customersData, setCustomersData] = useState([]);
  const [adminsData, setAdminsData] = useState([]);
  const [rentsData, setRentsData] = useState([]);

  useEffect(() => {
    setCustomersData(customers);
    setAdminsData(admins);
    setRentsData(apartments);
  }, [customers, admins, apartments]);

  return (
    <>
      <section className="container">
        <Nav />
        <h1 className="text-center">Customer Orders</h1>
        <div className={ProfileStyles.profile}>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th className="text-secondary" scope="col">
                  Name
                </th>
                <th className="text-secondary" scope="col">
                  Email ID
                </th>
                <th className="text-secondary" scope="col">
                  Phone
                </th>
                <th className="text-secondary" scope="col">
                  RentName
                </th>
                <th className="text-secondary" scope="col">
                  Message
                </th>
                <th className="text-secondary" scope="col">
                  Status
                </th>
                <th className="text-secondary" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customersData?.map((customerData) => (
                <ProfileItem
                  key={customerData._id}
                  customerData={customerData}
                  adminsData={adminsData}
                  session={session}
                />
              ))}
            </tbody>
          </table>
        </div>

        <AddRent adminsData={adminsData} session={session} />

        <RentListTable
          rentsData={rentsData}
          adminsData={adminsData}
          session={session}
        />
      </section>
    </>
  );
}

export async function getStaticProps() {
  console.log(server);
  const resOne = await fetch(`${server}/api/customers`);
  const customers = await resOne.json();

  const resTwo = await fetch(`${server}/api/admins`);
  const admins = await resTwo.json();

  const resThree = await fetch(`${server}/api/rents`, {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
  });
  const apartments = await resThree.json();

  if (!customers || !admins || !apartments) {
    return {
      notFound: true,
    };
  }

  return { props: { customers, admins, apartments } };
}
