import React from 'react'
import styles from './styles.module.scss'

type Props = {
  imageSrc?: string
  name?: string
}

const Avatar: React.FC<Props> = ({ imageSrc, name }) => {
  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(' ')
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  return (
    <div className={styles.avatarWrapper}>
      {imageSrc && (
        <img src={imageSrc} alt="avatar" className={styles.avatarImg} />
      )}
      {name && (
        <div className={styles.avatarName}>
          <span>{getInitials(name)}</span>
        </div>
      )}
    </div>
  )
}

export default Avatar
