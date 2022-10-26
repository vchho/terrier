import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { prisma } from "../utils/prisma";

export async function getServerSideProps() {
  const threads = await prisma.thread.findMany();

  console.log("threads", threads);

  return {
    props: {
      threads: JSON.parse(JSON.stringify(threads)),
    },
  };
}

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  console.log(props.threads);
  return (
    <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
      tailwind works
    </h1>
  );
};

export default Home;
