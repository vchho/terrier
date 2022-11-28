import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { threadId } from "worker_threads";

type ReplyInputs = {
  content: string;
};

const PostForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ReplyInputs>();

  const onSubmit: SubmitHandler<ReplyInputs> = async (data) => {
    const updatedData = {
      ...data,
      ...(props.parentId && {
        parentId: props.parentId
      }),
      threadId: props.threadId
    }

    console.log('updated data', updatedData)
    try {
      const data = await axios.post(`/api/threads/${props.threadId}`, updatedData);
      console.log('hey...', data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {/* Reply form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="w-full rounded-lg border-gray-500 p-3 text-sm shadow-sm"
          placeholder="Reply here"
          rows={8}
          id="message"
          {...register("content", { required: true })}
        ></textarea>

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
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
