import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  console.log(req.body);

  const conversation = req.body.conversation || "";
  const reqModel: string = req.body.model || "gpt-4";
  const temperature = req.body.temperature || 1;
  const choices = 1;
  const maxTokens = req.body.maxTokens || 1000;
  const top_p = req.body.topP || 1;
  const presencePenalty = req.body.presencePenalty || 0;
  const frequencyPenalty = req.body.frequencyPenalty || 0;

  // @TODO: Add support for logit_bias

  try {
    const completion = await openai.createChatCompletion({
      model: reqModel,
      temperature: temperature,
      n: choices,
      messages: conversation,
      max_tokens: maxTokens,
      top_p: top_p,
      presence_penalty: presencePenalty,
      frequency_penalty: frequencyPenalty,
    });
    res
      .status(200)
      .json({ result: `${completion.data.choices[0]?.message?.content}` });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
