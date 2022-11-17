import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any> // need to change this
) {
  if (req.method === "POST") {
    console.log("backend endpoint hit");
  }
}
