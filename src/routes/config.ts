import { lazy } from 'react'

const Home = lazy(() => import('@/views/home'))

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    meta: { title: '主页' }
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    meta: { title: '首页' }
  }
]

export default routes
