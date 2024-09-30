import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import axios from "../utiles/axios";
import Verticalcards from './templates/Verticalcards';
import Loding from './Loding';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState([]);
  const [duration, setDuration] = useState("day");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async (pageNum) => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${pageNum}`);
      
      if (data.results.length === 0) {
        setHasMore(false);  // No more data available
      } else {
        setTrending((prevState) => [...prevState, ...data.results]); // Append new results
      }
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  useEffect(() => {
    setTrending([]); // Reset trending data
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset hasMore
    getTrending(1); // Fetch the first page
  }, [category, duration]); // Trigger on category or duration change

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage); // Increment the page number
    getTrending(nextPage); // Fetch the next page
  };

  return trending.length > 0 ? (
    <div className='p-[3%] w-screen h-screen overflow-hidden overflow-y-auto'>
      <div className='w-full flex items-center justify-center'>
        <h1 className='w-[20%] text-2xl font-semibold text-zinc-400'>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line p-2"></i>
          Trending
        </h1>
        <Topnav />
        <DropDown
          title="Category"
          options={["movie", "tv", "all"]}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div className='w-[2%]'></div>
        <DropDown
          title="Duration"
          options={["week", "day"]}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={fetchMoreData} // Use the fetchMoreData function
        hasMore={hasMore} // Control loading based on hasMore
        loader={<h1>Loading...</h1>}
      >
        <Verticalcards data={trending} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loding />
  );
};

export default Trending;
