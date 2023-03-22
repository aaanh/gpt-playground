import { type NextPage } from "next";
import DefaultLayout from "~/layouts/DefaultLayout";

const Ratelimited: NextPage = (props: any) => {

  return <DefaultLayout>
    <div className="w-full flex flex-col justify-center items-center p-2">
      <h1 className="text-4xl font-bold">Error 429: Too many requests.</h1>
      <br />
      
      <p>Your IP address exceeded current rule: {props.numOfRequests} requests per {props.duration}.</p>
      <p>Try again later.</p>
    </div>
  </DefaultLayout>
}

export async function getServerSideProps() {
  return {
    props: {
      numOfRequests: process.env.RATE_LIMIT_REQUESTS || "2",
      duration: process.env.RATE_LIMIT_DURATION || "1 m",
    },
  };
}

export default Ratelimited