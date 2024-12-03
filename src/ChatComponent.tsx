import React, { useEffect, useRef, useState } from 'react'
import { type FC } from 'react'
import { MessageItem, MessageTypes } from './type'
import { getMessages, kidnapChat, sendMessage } from './api'
import { Retool } from '@tryretool/custom-component-support'

import MessageBox from './MessageBox'
import MessageInput from './MessageInput'

import styles from './ChatComponent.module.scss'

export const ChatComponent: FC = () => {
  const [customerId] = Retool.useStateString({
    name: 'customerId'
  })
  const [customerName] = Retool.useStateString({
    name: 'customerName'
  })
  const [token] = Retool.useStateString({
    name: 'token'
  })
  const [selfieUrl] = Retool.useStateString({
    name: 'selfieUrl'
  })
  const [isKidnapped] = Retool.useStateBoolean({
    name: 'isKidnapped'
  })

  const messageChat = useRef<HTMLDivElement | null>(null)

  const [hasScrolled, setHasScrolled] = useState(false)
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

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
    setIsLoading(true)
    const response = await sendMessage({ customerId, message, type }, token)

    if (response.success) {
      await fetchData()
    } else {
      setErrorMessage(response.error || '')
    }

    setIsLoading(false)
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
    setIsLoading(true)
    await kidnapChat(customerId, token)
    setIsLoading(false)
  }

  const finalizeChat = async () => {
    setIsLoading(true)
    await kidnapChat(customerId, token, false)
    setIsLoading(false)
  }

  const onScroll = () => {
    if (!hasScrolled) {
      setHasScrolled(true)
    }
  }

  useEffect(() => {
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

  useEffect(() => {
    if (isKidnapped) {
      initializeChat()
    } else {
      finalizeChat()
    }
  }, [isKidnapped])

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
                imageSrc={selfieUrl || ''}
                name={customerName || ''}
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
      <MessageInput
        sendMessage={handleSendMessage}
        disabled={!isKidnapped}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  )
}
