import React from 'react'
import { MessageItem, MessageRole } from '../type'

import { Paperclip, CheckFilled, CheckOutlined } from '../icons'
import Avatar from '../Avatar'
import AudioMessageTranscription from '../AudioMessageTranscription'

import styles from './styles.module.scss'

type Props = {
  name?: string
  imageSrc?: string
  lastMessageSameUser: boolean
  role: MessageRole
  messagePayload: MessageItem
}

const MessageBox: React.FC<Props> = ({
  role,
  lastMessageSameUser,
  imageSrc,
  name,
  messagePayload: { createdAt, content, mediaPath, type, status, sent }
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
          <AudioMessageTranscription transcription={content} />
        </div>
      )
    }

    return <p className={styles.messageTextContent}>{content}</p>
  }

  const messageIconRender = () => {
    const sentStatuses = ['delivered', 'sent']

    if (isClient) return <></>

    if (status === 'read') {
      return <CheckOutlined width={16} height={16} />
    }

    if (sentStatuses.includes(status) && !sent) {
      return <CheckFilled fill="#fff" width={16} height={16} />
    }

    if (sentStatuses.includes(status) && sent) {
      return <CheckFilled fill="#32D74B" width={16} height={16} />
    }
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

          <div className={styles.messageBoxFooter}>
            <span className={styles.messageDate}>
              {new Date(createdAt).toLocaleString('pt-BR')}
            </span>
            <span className={styles.messageStatus}>{messageIconRender()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
