import React, { useState } from 'react'
import styles from './styles.module.scss'

interface AudioMessageTranscriptionProps {
  transcription: string
}

const AudioMessageTranscription: React.FC<AudioMessageTranscriptionProps> = ({
  transcription
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSeeMore = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className={styles.messageAudioTranscriptionWrapper}>
      {transcription.length >= 110 ? (
        <>
          <span className={styles.messageAudioTranscription}>
            &quot;
            {isOpen ? transcription : `${transcription.slice(0, 100)}...`}
            &quot;
          </span>
          <div
            className={styles.messageAudioTranscriptionSeeMore}
            onClick={toggleSeeMore}
          >
            {isOpen ? 'Ver menos' : 'Ver mais'}
          </div>
        </>
      ) : (
        <span className={styles.messageAudioTranscription}>
          &quot;{transcription}&quot;
        </span>
      )}
    </div>
  )
}

export default AudioMessageTranscription
