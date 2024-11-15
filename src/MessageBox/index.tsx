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
  imageSrc: string
  date: string
  type: MessageTypes
}

const MessageBox: React.FC<Props> = ({
  messageContent,
  mediaPath,
  role,
  lastMessageSameUser,
  imageSrc,
  date,
  type
}) => {
  const isUser = role === 'user'
  const isAudio = type === 'audio'

  return (
    <div className={styles.messageWrapper}>
      {isUser && !lastMessageSameUser ? (
        <Avatar imageSrc={imageSrc} />
      ) : (
        <div style={{ width: 30 }} />
      )}
      <div
        className={`${styles.messageRow} ${isUser ? styles.messageRow__customerMessage : styles.messageRow__assistantMessage}`}
      >
        <div
          className={`${styles.messageBox} ${isUser ? styles.messageBox__customerMessage : styles.messageBox__assistantMessage} ${isAudio ? styles.messageBox__audio : ''}`}
        >
          {type === 'text' && messageContent && <p>{messageContent}</p>}
          {type === 'document' && mediaPath && (
            <a
              href={mediaPath}
              target="_blank"
              rel="noreferrer"
              className={styles.mediaContentMessage}
            >
              <Paperclip fill="#000" /> Arquivo
            </a>
          )}
          {isAudio && mediaPath && <audio controls src={mediaPath} />}
          <p className={styles.messageDate}>
            {new Date(date).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
