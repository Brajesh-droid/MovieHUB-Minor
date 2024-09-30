import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utiles/axios";
import Loding from './Loding';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import Verticalcards from './templates/Verticalcards';
import InfiniteScroll from 'react-infinite-scroll-component'; // Import InfiniteScroll

const People = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular"); // Default to "popular"
    const [person, setPerson] = useState([]); // Use "person" for the data
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const getPeople = async (pageNum) => {
      try {
        // Ensure the correct API path
        const { data } = await axios.get(`/person/${category}?page=${pageNum}`);
        
        if (data.results.length === 0) {
          setHasMore(false);  // No more data available
        } else {
          setPerson((prevState) => [...prevState, ...data.results]); // Append new results
        }
      } catch (error) {
        console.error("Error fetching person data:", error);
      }
    };
  
    useEffect(() => {
      setPerson([]); // Reset person data
      setPage(1); // Reset page to 1
      setHasMore(true); // Reset hasMore
      getPeople(1); // Fetch the first page
    }, [category]); // Trigger on category change
  
    const fetchMoreData = () => {
      const nextPage = page + 1;
      setPage(nextPage); // Increment the page number
      getPeople(nextPage); // Fetch the next page
    };
  
    return person.length > 0 ? ( // Check if there's any data in "person"
      <div className='w-screen h-screen'>
        <div className='w-full flex items-center justify-center'>
          <h1 className='w-[20%] text-2xl font-semibold text-zinc-400'>
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line p-2"></i>
            People
          </h1>
          <Topnav />
          <DropDown
            title="Category"
            options={["popular", "latest"]} // Dropdown for category
            onChange={(e) => setCategory(e.target.value)} // Update category
          />
        </div>
        <InfiniteScroll
          dataLength={person.length} // Correct length of "person" array
          next={fetchMoreData} // Fetch more data
          hasMore={hasMore} // Determine if more data is available
          loader={<h1>Loading...</h1>} // Replace with a more styled loader if desired
        >
          <Verticalcards data={person} title= "person" /> {/* Pass the "person" array */}
        </InfiniteScroll>
      </div>
    ) : (
      <Loding />
    );
}; 

export default People;
