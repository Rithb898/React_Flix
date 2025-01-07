import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";
import { apiOptions } from "../lib/apiOptions";
import { Play, Search, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { movieGenre } from "../lib/genre";
import Card from "../components/Card";
import { ClimbingBoxLoader } from "react-spinners";

function MoviePage() {
  const { type } = useParams();
  const trendingMoviesURL =
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const trendingWebSeiesURL =
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const topRatedMoviesURL =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const topRatedWebSeriesURL =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingWebSeris, setTrendingWebSeris] = useState([]);
  const [topRatedWebSeris, setTopRatedWebSeris] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const movieData = {
    "trending-movies": trendingMovies,
    "trending-web-series": trendingWebSeris,
    "top-rated-movies": topRatedMovies,
    "top-rated-web-series": topRatedWebSeris,
  };

  const data = movieData[type] || [];

  //   setSearch(e.target.value);
  //   if (e.key === "Enter") {
  //     fetchSearch();
  //   }
  // };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const fetchSearch = () => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      apiOptions
    )
      .then((res) => res.json())
      .then((json) => setSearchData(json.results))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(
      `${
        type == "trending-movies"
          ? trendingMoviesURL
          : type == "trending-web-series"
          ? trendingWebSeiesURL
          : type == "top-rated-movies"
          ? topRatedMoviesURL
          : topRatedWebSeriesURL
      }`,
      apiOptions
    )
      .then((res) => res.json())
      .then((json) => {
        type == "trending-movies"
          ? setTrendingMovies(json.results)
          : type == "trending-web-series"
          ? setTrendingWebSeris(json.results)
          : type == "top-rated-movies"
          ? setTopRatedMovies(json.results)
          : setTopRatedWebSeris(json.results);
      })
      .catch((err) => console.error(err));
  }, [type]);

  return (
    <>
      <div className='w-screen mx-auto px-60'>
        <Navbar />
      </div>
      {loading && (
        <div className='min-h-screen w-full flex justify-center items-center'>
          <ClimbingBoxLoader color='#d3d3d3' />
        </div>
      )}
      <div className='flex justify-center w-screen py-20 mb-5 bg-gray-600 -mt-12 rounded-lg'>
        <h1 className='text-3xl font-bold'>
          {type == "trending-movies"
            ? "Trending Movies"
            : type == "trending-web-series"
            ? "Trending Web Series"
            : type == "top-rated-movies"
            ? "Top Rated Movies"
            : "Top Rated Web Series"}
        </h1>
      </div>
      <div className='flex justify-between w-screen items-center px-72'>
        <div className='relative w-full mr-80'>
          <form onSubmit={handleSearch}>
            <Input
              type='search'
              placeholder='Search movies'
              aria-label='Search movies'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-gray-700/50 border-0 focus-visible:ring-0 text-white placeholder:text-gray-300 px-5'
            />
            <div
              className='bg-black w-10 absolute right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-full'
              onClick={handleSearch}
            >
              <Search className='text-gray-300 h-5 w-5' />
            </div>
          </form>
        </div>
        <div className='flex gap-5'>
          <select className='text-gray-300 rounded-sm px-2 py-1 bg-gray-700/50'>
            <option value='' defaultValue disabled>
              Genres
            </option>
            {movieGenre.map((genre) => (
              <option className='bg-gray-700/50' value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <select className='text-gray-300 rounded-sm px-4 py-1 bg-gray-700/50'>
            <option value='' defaultValue disabled>
              Sort By
            </option>{" "}
            {/* Added selected */}
            <option value='popularity' className='bg-gray-700/50'>
              Popularity
            </option>{" "}
            {/* Added value attributes */}
            <option value='rating' className='bg-gray-700/50'>
              Rating
            </option>
          </select>
        </div>
      </div>
      <div>
        {searchData.length > 0 ? (
          <div className='flex justify-center flex-wrap gap-5 mx-auto w-screen px-44 pt-5'>
            {searchData.map((movie, index) => {
              return (
                <Card
                  key={index}
                  index={index}
                  id={movie.id}
                  vote={movie.vote_average}
                  title={movie.original_title}
                  poster={movie.poster_path}
                />
              );
            })}
          </div>
        ) : (
          <div className='flex justify-center flex-wrap gap-5 mx-auto w-screen px-44 pt-5'>
            {data.map((movie, index) => {
              return (
                <Card
                  key={index}
                  index={index}
                  id={movie.id}
                  vote={movie.vote_average}
                  title={movie.original_title}
                  poster={movie.poster_path}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default MoviePage;
