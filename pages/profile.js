import ProfileItem from "../components/ProfileItem";
import AddRent from "../components/AddRent";
import RentListTable from "../components/RentListTable";
import ProfileStyles from "../styles/Profile.module.scss";
import Nav from "../components/Nav";
import { useSession } from "next-auth/client";
import { connectToDatabase } from "../utils/mongodb";

export default function Profile({ customersData, adminsData, rentsData }) {
  const [session, loading] = useSession();

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
                  session={session}
                  adminsData={adminsData}
                />
              ))}
            </tbody>
          </table>
        </div>

        <AddRent session={session} adminsData={adminsData} />

        <RentListTable
          session={session}
          rentsData={rentsData}
          adminsData={adminsData}
        />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const rentsData = await db.collection("hotels").find({}).toArray();
  const customersData = await db.collection("customers").find({}).toArray();
  const adminsData = await db.collection("admins").find({}).toArray();

  return {
    props: {
      rentsData: JSON.parse(JSON.stringify(rentsData)),
      customersData: JSON.parse(JSON.stringify(customersData)),
      adminsData: JSON.parse(JSON.stringify(adminsData)),
    },
  };
}
