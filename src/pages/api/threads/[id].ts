import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const result = await prisma.thread.findUnique({
        where: {
          id: id?.toString(),
        },
        include: {
          Posts: true,
        },
      });

      return res.status(200).json(result);
    } catch (e) {
      console.log("Can't get specific thread");
    }
  } else if (req.method === "POST") {
    try {
      const { content, parentId } = req.body;
      console.log("req.body", req.body);
      const { id } = req.query;
      console.log('threadId', id);

      await prisma.post.create({
        data: {
          content: content,
          threadId: id as string,
          ...(parentId && {
            parentId: parentId,
          }),
        },
      });

      return res.status(200).json({ success: true });
    } catch (e) {
      console.log("can't post to thread");
    }
  }
}
