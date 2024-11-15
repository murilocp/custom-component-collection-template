import React from 'react'
import styles from './styles.module.scss'
import Avatar from '../Avatar'

type Props = {
  name: string
  imageSrc: string
}

const Header: React.FC<Props> = ({ name, imageSrc }) => {
  return (
    <div className={styles.chatHeader}>
      <Avatar imageSrc={imageSrc} />
      {name}
    </div>
  )
}

export default Header
