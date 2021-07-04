import React from 'react'
import Errorboundary from '@/components/error-boundary'
import routes from '@/routes/config'
import Routes from '@/routes'

const App: React.FC = () => {
  return <Errorboundary>{Routes(routes)}</Errorboundary>
}

export default App
