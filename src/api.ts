import {
  MESSAGES,
  SEND_MESSAGE,
  UPDATE_CHAT_ROLE,
  errorHandler
} from '../utils/constants'
import {
  ApiResponse,
  ChatResponse,
  MessageItem,
  SendMessagePayload
} from './type'

export const baseUrl = 'https://sandbox.starw.services/api/v1/'

export const getMessages = async (
  customerId: string,
  token: string
): Promise<ApiResponse<ChatResponse>> => {
  try {
    const url = `${baseUrl}${MESSAGES}?customer-id=${customerId}`
    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`
    }

    const response = await fetch(url, {
      headers
    })
    const data = (await response.json()) as ChatResponse

    return { data, success: true }
  } catch (e) {
    console.error(e)

    return { error: e as string, success: false }
  }
}

export const kidnapChat = async (
  customerId: string,
  token: string,
  kidnapped = true
): Promise<ApiResponse<object>> => {
  try {
    const url = `${baseUrl}${UPDATE_CHAT_ROLE}?customer-id=${customerId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ kidnapped })
    })
    const data = await response.json()

    if (data.error?.code) {
      return { error: errorHandler(data.error.code), success: false }
    }

    return { data, success: true }
  } catch (e) {
    console.error(e)
    return { error: JSON.stringify(e), success: false }
  }
}

export const sendMessage = async (
  payload: SendMessagePayload,
  token: string
): Promise<ApiResponse<MessageItem>> => {
  try {
    const { customerId, message, type } = payload
    const url = `${baseUrl}${SEND_MESSAGE}?customer-id=${customerId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, type })
    })
    const data = await response.json()
    console.log({ data })

    if (data.error?.code) {
      return { error: errorHandler(data.error.code), success: false }
    }

    return { data, success: true }
  } catch (e) {
    return { error: JSON.stringify(e), success: false }
  }
}
