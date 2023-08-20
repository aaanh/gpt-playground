/* eslint-disable @typescript-eslint/no-explicit-any */
interface IConversationImportExportComponentProps {
  handleImportConversation: (e: any) => void;
  handleExportConversation: (e: any) => void;
}

const ConversationImportExportComponent = (props: IConversationImportExportComponentProps) => {
  return <div className="mt-8">
          <h2 className="text-xl font-bold">Data IO</h2>
          <div className="flex flex-col items-start space-y-2 max-w-xs">
            <input
              onChange={props.handleImportConversation}
              className="file-input normal-case w-full file-input-bordered"
              type="file"
              accept=".json"
              name="Import conversation.json"
              // disabled={true}
            />

            <button
              onClick={props.handleExportConversation}
              className="btn-outline btn normal-case"
            >
              Export conversation (.json)
            </button>
          </div>
        </div>
}

export default ConversationImportExportComponent;