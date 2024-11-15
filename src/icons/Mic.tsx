import * as React from 'react'
import { IconProps } from '.'

const Mic: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  fill = '#fff'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill={fill}
      fillOpacity="0.9"
      d="M14 2.805v8.911a1.7 1.7 0 0 0-.688-.141c-.29 0-.565.073-.808.203V2.805c0-.408.316-.752.743-.752.418 0 .752.344.752.752M10.867 5.62v8.165a.734.734 0 0 1-.744.743.73.73 0 0 1-.752-.743V5.62c0-.418.316-.752.752-.752.419 0 .744.334.744.752M7.746.752v17.901a.746.746 0 0 1-.762.753.734.734 0 0 1-.734-.753V.753c0-.419.316-.753.734-.753.436 0 .762.334.762.752M4.625 4.496V14.91a.75.75 0 0 1-.762.753.734.734 0 0 1-.734-.753V4.496c0-.418.316-.762.734-.762a.76.76 0 0 1 .762.762M1.496 8.295v2.815a.743.743 0 0 1-.753.753A.736.736 0 0 1 0 11.11V8.295c0-.418.316-.761.743-.761s.753.343.753.761M14.054 19.591h4.729c.297 0 .492-.204.492-.501s-.195-.502-.492-.502h-1.867v-.929C18.764 17.436 20 16.034 20 14.148v-.818a.5.5 0 0 0-.483-.492.51.51 0 0 0-.502.492v.818c0 1.523-1.068 2.592-2.601 2.592-1.542 0-2.601-1.069-2.601-2.592v-.818a.51.51 0 0 0-.502-.492.5.5 0 0 0-.483.492v.818c0 1.886 1.236 3.297 3.084 3.511v.929h-1.858c-.297 0-.51.204-.51.502 0 .297.213.501.51.501m2.36-3.79c.91 0 1.542-.706 1.542-1.644v-3.65c0-.939-.632-1.636-1.542-1.636s-1.542.697-1.542 1.635v3.651c0 .938.632 1.644 1.542 1.644"
    ></path>
  </svg>
)

export default Mic
