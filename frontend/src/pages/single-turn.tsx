import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import DefaultLayout from "@/layouts/DefaultLayout";

type HistoryItem = {
  prompt: string;
  response: string;
};

const SingleTurn: NextPage = () => {
  // Prompt and Response
  const [inputPrompt, setInputPrompt] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // API Parameters
  const [model, setModel] = useState(0);
  const [temperature, setTemperature] = useState(1.0);
  const gptModel = ["gpt-4", "gpt-3.5-turbo", "text-davinci-003"];

  // Application
  const router = useRouter();

  // Runtime hooks
  useEffect(() => {
    const storedHistory = localStorage.getItem("history");
    if (localStorage.getItem("prompt")) {
      setInputPrompt(localStorage.getItem("prompt") || "");
    }
    if (storedHistory) {
      if (Array.isArray(JSON.parse(storedHistory))) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("prompt", inputPrompt);
  }, [inputPrompt]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Function definitions
  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      setResult("");
      setLoading(true);

      const response = await fetch("/api/ask-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputPrompt,
          model: gptModel[model],
          temperature: temperature,
        }),
      });

      localStorage.setItem("prompt", inputPrompt);
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
      setHistory([
        ...history,
        { prompt: inputPrompt, response: updatedResult },
      ]);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }

  function clearHistory() {
    setHistory([]);
    setInputPrompt("");
  }

  // End of Function definitions

  return (
    <DefaultLayout>
      <Head>
        <title>Single-Turn Prompt</title>
        <meta name="description" content="AAANH Labs" />
        <link rel="icon" href="/logo-color-variant.png" />
      </Head>
      <div className="w-full p-4 md:w-1/2">
        <h3 className="text-xl">Enter prompt</h3>
        <div className="mt-4 flex w-full flex-wrap items-center justify-between">
          <div>
            <label className="input-group">
              <span>Temperature</span>
              <input
                onChange={(e) =>
                  setTemperature(
                    parseFloat(e.target.value) > 2
                      ? 2
                      : parseFloat(e.target.value) < 0
                      ? 0
                      : parseFloat(e.target.value)
                  )
                }
                step={0.1}
                type="number"
                min={0}
                max={2}
                value={temperature > 2 ? 2 : temperature < 0 ? 0 : temperature}
                placeholder="1.0"
                className="input input-bordered"
              />
            </label>
          </div>

          <select
            tabIndex={0}
            value={model}
            onChange={(e) => setModel(parseInt(e.target.value))}
            className="select select-bordered w-full max-w-xs"
          >
            <option value={0}>GPT-4 (default)</option>
            <option value={1}>GPT-3.5</option>
            <option disabled value={2}>
              Davinci-003 (GPT-3)
            </option>
          </select>
        </div>
        <br />
        <form className="flex flex-col items-center md:items-start">
          <textarea
            className="textarea w-full resize-none border-blue-300 outline-none outline-1 focus:border-transparent focus:outline-blue-400"
            name="prompt"
            placeholder="Enter your dankest question here..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
          ></textarea>
          <br></br>
          <div className="flex flex-wrap space-x-2">
            <button
              className={
                "btn btn-outline btn-success normal-case " +
                (loading ? "btn-disabled" : "")
              }
              onClick={onSubmit}
            >
              Submit
            </button>
            <button
              className={"btn btn-outline btn-error normal-case"}
              onClick={(e) => {
                e.preventDefault();
                setInputPrompt("");
              }}
            >
              Clear
            </button>
          </div>
        </form>
        <br />

        <h2 className="text-xl">Request Body</h2>
        <ReactMarkdown
          className="break-word rounded bg-neutral-200 p-4"
          remarkPlugins={[remarkGfm]}
        >
          {"```json\n" +
            JSON.stringify(
              {
                prompt: inputPrompt,
                model: gptModel[model],
                temperature: temperature,
              },
              null,
              2
            ) +
            "\n```\n"}
        </ReactMarkdown>

        <br />
        <div className="text-xl">Generated Response</div>
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
        <br />

        <details className="">
          <summary className="font-bold">History (scrollable)</summary>
          <div className="max-h-64 overflow-y-scroll rounded-md border p-2">
            {history.length <= 0 && (
              <div className="text-xl italic text-neutral-500">
                💁‍♀️ There&apos;s nothing here. Yet.
              </div>
            )}
            {history.map((item, index) => (
              <div
                key={index}
                className="my-2 flex flex-col border-b-2 border-dotted"
              >
                <div className="my-2 flex w-full flex-col items-end">
                  <div className="max-w-lg font-bold">Prompt</div>
                  <div className="max-w-xl rounded-lg bg-blue-300 p-2">
                    {item.prompt}
                  </div>
                </div>
                <div className="my-2 flex w-full flex-col items-start">
                  <div className="max-w-sm font-bold">Response</div>
                  <div className="max-w-xl rounded-lg bg-neutral-300 p-2">
                    {item.response}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>
        <br></br>
        <button
          className="btn btn-info float-right normal-case"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>
    </DefaultLayout>
  );
};

export default SingleTurn;
