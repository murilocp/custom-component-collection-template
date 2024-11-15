import { MESSAGES, SEND_MESSAGE, UPDATE_CHAT_ROLE } from '../utils/constants'
import {
  ApiResponse,
  ChatResponse,
  CustomerInfo,
  MessageItem,
  SendMessagePayload
} from './type'

export const baseUrl = 'https://sandbox.starw.services/api/v1/cms/customers/'

export const getCustomerInfo = async (
  customerId: string,
  token: string
): Promise<ApiResponse<CustomerInfo>> => {
  try {
    const response = await fetch(`${baseUrl}${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = (await response.json()) as CustomerInfo

    return { data, success: true }
  } catch (e) {
    console.error(e)

    return { error: JSON.stringify(e), success: false }
  }
}

export const getMessages = async (
  customerId: string,
  token: string
): Promise<ApiResponse<ChatResponse>> => {
  try {
    const response = await fetch(`${baseUrl}${customerId}${MESSAGES}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = (await response.json()) as ChatResponse

    return { data, success: true }
  } catch (e) {
    console.error(e)

    return { error: JSON.stringify(e), success: false }
  }
}

export const kidnapChat = async (
  customerId: string,
  token: string,
  kidnapped = true
): Promise<ApiResponse<object>> => {
  try {
    const response = await fetch(`${baseUrl}${customerId}${UPDATE_CHAT_ROLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ kidnapped })
    })
    const data = await response.json()

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
    const response = await fetch(`${baseUrl}${customerId}${SEND_MESSAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ message, type })
    })
    const data = await response.json()

    return { data, success: true }
  } catch (e) {
    console.error(e)
    return { error: JSON.stringify(e), success: false }
  }
}
