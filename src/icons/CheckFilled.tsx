import * as React from 'react'
import { IconProps } from '.'

const CheckFilled: React.FC<IconProps> = ({
  fill = '#fff',
  width = 20,
  height = 20
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
      fillOpacity="0.85"
      d="M20 10c0 5.51-4.48 10-10 10-5.51 0-10-4.49-10-10C0 4.48 4.49 0 10 0c5.52 0 10 4.48 10 10m-6.951-3.892-4.186 6.725-1.99-2.568c-.246-.324-.461-.412-.746-.412a.79.79 0 0 0-.784.804c0 .225.088.441.235.637l2.461 3.02c.255.343.53.48.863.48s.618-.157.823-.48l4.608-7.255c.118-.206.245-.432.245-.647 0-.461-.401-.755-.833-.755-.255 0-.51.157-.696.45"
    ></path>
  </svg>
)

export default CheckFilled
