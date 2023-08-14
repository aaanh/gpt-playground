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
  const [maxTokens, setMaxTokens] = useState(500);
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
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
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

  const handleExportConversation = (e: any) => {
    e.preventDefault();
    const dateTime = new Date().toISOString();
    if (localStorage.conversation) {
      const conversation = localStorage.conversation;
      const blob = new Blob([conversation], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `conversation-${dateTime}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No conversation to export.");
    }
  };

  const handleImportConversation = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const conversation = JSON.parse(reader.result as string);
      setConversation(conversation);
    };
    reader.readAsText(file);
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

        <div className="mt-8">
          <h2 className="text-xl font-bold">Data IO</h2>
          <div className="flex flex-col items-start space-y-2">
            <input
              onChange={handleImportConversation}
              className="file-input file-input-secondary normal-case"
              type="file"
              accept=".json"
              name="Import conversation.json"
              // disabled={true}
            />

            <button
              onClick={handleExportConversation}
              className="btn-outline btn normal-case"
            >
              Export conversation (.json)
            </button>
          </div>
        </div>

        <ParametersInputComponent
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          topP={topP}
          setTopP={setTopP}
          presencePenalty={presencePenalty}
          setPresencePenalty={setPresencePenalty}
          frequencyPenalty={frequencyPenalty}
          setFrequencyPenalty={setFrequencyPenalty}
          temperature={temperature}
          setTemperature={setTemperature}
          model={model}
          setModel={setModel}
        ></ParametersInputComponent>

        <br />

        <RequestBodyComponent
          input={input}
          maxTokens={maxTokens}
          topP={topP}
          presencePenalty={presencePenalty}
          frequencyPenalty={frequencyPenalty}
          temperature={temperature}
          model={model}
          gptModel={gptModel}
        ></RequestBodyComponent>

        <br />

        <RawResponseComponent
          result={result}
          loading={loading}
        ></RawResponseComponent>

        <br></br>
      </div>
    </DefaultLayout>
  );
};

interface IParametersInputComponentProps {
  maxTokens: number;
  setMaxTokens: (maxTokens: number) => void;
  topP: number;
  setTopP: (topP: number) => void;
  presencePenalty: number;
  setPresencePenalty: (presencePenalty: number) => void;
  frequencyPenalty: number;
  setFrequencyPenalty: (frequencyPenalty: number) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
  model: number;
  setModel: (model: number) => void;
}

const ParametersInputComponent = (props: IParametersInputComponentProps) => {
  return (
    <>
      <h3 className="mt-4 text-xl font-bold">Parameters</h3>
      <div className="mt-4 flex w-full flex-col flex-wrap items-start">
        <div className="flex flex-wrap [&>*]:mb-2 [&>*]:mr-2 [&>*]:w-48">
          <label className="input-group">
            <span>Max Tokens</span>
            <input
              onChange={(e) => props.setMaxTokens(parseInt(e.target.value))}
              step={100}
              type="number"
              min={100}
              max={2000}
              value={
                props.maxTokens > 2000
                  ? 2000
                  : props.maxTokens < 100
                  ? 100
                  : props.maxTokens
              }
              placeholder="500"
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
              onChange={(e) => props.setTopP(parseFloat(e.target.value))}
              step={0.1}
              type="number"
              min={0}
              max={1}
              value={props.topP > 1 ? 1 : props.topP < 0 ? 0 : props.topP}
              placeholder="1.0"
              className="input-bordered input"
            />
          </label>

          <label className="input-group">
            <span>
              <a
                className="text-blue-500 underline hover:font-semibold"
                href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-presence_penalty"
              >
                Presence Penalty
              </a>
            </span>
            <input
              onChange={(e) =>
                props.setPresencePenalty(parseFloat(e.target.value))
              }
              step={0.1}
              type="number"
              min={0}
              max={1}
              value={
                props.presencePenalty > 1
                  ? 1
                  : props.presencePenalty < 0
                  ? 0
                  : props.presencePenalty
              }
              placeholder="1.0"
              className="input-bordered input"
            />
          </label>

          <label className="input-group">
            <span>
              <a
                className="text-blue-500 underline hover:font-semibold"
                href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-presence_penalty"
              >
                Frequency Penalty
              </a>
            </span>
            <input
              onChange={(e) =>
                props.setFrequencyPenalty(parseFloat(e.target.value))
              }
              step={0.1}
              type="number"
              min={0}
              max={1}
              value={
                props.frequencyPenalty > 1
                  ? 1
                  : props.frequencyPenalty < 0
                  ? 0
                  : props.frequencyPenalty
              }
              placeholder="1.0"
              className="input-bordered input"
            />
          </label>

          <label className="input-group">
            <span>
              <a
                className="text-blue-500 underline hover:font-semibold"
                href="https://platform.openai.com/docs/api-reference/edits/create#edits/create-temperature"
              >
                Temperature
              </a>
            </span>
            <input
              onChange={(e) => props.setTemperature(parseFloat(e.target.value))}
              step={0.1}
              type="number"
              min={0}
              max={2}
              value={
                props.temperature > 2
                  ? 2
                  : props.temperature < 0
                  ? 0
                  : props.temperature
              }
              placeholder="1.0"
              className="input-bordered input"
            />
          </label>
        </div>

        <div>
          <label>Select Model</label>
          <select
            tabIndex={0}
            value={props.model}
            onChange={(e) => props.setModel(parseInt(e.target.value))}
            className="select-bordered select w-full max-w-xs"
          >
            <option value={0}>GPT-4 (default)</option>
            <option disabled value={1}>
              GPT-3.5 (deprecated)
            </option>
            <option disabled value={2}>
              Davinci-003 (GPT-3) (deprecated)
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

interface IRequestBodyComponentProps {
  maxTokens: number;
  topP: number;
  presencePenalty: number;
  frequencyPenalty: number;
  input: string;
  temperature: number;
  model: number;
  gptModel: string[];
}

const RequestBodyComponent = (props: IRequestBodyComponentProps) => {
  return (
    <>
      <h2 className="text-xl font-bold">Request Body</h2>
      <ReactMarkdown
        className="break-word rounded bg-neutral-200 p-4"
        remarkPlugins={[remarkGfm]}
      >
        {"```json\n" +
          JSON.stringify(
            {
              max_tokens: props.maxTokens,
              top_p: props.topP,
              presence_penalty: props.presencePenalty,
              frequency_penalty: props.frequencyPenalty,
              temperature: props.temperature,
              model: props.gptModel[props.model],
              prompt: props.input,
            },
            null,
            2
          ) +
          "\n```\n"}
      </ReactMarkdown>
    </>
  );
};

interface IRawResponseComponentProps {
  loading: boolean;
  result: string;
}

const RawResponseComponent = (props: IRawResponseComponentProps) => {
  return (
    <>
      <div className="flex text-xl font-bold">Raw Response</div>
      {props.result ? (
        <div className="rounded bg-neutral-200">
          <ReactMarkdown
            className="break-word rounded bg-neutral-200 p-4"
            remarkPlugins={[remarkGfm]}
          >
            {"```json\n" +
              JSON.stringify(
                {
                  response: `${props.result}`,
                },
                null,
                2
              ) +
              "\n```\n"}
          </ReactMarkdown>
        </div>
      ) : props.loading ? (
        <div className="flex items-center justify-center space-x-2 bg-neutral-200 p-4">
          <img
            width={32}
            height={32}
            className="bg-transparent"
            src="/loader.gif"
          ></img>
          <div>Loading response...</div>
        </div>
      ) : (
        <div className="rounded bg-neutral-200 p-4">Nothing here yet!</div>
      )}
    </>
  );
};

export default MultiTurn;
