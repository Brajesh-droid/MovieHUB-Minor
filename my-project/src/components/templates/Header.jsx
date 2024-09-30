import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)),
        url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top 10%',

    }}
   
      className='w-full h-[45vh] flex flex-col justify-end items-start p-[5%]'
    >
        <h1 className='mb-[1%] text-5xl font-bold font-black text-white  '>
          
          {data.name|| data.title || data.orignal_name ||data.orignal_title} </h1>
        <p className='w-[70%] text-white'>{data.overview.slice(0, 200)}<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue'>...more</Link></p>
        <p><i class="ri-megaphone-fill text-white ">{data.release_date || "No information"}</i>
        <i class="ri-album-fill text-white mx-3 " >{data.media_type.toUpperCase()}</i>
        
        </p>
        <Link to ={`/${data.media_type}/details/${data.id}/trailer`}className='bg-[#826DFF] p-3 rounded mt-4  '>Watch trailer</Link>
    </div>
  );
};

export default Header;
