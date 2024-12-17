import React from 'react'

export { default as Paperclip } from './Paperclip'
export { default as Message } from './Message'
export { default as Mic } from './Mic'
export { default as CheckFilled } from './CheckFilled'
export { default as CheckOutlined } from './CheckOutlined'
export { default as XMark } from './XMark'
export { default as InfoIcon } from './InfoIcon'

export type IconProps = {
  width?: number
  height?: number
  fill?: string
} & React.SVGProps<SVGSVGElement>
