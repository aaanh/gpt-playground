import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type ConversationTurn } from "@/pages/multi-turn";

interface IConversationComponentProps {
  conversation: ConversationTurn[];
}

const ConversationComponent = (props: IConversationComponentProps) => {
  return (
    <details className="" open>
      <summary className="font-bold">Conversation (scrollable)</summary>
      <div className="max-h-64 overflow-y-scroll rounded-md border p-2">
        {props.conversation.length <= 0 && (
          <div className="text-md my-2 italic text-neutral-500">
            💁‍♀️ There&apos;s nothing here. Yet.
          </div>
        )}
        {props.conversation.map((item, index) => (
          <div
            key={index}
            className="my-2 flex flex-col border-b-2 border-dotted"
          >
            {index % 2 === 0 && (
              <div className="my-2 flex w-full flex-col items-end">
                <div className="max-w-lg font-bold capitalize">{item.role}</div>
                <div className="max-w-xl rounded-lg bg-blue-300 p-2">
                  {item.content}
                </div>
              </div>
            )}
            {index % 2 !== 0 && (
              <div className="my-2 flex w-full flex-col items-start">
                <div className="max-w-sm font-bold capitalize">{item.role}</div>
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
  );
};

export default ConversationComponent;
