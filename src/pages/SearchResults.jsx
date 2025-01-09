import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { apiOptions } from "../lib/apiOptions";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        apiOptions
      )
        .then((res) => res.json())
        .then((data) => setMovies(data.results));

      // Search TV shows
      fetch(`https://api.themoviedb.org/3/search/tv?query=${query}`, apiOptions)
        .then((res) => res.json())
        .then((data) => setTvShows(data.results));
    }
  }, [query]);

  return (
    <div className="w-full justify-center px-10">
      <Navbar />
      <div className="relative w-full mr-80">
        <form onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="Search web series"
            aria-label="Search web series"
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
      <div className="pt-20">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Search Results for "{query}"
        </h2>
        {movies.length > 0 && (
          <section className="py-8">
            <h3 className="mb-6 text-xl font-bold text-white">Movies</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie, index) => (
                <Card
                  key={index}
                  index={index}
                  id={movie.id}
                  vote={movie.vote_average}
                  title={movie.original_title}
                  poster={movie.poster_path}
                />
              ))}
            </div>
          </section>
        )}
        {tvShows.length > 0 && (
          <section className="py-8">
            <h3 className="mb-6 text-xl font-bold text-white">TV Shows</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {tvShows.map((movie, index) => (
                <Card
                  key={index}
                  index={index}
                  id={movie.id}
                  vote={movie.vote_average}
                  title={movie.original_title}
                  poster={movie.poster_path}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
