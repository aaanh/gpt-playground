import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DefaultLayout from "~/layouts/DefaultLayout";

const Diffusion: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Diffusion</title>
      </Head>
      <div className="items-center justify-center flex">
        <div className="px-20 py-16 bg-neutral-900 items-center justify-center flex">
          <h1 className="text-4xl text-white">Coming soon!</h1>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Diffusion