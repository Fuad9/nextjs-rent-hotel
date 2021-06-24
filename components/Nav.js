import Link from "next/link";
import navStyles from "../styles/Nav.module.scss";
import { signIn, signOut, useSession } from "next-auth/client";

const Nav = () => {
  const [session, loading] = useSession();

  return (
    <nav className={`container ${navStyles.nav}`}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/rentlist">Rents</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/footer">Contact</Link>
        </li>

        {session ? (
          <>
            <li>
              <Link href="/profile">Orders</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>

            <button onClick={signOut}>Signout</button>
          </>
        ) : (
          <button onClick={signIn}>Signin</button>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
