import { type NextPage } from "next";
import DefaultLayout from "~/layouts/DefaultLayout";

const Ratelimited: NextPage = () => {
  return <DefaultLayout>
    <div className="w-full flex flex-col justify-center items-center p-2">
      <h1 className="text-4xl font-bold">Error 429: Too many requests.</h1>
      <br/>
      <p>Your IP address exceeded 5 requests per 30 seconds.</p>
      <p>Try again later.</p>
    </div>
  </DefaultLayout>
}

export default Ratelimited