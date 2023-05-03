import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import DefaultLayout from "~/layouts/DefaultLayout";

type ConversationTurn = {
  role: string | "user" | "agent";
  content: string;
};

const MultiTurn: NextPage = () => {
  // Prompt and Response
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // API Parameters
  const [model, setModel] = useState(0);
  const [temperature, setTemperature] = useState(1.0);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [topP, setTopP] = useState(1.0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0);
  const [presencePenalty, setPresencePenalty] = useState(0.0);
  // GPT Model Selection
  const gptModel = ["gpt-4", "gpt-3.5-turbo", "text-davinci-003"];

  // Application
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("user", input);
  }, [input]);

  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  // Function definitions
  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      setResult("");
      setLoading(true);

      const userInput = {
        role: "user",
        content: input,
      };

      setConversation([
        ...conversation,
        { role: userInput.role, content: userInput.content },
      ]);

      const tmpConversation = conversation;
      tmpConversation.push(userInput);

      const response = await fetch("/api/chat-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: tmpConversation,
          model: gptModel[model],
          temperature: temperature,
          max_tokens: maxTokens,
        }),
      });

      localStorage.setItem("user", input);
      const data = await response.json();

      setLoading(false);

      if (response.status === 429) {
        router.push("/ratelimited");
        throw new Error(`${response.status}: Too Many Requests`);
      } else if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
      const updatedResult = data.result.replace(regex, "<br>");

      setResult(updatedResult);
      setConversation([
        ...conversation,
        { role: "assistant", content: updatedResult },
      ]);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }

  const clearConversation = (e: any) => {
    e.preventDefault();
    setConversation([]);
    setInput("");
  };

  // End of Function definitions

  return (
    <DefaultLayout>
      <Head>
        <title>Multi-Turn Chat</title>
        <meta name="description" content="AAANH Labs" />
        <link rel="icon" href="/logo-color-variant.png" />
      </Head>
      <div className="w-full p-4 md:w-1/2">
        <details className="" open>
          <summary className="font-bold">Conversation (scrollable)</summary>
          <div className="max-h-64 overflow-y-scroll rounded-md border p-2">
            {conversation.length <= 0 && (
              <div className="text-md my-2 italic text-neutral-500">
                💁‍♀️ There&apos;s nothing here. Yet.
              </div>
            )}
            {conversation.map((item, index) => (
              <div
                key={index}
                className="my-2 flex flex-col border-b-2 border-dotted"
              >
                {index % 2 === 0 && (
                  <div className="my-2 flex w-full flex-col items-end">
                    <div className="max-w-lg font-bold capitalize">
                      {item.role}
                    </div>
                    <div className="max-w-xl rounded-lg bg-blue-300 p-2">
                      {item.content}
                    </div>
                  </div>
                )}
                {index % 2 !== 0 && (
                  <div className="my-2 flex w-full flex-col items-start">
                    <div className="max-w-sm font-bold capitalize">
                      {item.role}
                    </div>
                    <div className="max-w-xl rounded-lg bg-neutral-300 p-2">
                      <ReactMarkdown
                        className="markdown"
                        remarkPlugins={[remarkGfm]}
                      >
                        {item.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </details>
        <br></br>

        {/* PROMPT ENTRY SECTION */}

        <h3 className="text-xl">Enter chat message</h3>
        <form className="flex flex-col items-center md:items-start">
          <textarea
            className="textarea w-full resize-none border-blue-300 outline-none outline-1 focus:border-transparent focus:outline-blue-400"
            name="prompt"
            placeholder="Enter your dankest question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <br></br>
          <div className="flex flex-col flex-wrap space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
            <button
              className={
                "btn-success btn w-48 normal-case " +
                (loading ? "btn-disabled" : "")
              }
              onClick={onSubmit}
            >
              Submit
            </button>
            <button
              className={"btn-outline btn-warning btn normal-case"}
              onClick={(e) => {
                e.preventDefault();
                setInput("");
              }}
            >
              Clear Input
            </button>
            <button
              className="btn-outline btn-error btn float-right normal-case"
              onClick={(e) => clearConversation(e)}
            >
              Reset Conversation
            </button>
          </div>
        </form>
        {/*  */}
        <h3 className="mt-4 text-xl">Parameters</h3>

        {/*
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty,
        */}

        <div className="mt-4 flex w-full flex-wrap items-center space-y-2 xl:space-y-0 xl:space-x-2">
          <div className="flex flex-wrap space-y-2">
            <label className="input-group">
              <span>Max Tokens</span>
              <input
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                step={100}
                type="number"
                min={100}
                max={2000}
                value={
                  maxTokens > 2000 ? 2000 : maxTokens < 100 ? 100 : maxTokens
                }
                placeholder="1000"
                className="input-bordered input"
              ></input>
            </label>

            <label className="input-group">
              <span>
                <a
                  className="text-blue-500 underline hover:font-semibold"
                  href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-top_p"
                >
                  Top P
                </a>
              </span>
              <input
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                step={0.1}
                type="number"
                min={0}
                max={1}
                value={topP > 1 ? 1 : topP < 0 ? 0 : topP}
                placeholder="1.0"
                className="input-bordered input"
              />
            </label>

            <label className="input-group">
              <span>
                <a href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-presence_penalty">
                  Presence Penalty
                </a>
              </span>
              <input
                onChange={(e) => setPresencePenalty(parseFloat(e.target.value))}
                step={0.1}
                type="number"
                min={0}
                max={1}
                value={
                  presencePenalty > 1
                    ? 1
                    : presencePenalty < 0
                    ? 0
                    : presencePenalty
                }
                placeholder="1.0"
                className="input-bordered input"
              />
            </label>

            <label className="input-group">
              <span>
                <a href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-presence_penalty">
                  Frequency Penalty
                </a>
              </span>
              <input
                onChange={(e) =>
                  setFrequencyPenalty(parseFloat(e.target.value))
                }
                step={0.1}
                type="number"
                min={0}
                max={1}
                value={
                  frequencyPenalty > 1
                    ? 1
                    : frequencyPenalty < 0
                    ? 0
                    : frequencyPenalty
                }
                placeholder="1.0"
                className="input-bordered input"
              />
            </label>

            <label className="input-group">
              <span>Temperature</span>
              <input
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                step={0.1}
                type="number"
                min={0}
                max={2}
                value={temperature > 2 ? 2 : temperature < 0 ? 0 : temperature}
                placeholder="1.0"
                className="input-bordered input"
              />
            </label>
          </div>

          <select
            tabIndex={0}
            value={model}
            onChange={(e) => setModel(parseInt(e.target.value))}
            className="select-bordered select w-full max-w-xs"
          >
            <option value={0}>GPT-4 (default)</option>
            <option value={1}>GPT-3.5</option>
            <option disabled value={2}>
              Davinci-003 (GPT-3)
            </option>
          </select>
        </div>

        {/* NERD SECTION */}

        <br />
        <h2 className="text-xl">Request Body</h2>
        <ReactMarkdown
          className="break-word rounded bg-neutral-200 p-4"
          remarkPlugins={[remarkGfm]}
        >
          {"```json\n" +
            JSON.stringify(
              {
                max_tokens: maxTokens,
                top_p: topP,
                presence_penalty: presencePenalty,
                frequency_penalty: frequencyPenalty,
                temperature: temperature,
                model: gptModel[model],
                prompt: input,
              },
              null,
              2
            ) +
            "\n```\n"}
        </ReactMarkdown>
        <br />
        {/* <div className="text-xl">Generated Response</div>
        {result ? (
          <div className="overflow-scroll rounded bg-neutral-200 p-4">
            <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
              {`${result}`}
            </ReactMarkdown>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center space-x-2">
            <img
              width={32}
              height={32}
              className="bg-transparent"
              src="/loader.gif"
            ></img>
            <div>Loading response...</div>
          </div>
        ) : null}
        <br></br> */}
        <div className="font-mono text-xl">Raw Response</div>
        {result ? (
          <div className="rounded bg-neutral-200">
            <ReactMarkdown
              className="break-word rounded bg-neutral-200 p-4"
              remarkPlugins={[remarkGfm]}
            >
              {"```json\n" +
                JSON.stringify(
                  {
                    response: `${result}`,
                  },
                  null,
                  2
                ) +
                "\n```\n"}
            </ReactMarkdown>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center space-x-2">
            <img
              width={32}
              height={32}
              className="bg-transparent"
              src="/loader.gif"
            ></img>
            <div>Loading response...</div>
          </div>
        ) : null}
        <br></br>
      </div>
    </DefaultLayout>
  );
};

export default MultiTurn;
