import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { prisma } from "../utils/prisma";

type Thread = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

// export async function getServerSideProps() {
//   const threads = await prisma.thread.findMany();
//   return {
//     props: {
//       threads: JSON.parse(JSON.stringify(threads)) as Thread[],
//     },
//   };
// }

const CreateThread = () =>
  //   props: InferGetServerSidePropsType<typeof getServerSideProps>
  {
    return (
      <>
        <Navbar />
        <div className="antialiased p-6 min-h-screen items-stretch relative">
          <div className="max-w-xl mx-auto py-12 md:max-w-2xl">
            <h2 className="text-2xl font-bold">Create your thread</h2>
            {/* Form */}
            <form>
              <div className="mt-8 w-full">
                <label className="label">
                  <span className="label-text font-seimbold text-base">
                    Thread title
                  </span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-500 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter thread title"
                />
              </div>
              <div className="mt-8 w-full">
                <label className="label">
                  <span className="label-text font-seimbold text-base">
                    Your content here
                  </span>
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-500 p-3 text-sm shadow-sm"
                  placeholder="Message"
                  rows={8}
                  id="message"
                ></textarea>
              </div>
              {/* Create thread button */}
              <div className="flex items-center my-3">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                  Create thread
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </>
    );
  };

export default CreateThread;
