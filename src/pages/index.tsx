import { type NextPage } from "next";
import Head from "next/head";
import DefaultLayout from "~/layouts/DefaultLayout";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>AAANH Labs</title>
        <meta name="description" content="AAANH Labs" />
        <link rel="icon" href="/Logo.png" />
      </Head>

      <div className="flex flex-col space-y-2 p-2 sm:p-0 justify-center items-center">
        <h1 className="text-6xl">
          Welcome.
        </h1>
        <p className="text-lg">Select one of the demos above to get started.</p>
      </div>
    
    </DefaultLayout>
  );
};

export default Home;
