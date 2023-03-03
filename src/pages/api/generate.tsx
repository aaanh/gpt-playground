import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const gptModel = {
  1: "gpt-3.5-turbo",
  2: "gpt-3.5-turbo-0301",
  3: "text-davinci-003",
  4: "code-davinci-002",
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  const inputPrompt = req.body.prompt || "";
  if (inputPrompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt.",
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: gptModel[1],
      messages: [
        {
          role: "user",
          content: inputPrompt,
        },
      ],
    });
    res
      .status(200)
      .json({ result: completion.data.choices[0]?.message?.content });
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

function generatePrompt(inputPrompt: string) {
  return `${inputPrompt}`;
}
