import React from 'react'

export { default as Paperclip } from './Paperclip'
export { default as Message } from './Message'
export { default as Mic } from './Mic'
export { default as CheckFilled } from './CheckFilled'
export { default as CheckOutlined } from './CheckOutlined'

export type IconProps = {
  width?: number
  height?: number
  fill?: string
} & React.SVGProps<SVGElement>
