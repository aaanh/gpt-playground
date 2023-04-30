import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Url } from "url";
import DefaultLayout from "~/layouts/DefaultLayout";


const Home: NextPage = () => {
  console.log(process.env.LOGROCKET_ID)
  return (
    <DefaultLayout>
      <Head>
        <title>AAANH Labs</title>
        <meta name="description" content="AAANH Labs" />
        <link rel="icon" href="/logo-color-variant.png" />
      </Head>

      <div className="flex flex-col space-y-2 p-2 sm:p-0 justify-center items-center">
        <h1 className="text-6xl">
          Welcome.
        </h1>
        <p className="text-lg">Select one of the demos below to get started.</p>
        <div className="flex flex-col text-black">
          <NavBtn enabled={true} text="Single-Turn" href="/single-turn"></NavBtn>
          <NavBtn enabled={true} text="Multi-Turn" href="/multi-turn"></NavBtn>
          <NavBtn enabled={true} text="Diffusion" href="/diffusion"></NavBtn>
        </div>
      </div>

    </DefaultLayout>
  );
};

type NavBtnProps = {
  text: string | undefined;
  href: string | Url;
  enabled?: boolean | false;
}

const NavBtn = (props: NavBtnProps) => {
  return (
    <Link
      className={"text-md text-black border-b-2 border-b-transparent transition-all ease-linear hover:border-b-black flex items-center my-2 " + (props.enabled ? "" : "pointer-events-none text-neutral-200")}
      href={props.href}
    >
      {"> " + props.text}
    </Link>
  );
}

export default Home;
