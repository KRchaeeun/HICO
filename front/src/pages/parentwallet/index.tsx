import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../mainparent/navbar'

const ParentWallet: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundColor: '#F1F3F7',
          position: 'relative',
          minHeight: 'calc(100vh - 70px)',
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default ParentWallet
