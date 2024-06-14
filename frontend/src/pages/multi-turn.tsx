/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";

import ConversationComponent from "@/components/Chat/Conversation";
import ConversationImportExportComponent from "@/components/Chat/ConversationImportExport";
import RawResponseComponent from "@/components/Chat/RawResponse";
import ParametersInputComponent from "@/components/Chat/ParametersInput";
import RequestBodyComponent from "@/components/Chat/RequestBody";
import PromptEntry from "@/components/Chat/PromptEntry";

export type ConversationTurn = {
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
  const gptModel = ["gpt-4o"];

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
        <ConversationComponent
          conversation={conversation}
        ></ConversationComponent>
        <br></br>

        {/* PROMPT ENTRY SECTION */}
        <PromptEntry
          onSubmit={onSubmit}
          clearConversation={clearConversation}
          setInput={setInput}
          input={input}
          loading={loading}
        ></PromptEntry>

        <ConversationImportExportComponent
          handleImportConversation={handleImportConversation}
          handleExportConversation={handleExportConversation}
        ></ConversationImportExportComponent>

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

export default MultiTurn;
