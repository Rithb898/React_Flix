import { useEffect, useState } from "react";
import { apiOptions } from "../lib/apiOptions";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { ClimbingBoxLoader } from "react-spinners";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

function WebSeriesPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1`,
      apiOptions
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
        <h1 className="text-3xl font-bold">Discover Web Series</h1>
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
                type="web-series"
              />
            );
          })}
        </div>

        <div className="w-full">
          <Footer />
        </div>
      </div>
      <BackToTop />
    </>
  );
}

export default WebSeriesPage;
