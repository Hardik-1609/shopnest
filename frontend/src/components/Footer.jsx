import React from 'react'

function Footer() {
  return (
    <div className="bg-secondary border-t border-body text-white p-5">
      <div className="container mx-auto">
        <div className="footer-content flex flex-row items-center justify-between">
          <p className="text-xl font-bold text-primary">ShopNest</p>
          <p>&copy; 2023 Your Store. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer