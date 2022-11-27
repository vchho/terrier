import type { InferGetServerSidePropsType, NextPage } from "next";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { prisma } from "../utils/prisma";
import { timeZoneFormatter } from "../utils/timeZoneFormatter";

type Thread = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export async function getServerSideProps() {
  const threads = await prisma.thread.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      threads: JSON.parse(JSON.stringify(threads)) as Thread[],
    },
  };
}

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {props.threads.map((thread) => (
          <>
            <div
              key={thread.id}
              className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col"
            >
              <div className="flex-grow sm:text-left mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  {thread.title}
                </h2>
                <p className="leading-relaxed text-base mb-2">
                  {thread.content}
                </p>
                <p className="leading-relaxed text-base">
                  Created on: {timeZoneFormatter(thread.createdAt)}
                </p>
                <Link href={`/thread/${thread.id}`}>
                  <a className="mt-3 text-blue-500 inline-flex items-center">
                    Read More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Home;
