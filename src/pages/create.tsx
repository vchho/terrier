import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Navbar } from '../components/Navbar';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

export type FormInputs = {
  threadTitle: string;
  content: string;
};

const CreateThread = () =>
  //   props: InferGetServerSidePropsType<typeof getServerSideProps>
  {
    const router = useRouter();
    const {
      register,
      handleSubmit,
      formState: { errors, isValid, isDirty },
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
      try {
        const result = await axios.post('/api/threads', data);

        if (result.status === 200) {
          router.push(`/`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <Navbar />
        <div className="antialiased p-6 min-h-screen items-stretch relative">
          <div className="max-w-xl mx-auto py-12 md:max-w-2xl">
            <h2 className="text-2xl font-bold">Create your thread</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register('threadTitle', { required: true })}
                />
                {errors.threadTitle && (
                  <p className="text-red-400 pt-1">Thread title required</p>
                )}
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
                  {...register('content', { required: true })}
                ></textarea>
                {errors.content && (
                  <p className="text-red-400 pt-1">Content required</p>
                )}
              </div>
              {/* Create thread button */}
              <div className="flex items-center my-3">
                <button
                  disabled={!isDirty || !isValid}
                  type="submit"
                  className={
                    !isDirty || !isValid
                      ? `inline-block rounded-lg disabled:bg-slate-100 px-5 py-3 text-sm font-medium text-white cursor-default`
                      : `inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer`
                  }
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
