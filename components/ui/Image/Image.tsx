import { default  as NextImage, ImageProps as NextImageProps } from 'next/image'

const Image: React.FC<NextImageProps> = (props) => {
  return (
    <NextImage {...props} />
  )
}

export default Image
