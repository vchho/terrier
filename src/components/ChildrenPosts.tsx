import { useState } from "react";
import { timeZoneFormatter } from "../utils/timeZoneFormatter";
import PostForm from "./PostForm";

interface Post {
  children: any[];
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
  threadId
}: {
  commentId: string;
  replyCount: number;
  threadId: string;
}) {
  const [replying, setReplying] = useState(false);

  return (
    <>
      <div>
        <h1>{getReplyCountText(replyCount)}</h1>
        <button onClick={() => setReplying(!replying)}>Reply</button>
      </div>

      {replying && <PostForm parentId={commentId} threadId={threadId}/>}
    </>
  );
}

const Post = ({ post }: { post: Post }) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg">
      <h1>{post.content}</h1>
      <p>{timeZoneFormatter(post.createdAt)}</p>

      <CommentActions commentId={post.id} replyCount={post.children.length} threadId={post.threadId}/>

      {post.children && post.children.length > 0 && (
        <ChildrenPosts posts={post.children} />
      )}
    </div>
  );
};

export const ChildrenPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="container mx-auto">
      {posts.map((post: Post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};
