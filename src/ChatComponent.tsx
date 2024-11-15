import React, { useEffect, useRef, useState } from 'react'
import { type FC } from 'react'

import { Retool } from '@tryretool/custom-component-support'

import styles from './ChatComponent.module.scss'
import { getCustomerInfo, getMessages, kidnapChat, sendMessage } from './api'
import { CustomerInfo, MessageItem, MessageTypes } from './type'
import MessageBox from './MessageBox'
import MessageInput from './MessageInput'

export const ChatComponent: FC = () => {
  const [customerId] = Retool.useStateString({
    name: 'customerId'
  })
  const [token] = Retool.useStateString({
    name: 'token'
  })

  const messageChat = useRef<HTMLDivElement | null>(null)

  const [hasScrolled, setHasScrolled] = useState(false)
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [customer, setCustomer] = useState<CustomerInfo | null>(null)

  const scrollToLastMessage = () => {
    if (messageChat.current) {
      messageChat.current.scrollTop = messageChat.current?.scrollHeight
      messageChat.current.scroll({
        behavior: 'smooth',
        top: messageChat.current?.scrollHeight
      })
    }
  }

  const handleSendMessage = async (message: string, type: MessageTypes) => {
    const response = await sendMessage({ customerId, message, type }, token)

    if (response.success) {
      await fetchData()
    }
  }

  const fetchData = async () => {
    const response = await getMessages(customerId, token)

    setMessages((prevState) => {
      const currentLength = response?.data?.messages?.length || 0
      if (prevState.length < currentLength) {
        if (!hasScrolled) {
          scrollToLastMessage()
        }
      }
      return response?.data?.messages || []
    })
  }

  const initializeChat = async () => {
    await kidnapChat(customerId, token)

    const response = await getCustomerInfo(customerId, token)

    setCustomer(response?.data || null)
  }

  const finalizeChat = () => {
    //  console.log('Finalizing chat')
    kidnapChat(customerId, token, false)
  }

  const onScroll = () => {
    if (!hasScrolled) {
      setHasScrolled(true)
    }
  }

  useEffect(() => {
    initializeChat()
    fetchData()

    const interval = setInterval(() => {
      //  console.log('Fetching data...')
      fetchData()
    }, 1000 * 5)

    return () => {
      clearInterval(interval)
      finalizeChat()
    }
  }, [])

  return (
    <div className={styles.chatWrapper}>
      <div
        ref={messageChat}
        className={styles.chatMessages}
        onScroll={onScroll}
      >
        {messages.map((item, index) => {
          const lastMessageSameUser =
            index > 0 ? messages[index - 1].role === item.role : false

          return (
            <div key={item.id}>
              <MessageBox
                imageSrc={customer?.selfie || ''}
                role={item.role || 'assistant'}
                lastMessageSameUser={lastMessageSameUser}
                messageContent={item.content}
                mediaPath={item.mediaPath}
                date={item.createdAt}
                type={item.type}
              />
            </div>
          )
        })}
      </div>
      <MessageInput sendMessage={handleSendMessage} />
    </div>
  )
}
