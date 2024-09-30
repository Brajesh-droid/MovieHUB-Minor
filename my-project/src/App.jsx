import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Ensure correct spelling
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails";
import Moviedetails from "./components/Moviedetails";
import Trailer from "./components/templates/Trailer";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>  <Route
                        path="/movie/details/:id/trailer"
                        element={<Trailer />}
                    />
                </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails/>}>  <Route
                        path="/tv/details/:id/trailer"
                        element={<Trailer />}
                    />
                </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
