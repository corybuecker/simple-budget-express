import { useEffect } from 'react'
import * as React from 'react'

const Authentication = () => {
  useEffect(() => {
    window.location.href = '/authentication'
  })

  return <div>Logging in...</div>
}

export default Authentication
