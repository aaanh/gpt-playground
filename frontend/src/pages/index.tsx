import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { type Url } from "url";
import DefaultLayout from "~/layouts/DefaultLayout";


const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>AAANH Labs</title>
        <meta name="description" content="AAANH Labs" />
        <link rel="icon" href="/logo-color-variant.png" />
      </Head>

      <div className="flex flex-col space-y-2 justify-center items-center">
        <div className="p-4 text-center">
          <h1 className="text-6xl">
            Welcome.
          </h1>
          <p className="text-lg">Select one of the demos below to get started.</p>
          <br></br>
          <div className="flex flex-col text-black items-center space-y-2">
            <NavBtn enabled={true} text="Chat" href="/multi-turn"></NavBtn>
            {/* <NavBtn enabled={true} text="Diffusion (WIP)" href="/diffusion"></NavBtn> */}
          </div>
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
        className={"btn btn-outline text-md flex items-center " + (props.enabled ? "" : "pointer-events-none text-neutral-200")}
        href={props.href}
      >
        {props.text}
      </Link>

  );
}

export default Home;
