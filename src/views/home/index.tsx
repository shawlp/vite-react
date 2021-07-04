import React from 'react'
// import styles from './index.less'
import styles from './index.module.less'

interface IProps {
  name: string
}

const ContentCom: React.FC<IProps> = ({ name }) => {
  return <div className="od">{name}</div>
}

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className="text">half</div>
      <ContentCom name="hello world" />
    </div>
  )
}

export default Home
