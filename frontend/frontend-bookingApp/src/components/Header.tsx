import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-blue-800 py-6 w-full'>
        <div className="container mx-auto flex  justify-between">
            <span className='text-2xl text-white font-bold tracking-tight'>
             <Link to="/">MernHolidays.com</Link>
        
            </span>
            <span className='flex '>
                <Link  to="/signIn" className="flex items-center bg-white rounded-md text-blue-600 px-6 py-2 font-bold hover:bg-gray-100 ">
                Sign In
                </Link>
            </span>

        </div>
    </div>
  )
}

export default Header