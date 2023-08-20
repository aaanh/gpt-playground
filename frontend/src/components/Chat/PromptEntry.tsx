/* eslint-disable @typescript-eslint/no-explicit-any */
interface PromptEntryProps {
  setInput: (input: string) => void;
  input: string;
  onSubmit: (e: any) => void;
  clearConversation: (e: any) => void;
  loading: boolean;
}

const PromptEntry = (props: PromptEntryProps) => {
  return <form className="flex flex-col items-center md:items-start">
          <textarea
            className="textarea w-full resize-none border-blue-300 outline-none outline-1 focus:border-transparent focus:outline-blue-400"
            name="prompt"
            placeholder="Enter your dankest question here..."
            value={props.input}
            onChange={(e) => props.setInput(e.target.value)}
          ></textarea>
          <br></br>
          <div className="flex flex-col flex-wrap space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
            <button
              className={
                "btn-success btn w-48 normal-case " +
                (props.loading ? "btn-disabled" : "")
              }
              onClick={props.onSubmit}
            >
              Submit
            </button>
            <button
              className={"btn-outline btn-warning btn normal-case"}
              onClick={(e) => {
                e.preventDefault();
                props.setInput("");
              }}
            >
              Clear Input
            </button>
            <button
              className="btn-outline btn-error btn float-right normal-case"
              onClick={(e) => props.clearConversation(e)}
            >
              Reset Conversation
            </button>
          </div>
        </form>
}

export default PromptEntry;