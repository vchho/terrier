import { useState } from "react";
import { timeZoneFormatter } from "../utils/timeZoneFormatter";
import PostForm from "./PostForm";

export interface Post {
  children: Post[];
  content: string;
  createdAt: string;
  id: string;
  parentId: null | string;
  threadId: string;
}

function getReplyCountText(count: number) {
  if (count === 0) {
    return "No replies";
  }

  if (count === 1) {
    return "1 reply";
  }

  return `${count} replies`;
}

function CommentActions({
  commentId,
  replyCount,
  threadId,
  getData,
}: {
  commentId: string;
  replyCount: number;
  threadId: string;
  getData?: (threadId: string) => Promise<void>;
}) {
  const [replying, setReplying] = useState(false);

  return (
    <>
      <div>
        <h1>{getReplyCountText(replyCount)}</h1>
        <button onClick={() => setReplying(!replying)}>Reply</button>
      </div>

      {replying && (
        <PostForm parentId={commentId} threadId={threadId} getData={getData} />
      )}
    </>
  );
}

const Post = ({
  post,
  getData,
}: {
  post: Post;
  getData?: (threadId: string) => Promise<void>;
}) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg">
      <h1>{post.content}</h1>
      <p>{timeZoneFormatter(post.createdAt)}</p>

      <CommentActions
        commentId={post.id}
        replyCount={post.children.length}
        threadId={post.threadId}
        getData={getData}
      />

      {post.children && post.children.length > 0 && (
        <ChildrenPosts posts={post.children} getData={getData} />
      )}
    </div>
  );
};

export const ChildrenPosts = ({
  posts,
  getData,
}: {
  posts: Post[];
  getData?: (threadId: string) => Promise<void>;
}) => {
  return (
    <div className="container mx-auto">
      {posts.map((post: Post) => {
        return <Post post={post} key={post.id} getData={getData} />;
      })}
    </div>
  );
};
