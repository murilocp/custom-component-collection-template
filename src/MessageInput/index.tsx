import React, { useEffect, useState } from 'react'
import { MessageTypes } from '../type'
import { kidnapChat, sendMessage } from '../api'

import { SyncLoader } from 'react-spinners'
import { Message, Mic } from '../icons'

import styles from './styles.module.scss'

type Props = {
  customerId: string
  token: string
  isKidnapped: boolean
  fetchData: () => Promise<void>
}

const MessageInput: React.FC<Props> = ({
  customerId,
  token,
  isKidnapped,
  fetchData
}) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

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

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = async (type: MessageTypes) => {
    setIsLoading(true)
    const response = await sendMessage({ customerId, message, type }, token)

    if (response.success) {
      setMessage('')
      await fetchData()
    } else {
      setErrorMessage(response.error || '')
    }

    setIsLoading(false)
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage('text')
    }
  }

  useEffect(() => {
    if (isKidnapped) {
      initializeChat()
    } else {
      finalizeChat()
    }
  }, [isKidnapped])

  return (
    <div>
      <div className={styles.messageInputWrapper}>
        <input
          onChange={handleOnChangeInput}
          onKeyDown={handleOnKeyDown}
          value={message}
          disabled={!isKidnapped || isLoading}
        />
        <button
          className={styles.chatMessageBtn}
          onClick={() => handleSendMessage('text')}
          disabled={!isKidnapped || isLoading}
        >
          {isLoading ? (
            <SyncLoader color="#e7e7e7" size={5} />
          ) : (
            <Message width={18} height={17} fill="#e7e7e7" />
          )}
        </button>
        <button
          className={styles.chatMicBtn}
          onClick={() => handleSendMessage('audio')}
          disabled={!isKidnapped || isLoading}
        >
          {isLoading ? (
            <SyncLoader color="#e7e7e7" size={5} />
          ) : (
            <Mic fill="#e7e7e7" />
          )}
        </button>
      </div>

      {errorMessage && (
        <p className={styles.chatErrorMessage}>{errorMessage}</p>
      )}
    </div>
  )
}

export default MessageInput
