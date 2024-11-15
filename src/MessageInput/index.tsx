import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Message, Mic } from '../icons'
import { MessageTypes } from '../type'

type Props = {
  sendMessage: (message: string, type: MessageTypes) => Promise<void>
}

const MessageInput: React.FC<Props> = ({ sendMessage }) => {
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
    <div className={styles.messageInputWrapper}>
      <input
        onChange={handleOnChangeInput}
        onKeyDown={handleOnKeyDown}
        value={message}
      />
      <button
        className={styles.chatMessageBtn}
        onClick={() => handleSendMessage('text')}
      >
        <Message width={18} height={17} fill="#e7e7e7" />
      </button>
      <button
        className={styles.chatMicBtn}
        onClick={() => handleSendMessage('audio')}
      >
        <Mic fill="#e7e7e7" />
      </button>
    </div>
  )
}

export default MessageInput
