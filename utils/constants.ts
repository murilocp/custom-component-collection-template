export const CUSTOMERS = 'cas/customers/'
export const SEND_MESSAGE = 'cms/messages/send-message'
export const MESSAGES = 'cms/messages'
export const UPDATE_CHAT_ROLE = 'cms/chats/update-chat-role'

export const errorHandler = (code: number) => {
  switch (code) {
    case 15001:
      return 'Usuário não encontrado'
    case 15002:
      return 'Parâmetros inválidos'
    case 15003:
      return 'Chat não sequestrado ou inativo'
    default:
      return 'Erro interno de servidor'
  }
}
