import s from './LoadingDots.module.css'

const LoadingDots: React.FC = () => {
  return (
    <span className={s.root}>
      <span className={s.dot} key={`dot_1`}></span>
      <span className={s.dot} key={`dot_2`}></span>
      <span className={s.dot} key={`dot_3`}></span>
    </span>
  )
}

export default LoadingDots
