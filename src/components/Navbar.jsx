import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='shadow-lg shadow-zinc-400/40'>
            <div className="bg-zinc-900 shadow-lg shadow-zinc-400/40  flex justify-between text-white">
                <NavLink to="/">
                    <div className="logo  p-4 head text-xl font-medium">
                        Movie_RecnD
                    </div>
                </NavLink>
                <div className="nav-links flex gap-5 justify-around items-center mr-12">
                    <NavLink to="">
                        <div className='hover:text-sky-300 hover:scale-105 duration-200'>Movies</div>
                    </NavLink>
                    <NavLink to="tvShows">
                        <div className="hover:text-sky-300 hover:scale-105 duration-200">TV Shows</div>
                    </NavLink>
                    <NavLink to="tvShows">
                        <div className="hover:text-sky-300 hover:scale-105 duration-200"></div>
                    </NavLink>
                </div>
        </div>
    </div>
  )
}

export default Navbar