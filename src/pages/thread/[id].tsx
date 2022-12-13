import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChildrenPosts } from "../../components/ChildrenPosts";
import { Navbar } from "../../components/Navbar";
import PostForm from "../../components/PostForm";
import formPosts from "../../utils/formatComments";
import { timeZoneFormatter } from "../../utils/timeZoneFormatter";

function Thread() {
  const [thread, setThread] = useState<any>();

  const router = useRouter();

  const threadId = router.query.id as string;

  const getData = async (threadId: string) => {
    const data = await axios.get(`/api/threads/${threadId}`);
    console.log("data", data.data);
    setThread(data.data);
  };

  /**
   * - create a hook to update data on submission
   * */
  useEffect(() => {
    // https://github.com/vercel/next.js/discussions/11484#discussioncomment-2733666
    if (!threadId) {
      return;
    }
    getData(threadId);
  }, [threadId]);

  return (
    <>
      <Navbar />
      {thread ? (
        <div className="container mx-auto">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -mx-4 -my-8">
              <div className="py-8 px-4 lg:w-1/3">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                      Jul
                    </span>
                    <span className="font-medium text-lg text-gray-800 title-font leading-none">
                      18
                    </span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                      {timeZoneFormatter(thread?.createdAt)}
                    </h2>
                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      {thread?.title}
                    </h1>
                    <p className="leading-relaxed mb-5">{thread.content}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Reply form */}
            {threadId && <PostForm threadId={threadId} getData={getData} />}
          </div>

          {/* Prop drilling grossness 🤮 */}
          <ChildrenPosts posts={formPosts(thread?.Posts)} getData={getData} />
        </div>
      ) : (
        <div className="container mx-auto">
          <p>Loading....</p>
        </div>
      )}
    </>
  );
}

export default Thread;
