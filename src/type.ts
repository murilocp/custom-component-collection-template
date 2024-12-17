export type Chat = {
  id: string
  context: string
  createdAt: string
  customerId: string
  role: 'assistant' | 'attendant'
  updatedAt: string
}

export type Customer = {
  id: string
  name: string
  selfie: string
}

export type MessageStatuses =
  | 'read'
  | 'delivered'
  | 'sent'
  | 'processed'
  | 'failed'
export type MessageTypes = 'audio' | 'text' | 'document' | 'image'
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
  status: MessageStatuses
  failedReason?: string
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
  customer: Customer
  messages: MessageItem[]
}

export interface ApiResponse<T = object> {
  data?: T
  error?: string
  success: boolean
}
