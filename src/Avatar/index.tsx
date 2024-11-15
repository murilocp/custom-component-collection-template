import React from 'react'
import styles from './styles.module.scss'

type Props = {
  imageSrc: string
}

const Avatar: React.FC<Props> = ({ imageSrc }) => {
  return (
    <div className={styles.avatarWrapper}>
      <img src={imageSrc} alt="avatar" className={styles.avatarImg} />
    </div>
  )
}

export default Avatar
