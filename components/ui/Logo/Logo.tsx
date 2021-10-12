const Logo = ({ className = '', ...props }) => (
  <span
    style={{width:32, height:32, display: "block"}}
    className={className}
  >
    <img {...props} src="/logo.svg" alt="" style={{maxWidth:"100%"}} />
  </span>
)

export default Logo
