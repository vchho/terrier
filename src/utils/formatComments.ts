export default function formPosts(comments: Array<any>) {
  const map = new Map();

  const roots: Array<any> = [];

  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i]?.id;

    map.set(commentId, i);

    comments[i].children = [];

    // Check if parentId is a string, if it does
    if (typeof comments[i]?.parentId === "string") {
      const parentCommentIndex: number = map.get(comments[i]?.parentId);

      comments[parentCommentIndex].children.push(comments[i]);

      continue;
    }

    roots.push(comments[i]);
  }

  console.log('roots', roots);

  return roots;
}
