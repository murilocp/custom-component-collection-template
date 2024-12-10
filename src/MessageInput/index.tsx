import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MessageTypes } from '../type'
import { sendMessage } from '../api'

import { SyncLoader } from 'react-spinners'
import { Message, Mic } from '../icons'

import styles from './styles.module.scss'

type Props = {
  customerId: string
  token: string
  loadingKidnap: boolean
  isKidnapped: boolean
  fetchData: () => Promise<void>
}

const MessageInput: React.FC<Props> = ({
  customerId,
  token,
  loadingKidnap,
  isKidnapped,
  fetchData
}) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isValidMessage = (msg: string): boolean => {
    return (
      !!msg &&
      msg !== '/n' &&
      msg.trim() !== '' &&
      message.replaceAll('\n', '') !== ''
    )
  }

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!isValidMessage(e.target.value) && textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
    }
  }

  const handleSendMessage = async (type: MessageTypes) => {
    setErrorMessage('')

    if (!isValidMessage(message)) {
      return
    }

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

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${textareaRef?.current.scrollHeight}px`
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage('text')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleSendMessage('text')
  }

  const shouldDisable = useMemo(() => {
    return !isKidnapped || loadingKidnap || isLoading
  }, [isKidnapped, loadingKidnap, isLoading])

  useEffect(() => {
    if (textareaRef.current && !isLoading) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.focus({ preventScroll: true })
    }
  }, [isLoading])

  return (
    <div>
      <form className={styles.messageInputWrapper} onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          onChange={handleOnChangeInput}
          onBlur={handleOnBlur}
          onKeyDown={handleOnKeyDown}
          rows={1}
          value={message}
          disabled={shouldDisable}
          autoFocus
        />
        <button
          className={styles.chatMessageBtn}
          onClick={() => handleSendMessage('text')}
          disabled={shouldDisable}
        >
          {loadingKidnap || isLoading ? (
            <SyncLoader color="#e7e7e7" size={5} />
          ) : (
            <Message width={18} height={17} fill="#e7e7e7" />
          )}
        </button>
        <button
          className={styles.chatMicBtn}
          onClick={() => handleSendMessage('audio')}
          disabled={shouldDisable}
        >
          {loadingKidnap || isLoading ? (
            <SyncLoader color="#e7e7e7" size={5} />
          ) : (
            <Mic fill="#e7e7e7" />
          )}
        </button>
      </form>

      {errorMessage && (
        <p className={styles.chatErrorMessage}>{errorMessage}</p>
      )}
    </div>
  )
}

export default MessageInput
