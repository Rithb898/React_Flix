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
    <div className='w-screen justify-center px-60'>
      <Navbar />
      <div className='pt-20'>
        <h2 className='mb-6 text-2xl font-bold text-white'>
          Search Results for "{query}"
        </h2>
        {movies.length > 0 && (
          <section className='py-8'>
            <h3 className='mb-6 text-xl font-bold text-white'>Movies</h3>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
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
          <section className='py-8'>
            <h3 className='mb-6 text-xl font-bold text-white'>TV Shows</h3>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
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
