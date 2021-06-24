import { useSession } from "next-auth/client";
import Nav from "../components/Nav";

export default function Dashboard() {
  const [session] = useSession();

  return (
    <>
      <Nav />
      {session ? (
        <div style={{ textAlign: "center" }}>
          <img src={session?.user.image} alt="" />
          <h3>Name: {session?.user.name}</h3>
          <h3>Email: {session?.user.email}</h3>
        </div>
      ) : (
        <h3>No account found</h3>
      )}
    </>
  );
}
