import Link from "next/link";

const logo1 = "/Logo.png";

function Branding() {
  return (
    <div className="branding flex h-8 w-16 items-center border border-white p-2 transition-all ease-linear hover:shadow-md hover:border-t-cyan-500 hover:border-r-yellow-500 hover:border-b-pink-700 hover:border-l-black">
      <Link href="/">
        <img className="" src={logo1} alt="logo" />
      </Link>
    </div>
  );
}

export default Branding;