import * as React from 'react'
import { IconProps } from '.'

const CheckOutlined: React.FC<IconProps> = ({
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
      fillOpacity="0.9"
      d="M10 20c5.52 0 10-4.48 10-10S15.52 0 10 0 0 4.48 0 10s4.48 10 10 10m0-1.667A8.326 8.326 0 0 1 1.667 10 8.326 8.326 0 0 1 10 1.667 8.326 8.326 0 0 1 18.333 10 8.326 8.326 0 0 1 10 18.333"
    />
    <path
      fill={fill}
      fillOpacity="0.9"
      d="M8.922 14.657c.323 0 .598-.157.794-.461l4.48-7.049c.108-.196.235-.412.235-.627 0-.442-.392-.726-.804-.726-.245 0-.49.157-.676.441l-4.069 6.53-1.931-2.5c-.235-.314-.451-.392-.726-.392a.76.76 0 0 0-.754.774c0 .216.088.422.225.608l2.392 2.941c.245.324.51.46.834.46"
    />
  </svg>
)

export default CheckOutlined
