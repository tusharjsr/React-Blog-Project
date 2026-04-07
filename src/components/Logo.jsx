import React from 'react'
import BlogLogo from '../assets/Write-Blog-Logo.png'

function Logo({ width = '100px' }) {
  return (
    <div>
      <img
        src={BlogLogo}
        alt="Blog Logo"
        style={{ width }}
      />
    </div>
  )
}

export default Logo
