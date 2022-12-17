import { describe, expect, it } from "vitest";
import formPosts from "../utils/formatComments";

const posts = [
  {
    id: "clbqvy95l00011er0hsngbs9a",
    content: "This is a post",
    threadId: "claz084ge00071e6k7d9az7ss",
    createdAt: "2022-12-16T19:10:38.551Z",
    parentId: null,
  },
  {
    id: "clbqvyfnb00021er0f0arqr61",
    content: "Yes, yes it is...",
    threadId: "claz084ge00071e6k7d9az7ss",
    createdAt: "2022-12-16T19:10:46.967Z",
    parentId: "clbqvy95l00011er0hsngbs9a",
  },
  {
    id: "clbqvyvw700041er0e4girmq8",
    content:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    threadId: "claz084ge00071e6k7d9az7ss",
    createdAt: "2022-12-16T19:11:08.024Z",
    parentId: null,
  },
];

describe("format comments", () => {
  it("should nest children comments", () => {
    // @ts-ignore
    expect(formPosts(posts)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [],
              "content": "Yes, yes it is...",
              "createdAt": "2022-12-16T19:10:46.967Z",
              "id": "clbqvyfnb00021er0f0arqr61",
              "parentId": "clbqvy95l00011er0hsngbs9a",
              "threadId": "claz084ge00071e6k7d9az7ss",
            },
          ],
          "content": "This is a post",
          "createdAt": "2022-12-16T19:10:38.551Z",
          "id": "clbqvy95l00011er0hsngbs9a",
          "parentId": null,
          "threadId": "claz084ge00071e6k7d9az7ss",
        },
        {
          "children": [],
          "content": "\\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\"",
          "createdAt": "2022-12-16T19:11:08.024Z",
          "id": "clbqvyvw700041er0e4girmq8",
          "parentId": null,
          "threadId": "claz084ge00071e6k7d9az7ss",
        },
      ]
    `);
  });
});
