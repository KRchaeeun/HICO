import React from 'react'
import { Outlet } from 'react-router-dom'

const MainChild: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default MainChild
