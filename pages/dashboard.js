import { useSession } from "next-auth/client";
import Nav from "../components/Nav";
import Image from "next/image";

export default function Dashboard() {
  const [session] = useSession();

  return (
    <>
      <Nav />
      {session ? (
        <div style={{ textAlign: "center" }}>
          <Image src={session?.user.image} width={200} height={200} alt="" />
          <h3>Name: {session?.user.name}</h3>
          <h3>Email: {session?.user.email}</h3>
        </div>
      ) : (
        <h3>No account found</h3>
      )}
    </>
  );
}
