type Conversation = {
  conversation: [{role: string, text: string}]
}

function validateConversationJson(importedFile: File) {
  JSON.parse(importedFile)
}

export validateConversationJson