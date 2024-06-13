import React from 'react'
import { Outlet } from 'react-router-dom'

const MainParent: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#F1F3F7',
        minHeight: '100vh',
      }}
    >
      <Outlet />
    </div>
  )
}

export default MainParent
