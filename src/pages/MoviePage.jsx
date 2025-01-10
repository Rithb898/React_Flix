import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiOptions } from "../lib/apiOptions";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { ClimbingBoxLoader } from "react-spinners";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

function MoviePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`,
      apiOptions
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

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
        <h1 className="text-3xl font-bold" id="top">
          Discover Movies
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-10 mx-auto w-full px-4 md:px-10 pt-5">
          {data.map((movie, index) => {
            return (
              <Card
                key={index}
                index={index}
                id={movie.id}
                vote={movie.vote_average}
                title={movie.original_title}
                poster={movie.poster_path}
                type="movie"
              />
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <Link to="#top">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md mt-5"
              onClick={() => setPage(page + 1) & setLoading(true)}
            >
              Load More
            </button>
          </Link>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
      <BackToTop />
    </>
  );
}

export default MoviePage;
