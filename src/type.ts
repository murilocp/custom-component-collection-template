export type Chat = {
  id: string
  context: string
  createdAt: string
  customerId: string
  role: string
  updatedAt: string
}

export type MessageTypes = 'audio' | 'text' | 'document'
export type MessageRole = 'assistant' | 'user'

export type MessageItem = {
  id: string
  replyReference: string
  role: MessageRole
  type: MessageTypes
  context: string
  content: string
  mediaPath: string
  metaMessageId: string
  sent: boolean
  status: string
  createdAt: string
  updatedAt: string
}

export type SendMessagePayload = {
  customerId: string
  message: string
  type: MessageTypes
}

export interface ChatResponse {
  chat: Chat
  messages: MessageItem[]
}

export interface ApiResponse<T = object> {
  data?: T
  error?: string
  success: boolean
}

export interface CustomerInfo {
  id: string
  name: string
  vatNumber: string
  selfie: string
  phoneNumber: string
  gender: string
  maritalStatus: string
  dateBirth: string
  notes: string
  status: string
  createdAt: string
  updatedAt: string
}
