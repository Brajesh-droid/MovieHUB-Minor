
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Sidenac = () => {
 
  return (
    <>
    <div className='w-[20%] h-full  border-r-2 border-zinc-200 p-10 '>
        <h1 className='text-2xl text-white font-bold'>
        <i className="text-[#826DFF] ri-tv-fill  "></i>
           <span className='text-2xl '> MOVIEHUB</span>
           <nav className=' flex flex-col text-zinc-400 text-lg '>
            <h1 className='text-white font-semibold text-xl mt-10 mb-2'>
                New Feeds
            </h1>
           <Link to = "/trending" className = "hover:bg-[#826DFF] hover:text-white rounded-xl duration-300 p-5"> <i class="ri-fire-fill m-1"></i>Trending </Link>
           <Link to="/popular" className = "hover:bg-[#826DFF] hover:text-white rounded-xl duration-300 p-5"><i class="ri-sparkling-2-fill"></i> Popular </Link>
           <Link to="/movie" className = "hover:bg-[#826DFF] hover:text-white rounded-xl duration-300 p-5"><i class="ri-movie-2-fill"></i> Movies </Link>
           <Link  to="/tv"className = "hover:bg-[#826DFF] hover:text-white rounded-xl duration-300 p-5"><i class="ri-tv-2-fill"></i> Tv show </Link>
           <Link  to="/person" className = "hover:bg-[#826DFF] hover:text-white rounded-xl duration-300 p-5"><i class="ri-user-5-fill"></i> People </Link>
           </nav>
           <hr className='border-none h-[1px] bg-zinc-400' />
           <nav className=' flex flex-col text-zinc-400 text-lg'>
            <h1 className='text-white  font-bold text-bold mt-5 mr-3'>
                Website Information
            </h1>
           <Link className = "hover:bg-[#826DFF] hover:text-white rounded-lg duration-300 p-2 m-2"> <i class="ri-information-2-fill m-1"></i>About MOVIEHUB </Link>
           <Link className = "hover:bg-[#826DFF] hover:text-white rounded-lg duration-300 p-2 m-2"><i class="ri-contacts-fill m-1"></i> Contact Us</Link>
           
           </nav>
        </h1>
         </div>
    </>
  )
}

export default Sidenac