import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { prisma } from '../utils/prisma';

type Thread = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export async function getServerSideProps() {
  const threads = await prisma.thread.findMany();

  return {
    props: {
      threads: JSON.parse(JSON.stringify(threads)) as Thread[],
    },
  };
}

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  console.log(props.threads);
  return (
    <>
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
        Tailwind Works
      </h1>
      <div>
        {props.threads.map((thread) => (
          <div key={thread.id}>
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
