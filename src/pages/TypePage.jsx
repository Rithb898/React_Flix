import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiOptions } from "../lib/apiOptions";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { ClimbingBoxLoader } from "react-spinners";
import Footer from "../components/Footer";

function TypePage() {
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
  const movieData = {
    "trending-movies": trendingMovies,
    "trending-web-series": trendingWebSeris,
    "top-rated-movies": topRatedMovies,
    "top-rated-web-series": topRatedWebSeris,
  };

  const data = movieData[type] || [];

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
      <div className="w-full mx-auto px-10">
        <Navbar />
      </div>
      {loading && (
        <div className="min-h-screen w-full flex justify-center items-center">
          <ClimbingBoxLoader color="#d3d3d3" />
        </div>
      )}
      <div className="flex justify-center w-full py-20 mb-5 bg-gray-600 -mt-12 rounded-lg">
        <h1 className="text-3xl font-bold">
          {type == "trending-movies"
            ? "Trending Movies"
            : type == "trending-web-series"
            ? "Trending Web Series"
            : type == "top-rated-movies"
            ? "Top Rated Movies"
            : "Top Rated Web Series"}
        </h1>
      </div>
      <div className="w-full">
        <div className="flex justify-center flex-wrap gap-5 mx-auto w-full px-10 pt-5">
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
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default TypePage;
