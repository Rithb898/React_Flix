import { useEffect, useState } from "react";
import Section from "./components/Section";
import { apiOptions } from "./lib/apiOptions";
import Footer from "./components/Footer";
import { ClimbingBoxLoader } from "react-spinners";
import Navbar from "./components/Navbar";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingWebSeris, setTrendingWebSeris] = useState([]);
  const [topRatedWebSeris, setTopRatedWebSeris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        apiOptions
      ),
      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        apiOptions
      ),
      fetch(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
        apiOptions
      ),
      fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        apiOptions
      ),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        setTrendingMovies(data[0].results);
        setTopRatedMovies(data[1].results);
        setTrendingWebSeris(data[2].results);
        setTopRatedWebSeris(data[3].results);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className='min-h-screen w-full flex justify-center items-center'>
          <ClimbingBoxLoader color='#d3d3d3' />
        </div>
      ) : (
        <div className='w-full flex flex-col px-4 sm:px-8 lg:px-5 py-4'>
          <Navbar />
          {/* A-Ads Advertishment start here */}
            <div id='frame' style='width: 100%;'>
              <iframe
                data-aa='2375197'
                src='//acceptable.a-ads.com/2375197'
                style='border:0px; padding:0; width:100%; height:100%; overflow:hidden; background-color: transparent;'
              ></iframe>
              <a
                style='display: block; text-align: right; font-size: 12px'
                id='frame-link'
                href='https://aads.com/campaigns/new/?source_id=2375197&source_type=ad_unit&partner=2375197'
              >
                Advertise here
              </a>
            </div>
            {/* A-Ads Advertishment end here */}
          <Section
            title={"Trending Movies"}
            movies={trendingMovies}
            link={"trending-movies"}
            type={"movie"}
          />
          <Section
            title={"Top Rated Movies"}
            movies={topRatedMovies}
            link={"top-rated-movies"}
            type={"movie"}
          />
          <Section
            title={"Trending Web Series"}
            movies={trendingWebSeris}
            link={"trending-web-series"}
            type={"web-series"}
          />
          <Section
            title={"Top Rated Web Series"}
            movies={topRatedWebSeris}
            link={"top-rated-web-series"}
            type={"web-series"}
          />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
