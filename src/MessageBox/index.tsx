import React from 'react'
import { MessageItem, MessageRole } from '../type'

import { Paperclip, CheckFilled, CheckOutlined, XMark } from '../icons'
import Avatar from '../Avatar'
import AudioMessageTranscription from '../AudioMessageTranscription'

import styles from './styles.module.scss'
import InfoIcon from '../icons/InfoIcon'

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
  messagePayload: {
    createdAt,
    content,
    mediaPath,
    type,
    status,
    sent,
    failedReason
  }
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
    const readStatuses = ['read', 'sent']

    if (isClient) return <></>

    if (readStatuses.includes(status)) {
      return <CheckFilled fill="#32D74B" width={16} height={16} />
    }

    if (status === 'delivered' && !sent) {
      return <CheckOutlined width={16} height={16} />
    }

    if (status === 'delivered' && sent) {
      return <CheckFilled fill="#fff" width={16} height={16} />
    }

    if (status === 'failed') {
      return <XMark fill="#FF0000" width={16} height={16} />
    }
  }

  return (
    <>
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
              <span className={styles.messageStatus}>
                {messageIconRender()}
              </span>
            </div>
          </div>

          {failedReason && status === 'failed' && (
            <div className={styles.messageFailedReason}>
              <span className={styles.messageFailedReasonIcon}>
                <InfoIcon fill="#FF0000" width={15} height={15} />
              </span>
              {failedReason}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MessageBox
