import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI();

type ResponseData = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const completion = await openai.chat.completions.create({
      model: req.body.model,
      temperature: req.body.temperature,
      n: req.body.choices,
      messages: req.body.conversation,
      max_tokens: req.body.maxTokens,
      top_p: req.body.top_p,
      presence_penalty: req.body.presencePenalty,
      frequency_penalty: req.body.frequencyPenalty,
    });
    res
      .status(200)
      .json({ result: `${completion.choices[0].message.content}` });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        result: "An error occurred during your request.",
      });
    }
  }
}
