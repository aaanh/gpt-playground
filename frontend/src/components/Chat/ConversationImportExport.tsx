/* eslint-disable @typescript-eslint/no-explicit-any */
interface IConversationImportExportComponentProps {
  handleImportConversation: (e: any) => void;
  handleExportConversation: (e: any) => void;
}

const ConversationImportExportComponent = (props: IConversationImportExportComponentProps) => {
  return <div className="mt-8">
          <h2 className="text-xl font-bold">Data IO</h2>
          <div className="flex flex-col items-start space-y-2">
            <input
              onChange={props.handleImportConversation}
              className="file-input-secondary file-input normal-case"
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