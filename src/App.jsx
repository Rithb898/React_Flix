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
  const [error, setError] = useState(null);
  const sections = [
    {
      title: "Trending Movies",
      data: trendingMovies,
      link: "trending-movies",
      type: "movie",
    },
    {
      title: "Top Rated Movies",
      data: topRatedMovies,
      link: "top-rated-movies",
      type: "movie",
    },
    {
      title: "Trending Web Series",
      data: trendingWebSeris,
      link: "trending-web-series",
      type: "web-series",
    },
    {
      title: "Top Rated Web Series",
      data: topRatedWebSeris,
      link: "top-rated-web-series",
      type: "web-series",
    },
  ];

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
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <ClimbingBoxLoader color="#d3d3d3" />
        </div>
      ) : (
        <div className="w-full flex flex-col px-2 sm:px-4 lg:px-5 py-4">
          <Navbar />

          {sections.map((section, idx) => (
            <Section
              key={idx}
              title={section.title}
              movies={section.data}
              link={section.link}
              type={section.type}
              linkvisible={true}
            />
          ))}
          {error && <div className="text-red-500 text-center">{error}</div>}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
