import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utiles/axios";
import Loding from './Loding';
import Topnav from './templates/topnav';
import DropDown from './templates/DropDown';
import Verticalcards from './templates/Verticalcards';
import InfiniteScroll from 'react-infinite-scroll-component'; // Import InfiniteScroll

const Popular =  () => {
  document.title = "SCSDB | Popular";

  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPopular = async () => {
      try {
          const { data } = await axios.get(
              `${category}/popular?page=${page}`
          );
          if (data.results.length > 0) {
              setpopular((prevState) => [...prevState, ...data.results]);
              setpage(page + 1);
          } else {
              sethasMore(false);
          }
      } catch (error) {
          console.log("Error: ", error);
      }
  };

  const refershHandler = () => {
      if (popular.length === 0) {
          GetPopular();
      } else {
          setpage(1);
          setpopular([]);
          GetPopular();
      }
  };

  useEffect(() => {
      refershHandler();
  }, [category]);

  return popular.length > 0 ? (
      <div className="w-screen h-screen ">
          <div className=" px-[5%] w-full flex items-center justify-between ">
              <h1 className=" text-2xl font-semibold text-zinc-400">
                  <i
                      onClick={() => navigate(-1)}
                      className="hover:text-[#6556CD] ri-arrow-left-line"
                  ></i>{" "}
                  Popular
              </h1>
              <div className="flex items-center w-[80%]">
                  <Topnav />
                  <DropDown
                      title="Category"
                      options={["tv", "movie"]}
                      func={(e) => setcategory(e.target.value)}
                  />
                  <div className="w-[2%]"></div>
              </div>
          </div>

          <InfiniteScroll
              dataLength={popular.length}
              next={GetPopular}
              hasMore={hasMore}
              loader={<h1>Loading...</h1>}
          >
              <Verticalcards data={popular} title={category} />
          </InfiniteScroll>
      </div>
  ) : (
      <Loding />
  );
};

export default Popular;
