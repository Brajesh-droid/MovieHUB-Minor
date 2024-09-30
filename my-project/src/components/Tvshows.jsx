import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utiles/axios";
import Loding from './Loding';
import Topnav from './templates/topnav';
import DropDown from './templates/DropDown';
import Verticalcards from './templates/Verticalcards';
import InfiniteScroll from 'react-infinite-scroll-component'; // Import InfiniteScroll


const Tvshows = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today"); // Default to "now_playing"
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const gettv = async () => {
     
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        if (data.results.length > 0) {
            settv((prevState) => [...prevState, ...data.results]);
            setpage(page + 1);
        } else {
          setHasMore(false);
        }
    } catch (error) {
        console.log("Error: ", error);
    }
};




const refershHandler = () => {
  if (tv.length === 0) {
      gettv();
  } else {
      setpage(1);
      settv([]);
      gettv();
  }
};
    
useEffect(() => {
  refershHandler();
}, [category]);
  
    return tv.length > 0 ? (
      <div className="w-screen h-screen ">
          <div className=" px-[5%] w-full flex items-center justify-between ">
              <h1 className=" text-2xl font-semibold text-zinc-400">
                  <i
                      onClick={() => navigate(-1)}
                      className="hover:text-[#6556CD] ri-arrow-left-line"
                  ></i>{" "}
                  Tv Shows
                  <small className="ml-2 text-sm text-zinc-600">
                      ({category})
                  </small>
              </h1>
              <div className="flex items-center w-[80%]">
                  <Topnav />
                  <DropDown
                      title="Category"
                      options={[
                          "on_the_air",
                          "popular",
                          "top_rated",
                          "airing_today",
                      ]}
                      func={(e) => setCategory(e.target.value)}
                  />
                  <div className="w-[2%]"></div>
              </div>
          </div>
        <InfiniteScroll
          dataLength={tv.length}
          next={gettv} // Fetch more data
          hasMore={hasMore} // Determine if more data is available
          loader={<h1>Loading...</h1>} // Replace with a more styled loader if desired
        >
          <Verticalcards data={tv} title= "tv" />
        </InfiniteScroll>
      </div>
    ) : (
      <Loding />
    );
};

export default Tvshows