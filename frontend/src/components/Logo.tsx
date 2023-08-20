import Link from "next/link";

const logo1 = "/logo-color-variant.png";

function Logo() {
  return (
    <div className="branding flex items-center border border-transparent p-2 transition-all ease-linear hover:shadow-md hover:border-t-cyan-500 hover:border-r-yellow-500 hover:border-b-pink-700 hover:border-l-green-600">
      <Link href="/" className="flex items-center space-x-2">
        <img className="w-8" src={logo1} alt="logo" />
        <h1 className="text-xl">AAANH</h1>
      </Link>
    </div>
  );
}

export default Logo;