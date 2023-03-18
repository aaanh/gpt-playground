import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const SingleTurn: NextPage = () => {
  const [inputPrompt, setInputPrompt] = useState("");
  const [model, setModel] = useState(0);
  const [temperature, setTemperature] = useState(1.0);

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const gptModel = ["gpt-4", "gpt-3.5-turbo", "text-davinci-003"];

  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
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

      const data = await response.json();
      
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
      setResult(data.result.replace(regex, "<br>"));
      // setInputPrompt("");
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Single-Turn Chat</title>
        <meta name="description" content="aaanh's OpenAI Bench - Single-Turn Chat Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="flex min-h-screen w-screen justify-center"
        data-theme="light"
      >
        <div className="w-full p-4 md:w-1/2">
          <h3 className="text-2xl">Enter prompt</h3>
          <div className="mt-4 flex w-full flex-wrap items-center justify-between">
            <div>
              <label className="input-group">
                <span>Temperature</span>
                <input
                  onChange={(e) => setTemperature(parseFloat(e.target.value) > 2 ? 2 : parseFloat(e.target.value) < 0 ? 0 : parseFloat(e.target.value))}
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
              <option disabled selected>
                Select a GPT model
              </option>
              <option value={0}>GPT-4 (default)</option>
              <option value={1}>GPT-3.5</option>
              <option value={2}>Davinci-003 (GPT-3)</option>
            </select>
          </div>
          <br />
          <form className="flex flex-col items-center space-x-4 sm:flex-row">
            <textarea
              className="textarea-primary textarea w-full"
              name="prompt"
              placeholder=""
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
            ></textarea>
            <br></br>
            <button className={"btn " + (loading ? "btn-disabled" : "")} onClick={onSubmit}>
              Submit
            </button>
          </form>
            <br />
          
            <h2 className="text-2xl">Request Body</h2>
            <div className="break-inside overflow-scroll">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{"```json\n" + JSON.stringify({ prompt: inputPrompt, model: gptModel[model], temperature: temperature }, null, 2) + "\n```\n"}</ReactMarkdown>
          </div>
          <br/>
          <div className="text-2xl">Generated Response</div>
          {result ? (
            <div className="rounded bg-neutral-200 p-4 overflow-scroll">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {`${result}`}
              </ReactMarkdown>
            </div>
          ) : loading ? <div className="">Loading response...</div> : null}
        </div>
      </main>
    </>
  );
};

export default SingleTurn;
