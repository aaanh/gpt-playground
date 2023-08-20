/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

export default RawResponseComponent;