import React, { useEffect, useRef, useState } from 'react'
import { type FC } from 'react'
import { Customer, MessageItem } from './type'
import { getMessages } from './api'
import { Retool } from '@tryretool/custom-component-support'

import Switch from 'react-switch'
import MessageBox from './MessageBox'
import MessageInput from './MessageInput'

import styles from './ChatComponent.module.scss'

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
  const [customer, setCustomer] = useState({} as Customer)
  const [isKidnapped, setIsKidnapped] = useState(false)

  const scrollToLastMessage = () => {
    if (messageChat.current) {
      messageChat.current.scrollTop = messageChat.current?.scrollHeight
      messageChat.current.scroll({
        behavior: 'smooth',
        top: messageChat.current?.scrollHeight
      })
    }
  }

  const fetchData = async () => {
    const response = await getMessages(customerId, token)

    if (response.success) {
      setCustomer(response?.data?.customer || ({} as Customer))
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
  }

  const onScroll = () => {
    if (!hasScrolled) {
      setHasScrolled(true)
    }
  }

  const toggleKidnap = (checked: boolean) => {
    setIsKidnapped(checked)
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      //  console.log('Fetching data...')
      fetchData()
    }, 1000 * 5)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatToggle}>
        <Switch
          checked={isKidnapped}
          onChange={toggleKidnap}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor="#9664fa"
          height={20}
          width={40}
        />
        <span>Sequestrar chat</span>
      </div>
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
                name={customer?.name || ''}
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
        customerId={customerId}
        token={token}
        isKidnapped={isKidnapped}
        fetchData={fetchData}
      />
    </div>
  )
}
