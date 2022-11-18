import type { NextApiRequest, NextApiResponse } from 'next';
import { FormInputs } from '../../create';
import { prisma } from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any> // need to change this
) {
  if (req.method === 'POST') {
    const { threadTitle, content } = req.body as FormInputs;

    const result = await prisma.thread.create({
      data: {
        title: threadTitle,
        content: content,
      },
    });

    console.log('post result', result);

    return res.status(200).json({ status: 200 });
  }
}
