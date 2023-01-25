import { NextApiRequest, NextApiResponse } from "next";

const url = "http://10.0.0.236:8080"

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const body = {
    "text": "",
    "generate_tokens_limit": 150,
    "top_p": 0.7,
    "top_k": 0,
    "temperature": 1.0
  }

  const input = req.body.prompt || '';

  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt."
      }
    })
    return;
  }

  try {
    const completion = await fetch()
  }
}