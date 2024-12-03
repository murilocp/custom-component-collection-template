import React, { useState } from 'react'
import { MessageTypes } from '../type'

import { SyncLoader } from 'react-spinners'
import { Message, Mic } from '../icons'

import styles from './styles.module.scss'

type Props = {
  sendMessage: (message: string, type: MessageTypes) => Promise<void>
  disabled?: boolean
  isLoading?: boolean
  errorMessage?: string
}

const MessageInput: React.FC<Props> = ({
  sendMessage,
  disabled,
  isLoading,
  errorMessage
}) => {
  const [message, setMessage] = useState('')

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = async (type: MessageTypes) => {
    await sendMessage(message, type)
    setMessage('')
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage('text')
    }
  }

  return (
    <div>
      <div className={styles.messageInputWrapper}>
        <input
          onChange={handleOnChangeInput}
          onKeyDown={handleOnKeyDown}
          value={message}
          disabled={disabled || isLoading}
        />
        <button
          className={styles.chatMessageBtn}
          onClick={() => handleSendMessage('text')}
          disabled={disabled}
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
          disabled={disabled}
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
