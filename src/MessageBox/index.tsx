import React from 'react'
import styles from './styles.module.scss'
import Avatar from '../Avatar'
import { MessageRole, MessageTypes } from '../type'
import { Paperclip } from '../icons'

type Props = {
  messageContent?: string
  mediaPath?: string
  lastMessageSameUser: boolean
  role: MessageRole
  imageSrc?: string
  name?: string
  date: string
  type: MessageTypes
}

const MessageBox: React.FC<Props> = ({
  messageContent,
  mediaPath,
  role,
  lastMessageSameUser,
  imageSrc,
  name,
  date,
  type
}) => {
  const isClient = role === 'user'
  const isAudio = type === 'audio' && mediaPath
  const isDocument = type === 'document' && mediaPath

  const messageContentRender = () => {
    if (isDocument) {
      return (
        <a
          href={mediaPath}
          target="_blank"
          rel="noreferrer"
          className={styles.mediaContentMessage}
        >
          <Paperclip fill="#000" /> Arquivo
        </a>
      )
    }

    if (isAudio) {
      return (
        <div className={styles.messageAudio}>
          <audio controls src={mediaPath} />
          <p className={styles.messageAudioTranscription}>{messageContent}</p>
        </div>
      )
    }

    return <p className={styles.messageTextContent}>{messageContent}</p>
  }

  return (
    <div className={styles.messageWrapper}>
      {isClient && !lastMessageSameUser ? (
        <Avatar imageSrc={imageSrc} name={name} />
      ) : (
        <div style={{ width: 35 }} />
      )}
      <div
        className={`${styles.messageRow} ${isClient ? styles.messageRow__customerMessage : styles.messageRow__assistantMessage}`}
      >
        <div
          className={`${styles.messageBox} ${isClient ? styles.messageBox__customerMessage : styles.messageBox__assistantMessage} ${isAudio ? styles.messageBox__audio : ''}`}
        >
          {messageContentRender()}

          <p className={styles.messageDate}>
            {new Date(date).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
