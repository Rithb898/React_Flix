import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { apiOptions } from "../lib/apiOptions";
import { ArrowLeft, Play, Star } from "lucide-react";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { ClimbingBoxLoader } from "react-spinners";
import Navbar from "../components/Navbar";

function MovieDetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [simmilarMovies, setSimmilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        apiOptions
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        apiOptions
      ),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        setMovieDetails(data[0]);
        setSimmilarMovies(data[1].results);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {loading ? (
        <div className='min-h-screen w-full flex justify-center items-center'>
          <ClimbingBoxLoader color='#d3d3d3' />
        </div>
      ) : (
        <>
          <div className='w-screen flex justify-center px-4 pt-2 md:px-60'>
            <Navbar />
          </div>
          <div className='flex justify-center flex-col'>
            <div className='md:h-[700px] w-screen md:flex justify-center items-center gap-5'>
              <img
                src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                alt=''
                className='absolute -z-50 w-screen opacity-40 hidden md:block'
              />
              <img
                src={`https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`}
                alt=''
                className='w-40 md:w-64 md:block hidden'
              />
              <div className='md:hidden flex w-screen justify-center py-5'>
                <img
                  src={`https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`}
                  alt=''
                  className='w-40 md:w-64'
                />
              </div>
              <div className='flex flex-col gap-5 w-[250px] md:w-[500px]'>
                <div className='text-2xl md:text-4xl font-bold md:block flex justify-center w-screen'>
                  {movieDetails.original_title}
                </div>
                <div>
                  <div className='flex gap-2 items-center md:w-full w-screen md:justify-normal justify-center'>
                    {movieDetails.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className='rounded-full border border-white px-4 py-1.5 text-sm'
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='text-sm md:text-base flex md:justify-normal justify-center md:w-full w-screen md:px-0 px-2'>
                  <div className="w-80">
                    {`${movieDetails.overview?.trim().slice(0, 250)}.....`}
                  </div>
                </div>
                <div className='flex md:flex-row gap-4 items-center md:items-start text-gray-400 text-sm md:text-base md:w-full w-screen md:justify-normal justify-center'>
                  <div className='flex gap-2 items-center'>
                    <span className='font-semibold text-white'>Rating:</span>{" "}
                    <Star className='text-yellow-500' />
                    {movieDetails.vote_average}
                  </div>
                  <div>
                    <span className='font-semibold text-white'>
                      Release Date:
                    </span>{" "}
                    {movieDetails.release_date}
                  </div>
                </div>
                <div className="md:block flex justify-center md:w-full w-screen">
                  <Link
                    to={`https://player.smashy.stream/movie/${id}`}
                    target='_blank'
                  >
                    <div className='bg-red-600 rounded-full px-3 py-3 cursor-pointer text-white font-bold flex w-40 gap-2'>
                      <Play />
                      Watch Now
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className='w-full ml-2 md:ml-40'>
              <Section title={"Similar movies"} movies={simmilarMovies} />
            </div>
            <div className='w-screen'>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
