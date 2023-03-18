import Link from "next/link";

const logo1 = "/Logo.png";

function Branding() {
  return (
    <div className="branding flex h-8 w-16 items-center border border-white p-2 transition-all ease-linear hover:shadow-md">
      <Link href="/">
        <img className="" src={logo1} alt="logo" />
      </Link>
    </div>
  );
}

export default Branding;