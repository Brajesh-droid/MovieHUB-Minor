import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utiles/axios";
import Loding from './Loding';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import Verticalcards from './templates/Verticalcards';
import InfiniteScroll from 'react-infinite-scroll-component'; // Import InfiniteScroll

const Movies = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const getMovies = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results.length > 0) {
                setMovies((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1); // Increment page
            } else {
                setHasMore(false); // No more movies to load
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const refreshHandler = () => {
        if (movies.length === 0) {
            getMovies(); // Initial load
        } else {
            setPage(1); // Reset to first page
            setMovies([]); // Clear existing movies
            getMovies(); // Fetch again
        }
    };

    useEffect(() => {
        refreshHandler(); // Fetch movies when category changes
    }, [category]);

    return movies.length > 0 ? (
        <div className="w-screen h-screen ">
            <div className="px-[5%] w-full flex items-center justify-between ">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Movie
                    <small className="ml-2 text-sm text-zinc-600">
                        ({category})
                    </small>
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    <DropDown
                        title="Category"
                        options={[
                            "popular",
                            "top_rated",
                            "upcoming",
                            "now_playing",
                        ]}
                        func={(e) => setCategory(e.target.value)} // Set category correctly
                    />
                    <div className="w-[2%]"></div>
                </div>
            </div>

            <InfiniteScroll
                dataLength={movies.length}
                next={getMovies} // Correctly call getMovies
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Verticalcards data={movies} title="movie" /> {/* Use movies */}
            </InfiniteScroll>
        </div>
    ) : (
        <Loding /> // Use the Loading component correctly
    );
};

export default Movies;
