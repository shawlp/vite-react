import React, { useEffect } from 'react'
// import styles from './index.less'
import img from '@/assets/images/favicon.svg'
import styles from './index.module.less'

interface IProps {
  name: string
}

const ContentCom: React.FC<IProps> = ({ name }) => {
  return (
    <>
      <img src={img} alt="demo" style={{ width: '50%' }} />
      <div className="od">{name}</div>
    </>
  )
}

const Home: React.FC = () => {
  useEffect(() => {
    fetch('/api/todos/1')
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((json) => console.log(json))
    fetch('/mock/api/getUser')
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((json) => console.log(json))
  }, [])
  return (
    <div className={styles.home}>
      <img src="/favicon.svg" alt="img" style={{ width: '50%' }} />
      <div className="text">half</div>
      <ContentCom name="hello world" />
    </div>
  )
}

export default Home
