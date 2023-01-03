import Head from 'next/head';
1;
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  );
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link href={'/login'}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Sign In
          </a>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
        <h5 className="text-3xl text-blue-500 font-bold">
          Welcom to Authorize User
        </h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={'/profile'}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Profile Page
          </a>
        </Link>
      </div>
    </main>
  );
}

// Protecting route ===================>

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        parmanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
