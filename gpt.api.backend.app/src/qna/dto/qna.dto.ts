export class QnaQueryDto {
  messages: [QnaMessage] = [new QnaMessage()];
  model: TextGenModel = TextGenModel.gpt4;
  temperature: number = 1;
  numResults: number = 1;
}

export class QnaResponseDto {
  id: string;
  object: 'chat.completion';
  created: number;
  model: TextGenModel;
  usage: Usage;
  choices: [Choice];
}

class Choice {
  message: QnaMessage;
  finishReason: string;
  index: number;
}

class Usage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

class QnaMessage {
  role: string = 'user';
  content: string = '';
}

enum TextGenModel {
  gpt4 = 'gpt-4',
  gpt3 = 'gpt-3.5-turbo',
}
