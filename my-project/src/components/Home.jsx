import React, { useEffect, useState } from 'react';
import Sidenac from './templates/Sidenac';
import Topnav from './templates/Topnav';
import axios from '../utiles/axios';
import Header from './templates/Header';
import HorizontalCards from './templates/HorizontalCards';
import DropDown from './templates/DropDown'; // Importing the DropDown component
import Loding from './Loding';

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState('all');

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setWallpaper(data.results[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  useEffect(() => {
    getTrending();
  }, [category]);

  useEffect(() => {
    if (!wallpaper) {
      getHeader();
    }
  }, [wallpaper]);

  if (!wallpaper || !trending) {
    return <Loding />;
  }

  return (
    <>
      <Sidenac />
      <div className='w-[80%] overflow-x-hidden overflow-auto h-full'>
        <Topnav />
        <Header data={wallpaper} />
        <div className='mb-5 flex justify-between'>
          <h1 className='text-zinc-400 font-semibold text-2xl ml-2'>Trending</h1>
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => {
              console.log(e.target.value);  // Debugging output
              setCategory(e.target.value);  // Updates category based on selection
            }}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  );
};

export default Home;
