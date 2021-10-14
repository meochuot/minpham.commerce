import Image from "@components/ui/Image/Image"

const Logo = ({ className = '', ...props }) => (
  <span
    style={{width:32, height:32, display: "block"}}
    className={className}
  >
    <Image {...props} src="/logo.svg" width="32" height="32" alt=""/>
  </span>
)

export default Logo
