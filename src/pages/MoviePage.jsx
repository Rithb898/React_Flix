import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { apiOptions } from "../lib/apiOptions";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { movieGenre } from "../lib/genre";
import Card from "../components/Card";
import { ClimbingBoxLoader } from "react-spinners";
import Footer from "../components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import BackToTop from "../components/BackToTop";

function MoviePage() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

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
        <h1 className="text-3xl font-bold" id="top">Discover Movies</h1>
      </div>
      <div className="flex justify-between w-full items-center px-10 md:px-72">
        <div className="relative w-full md:mr-80">
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search movies"
              aria-label="Search movies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700/50 border-0 focus-visible:ring-0 text-white placeholder:text-gray-300 px-5"
            />
            <div
              className="bg-black w-10 absolute right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-full"
              onClick={handleSearch}
            >
              <Search className="text-gray-300 h-5 w-5" />
            </div>
          </form>
        </div>
        <div className="flex gap-5">
          <Select onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-600">
              <SelectValue placeholder="Genres" />
            </SelectTrigger>
            <SelectContent>
              {movieGenre.map((genre) => (
                <SelectItem key={genre.id} value={genre.name}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-600">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        {searchData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-10 mx-auto w-full px-4 md:px-10 pt-5">
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
                />
              );
            })}
          </div>
        )}
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
