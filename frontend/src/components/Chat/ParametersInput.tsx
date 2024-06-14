interface IParametersInputComponentProps {
  maxTokens: number;
  setMaxTokens: (maxTokens: number) => void;
  topP: number;
  setTopP: (topP: number) => void;
  presencePenalty: number;
  setPresencePenalty: (presencePenalty: number) => void;
  frequencyPenalty: number;
  setFrequencyPenalty: (frequencyPenalty: number) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
  model: number;
  setModel: (model: number) => void;
}

const ParametersInputComponent = (props: IParametersInputComponentProps) => {
  return (
    <>
      <h3 className="mt-4 text-xl font-bold">Parameters</h3>
      <div className="mt-4 flex w-full flex-col flex-wrap items-start">
        <div className="flex flex-wrap [&>*]:mb-2 [&>*]:mr-2 [&>*]:w-48">
          <label className="input-group">
            <span>Max Tokens</span>
            <input
              onChange={(e) => props.setMaxTokens(parseInt(e.target.value))}
              step={100}
              type="number"
              min={100}
              max={2000}
              value={
                props.maxTokens > 2000
                  ? 2000
                  : props.maxTokens < 100
                  ? 100
                  : props.maxTokens
              }
              placeholder="500"
              className="input input-bordered"
            ></input>
          </label>

          <label className="input-group">
            <span>
              <a
                className="text-blue-500 underline hover:font-semibold"
                href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-top_p"
              >
                Top P
              </a>
            </span>
            <input
              onChange={(e) => props.setTopP(parseFloat(e.target.value))}
              step={0.1}
              type="number"
              min={0}
              max={1}
              value={props.topP > 1 ? 1 : props.topP < 0 ? 0 : props.topP}
              placeholder="1.0"
              className="input input-bordered"
            />
          </label>

          <label className="input-group">
            <span>
              <a
                className="text-blue-500 underline hover:font-semibold"
                href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-presence_penalty"
              >
                Presence Penalty
              </a>
            </span>
            <input
              onChange={(e) =>
                props.setPresencePenalty(parseFloat(e.target.value))
              }
              step={0.1}
              type="number"
              min={0}
              max={1}
              value={
                props.presencePenalty > 1
                  ? 1
                  : props.presencePenalty < 0
                  ? 0
                  : props.presencePenalty
              }
              placeholder="1.0"
              className="input input-bordered"
            />
          </label>

          <label className="input-group">
            <span>
              <a
                className="text-blue-500 underline hover:font-semibold"
                href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-presence_penalty"
              >
                Frequency Penalty
              </a>
            </span>
            <input
              onChange={(e) =>
                props.setFrequencyPenalty(parseFloat(e.target.value))
              }
              step={0.1}
              type="number"
              min={0}
              max={1}
              value={
                props.frequencyPenalty > 1
                  ? 1
                  : props.frequencyPenalty < 0
                  ? 0
                  : props.frequencyPenalty
              }
              placeholder="1.0"
              className="input input-bordered"
            />
          </label>

          <label className="input-group">
            <span>
              <a
                className="text-blue-500 underline hover:font-semibold"
                href="https://platform.openai.com/docs/api-reference/edits/create#edits/create-temperature"
              >
                Temperature
              </a>
            </span>
            <input
              onChange={(e) => props.setTemperature(parseFloat(e.target.value))}
              step={0.1}
              type="number"
              min={0}
              max={2}
              value={
                props.temperature > 2
                  ? 2
                  : props.temperature < 0
                  ? 0
                  : props.temperature
              }
              placeholder="1.0"
              className="input input-bordered"
            />
          </label>
        </div>

        <div>
          <label>Select Model</label>
          <select
            tabIndex={0}
            value={props.model}
            onChange={(e) => props.setModel(parseInt(e.target.value))}
            className="select select-bordered w-full max-w-xs"
          >
            <option value={0}>GPT-4o (default)</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ParametersInputComponent;
