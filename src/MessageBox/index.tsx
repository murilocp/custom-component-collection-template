import React from 'react'
import { MessageItem, MessageRole } from '../type'

import {
  Paperclip,
  CheckFilled,
  CheckOutlined,
  XMark,
  InfoIcon
} from '../icons'
import Avatar from '../Avatar'
import AudioMessageTranscription from '../AudioMessageTranscription'
import PdfViewer from '../PdfViewer'

import styles from './styles.module.scss'

type Props = {
  name?: string
  imageSrc?: string
  lastMessageSameUser: boolean
  role: MessageRole
  messagePayload: MessageItem
}

const documentType = ['document', 'image']

const MessageBox: React.FC<Props> = ({
  role,
  lastMessageSameUser,
  imageSrc,
  name,
  messagePayload: { createdAt, content, mediaPath, type, status, failedReason }
}) => {
  const isClient = role === 'user'
  const isAudio = type === 'audio' && mediaPath

  const messageContentRender = () => {
    const isDocument = documentType.includes(type) && mediaPath

    if (isDocument) {
      return (
        <>
          <a
            className={styles.mediaContentMessage}
            href={mediaPath}
            target="_blank"
            rel="noreferrer"
          >
            {type === 'image' ? (
              <div className={styles.imageContentMessage}>
                <img src={mediaPath} />
                <span>
                  <Paperclip fill="#333" style={{ marginRight: 4 }} /> Imagem
                </span>
              </div>
            ) : (
              <div className={styles.documentContentMessage}>
                <PdfViewer src={mediaPath} />
                <span>
                  <Paperclip fill="#333" style={{ marginRight: 4 }} /> Documento
                </span>
              </div>
            )}
          </a>
          <p className={styles.messageTextContent}>{content}</p>
        </>
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

    return (
      <p
        className={styles.messageTextContent}
        dangerouslySetInnerHTML={{
          __html: content.replace(/\*([^*]+?)\*/g, '<strong>$1</strong>')
        }}
      />
    )
  }

  const messageIconRender = () => {
    if (isClient) return <></>

    if (status === 'read') {
      return <CheckFilled fill="#32D74B" width={16} height={16} />
    }

    if (status === 'sent') {
      return <CheckOutlined fill="#fff" width={16} height={16} />
    }

    if (status === 'delivered') {
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
