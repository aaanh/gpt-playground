import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.status(429).json({
    error: {
      message: "Too many requests.",
    },
  });
}