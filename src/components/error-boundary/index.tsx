import React from 'react'

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false,
      errorMsg: ''
    }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message }
  }

  render() {
    const { hasError, errorMsg } = this.state
    if (hasError) {
      return (
        <p style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>
          something went wrong: {errorMsg}
        </p>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
