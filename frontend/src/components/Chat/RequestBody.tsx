import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

export default RequestBodyComponent;