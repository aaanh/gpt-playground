import { type NextPage } from "next"
import { useRouter } from "next/router";
import { useState } from "react"
import DefaultLayout from "~/layouts/DefaultLayout"

type Message = {
  speaker: "user" | "bot";
  msg: string;
}

const MultiTurn: NextPage = () => {
  // Conversation
  const [dialogue, setDialogue] = useState([]);
  const [input, setInput] = useState({
    speaker: "user",
    msg: "",
  });
  const [result, setResult] = useState({
    speaker: "bot",
    msg: "",
  });

  // Model Parameters
  const [model, setModel] = useState(0);
  const [temperature, setTemperature] = useState(1.0);
  const [loading, setLoading] = useState(false);

  const gptModel = ["gpt-4", "gpt-3.5-turbo", "text-davinci-003"];

  const router = useRouter();

  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      setResult("");
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: dialogue,
          model: gptModel[model],
          temperature: temperature,
        }),
      });

      const data = await response.json();

      setLoading(false)

      if (response.status === 429) {
        router.push("/ratelimited")
        throw (new Error(`${response.status}: Too Many Requests`))
      } else if (response.status !== 200) {
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
    <DefaultLayout>
      
    </DefaultLayout>
  )
}

export default MultiTurn