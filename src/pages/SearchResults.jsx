import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { apiOptions } from "../lib/apiOptions";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Section from "../components/Section";

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
    <div className='w-full overflow-hidden'>
      <Navbar />
      <div className='w-full mx-auto px-10'>
        <h2 className='mb-6 mt-5 text-xl md:text-2xl font-bold text-white'>
          Search Results for "{query}"
        </h2>
        {movies.length > 0 && (
          <section className='py-8'>
            <Section
              title={"Movies"}
              movies={movies}
              link={false}
              linkvisible={false}
              type={"movie"}
            />
          </section>
        )}
        {tvShows.length > 0 && (
          <section className='py-8'>
            <Section
              title={"Web Series"}
              movies={tvShows}
              link={false}
              linkvisible={false}
              type={"web-series"}
            />
          </section>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
