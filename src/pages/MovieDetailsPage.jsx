import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiOptions } from "../lib/apiOptions";
import { Play, Star, X } from "lucide-react";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { ClimbingBoxLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useQueries } from "@tanstack/react-query";
import { IKImage } from "imagekitio-react";

// Lazy load the MoviePlayer component
const MoviePlayer = lazy(() => import("../components/MoviePlayer"));

function MovieDetailsPage() {
  const { id } = useParams();
  const [showPlayer, setShowPlayer] = useState(false);

  // Enhanced React Query implementation with better error handling and caching
  const [movieDetailsQuery, similarMoviesQuery] = useQueries({
    queries: [
      {
        queryKey: ["movieDetails", id],
        queryFn: async () => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            apiOptions
          );
          if (!response.ok) {
            throw new Error("Failed to fetch movie details");
          }
          return response.json();
        },
        staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
        cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
      },
      {
        queryKey: ["similarMovies", id],
        queryFn: async () => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
            apiOptions
          );
          if (!response.ok) {
            throw new Error("Failed to fetch similar movies");
          }
          return response.json();
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
      },
    ],
  });

  // Image loading error handling
  const [posterError, setPosterError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);

  const handleImageError = (type) => {
    if (type === "poster") setPosterError(true);
    if (type === "backdrop") setBackdropError(true);
  };

  const isLoading = movieDetailsQuery.isLoading || similarMoviesQuery.isLoading;
  const isError = movieDetailsQuery.isError || similarMoviesQuery.isError;
  const error = movieDetailsQuery.error || similarMoviesQuery.error;

  const movieDetails = movieDetailsQuery.data || {};
  const similarMovies = similarMoviesQuery.data?.results || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const fallbackImage = "https://placehold.co/342x513?text=No+Image+Available";

  return (
    <motion.div
      className='relative min-h-screen overflow-x-hidden'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      {isLoading ? (
        <div className='min-h-screen w-full flex justify-center items-center'>
          <ClimbingBoxLoader color='#d3d3d3' />
        </div>
      ) : isError ? (
        <div className='min-h-screen w-full flex justify-center items-center'>
          <p className='text-red-500'>
            Sorry, there was an error fetching movie details. Please try again.
          </p>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center px-4 pt-2 md:px-5'>
            <Navbar />
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='w-full md:h-[700px] flex flex-col md:flex-row justify-center items-center gap-5 relative'>
              <IKImage
                src={
                  movieDetails.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`
                    : fallbackImage
                }
                className='absolute top-0 left-0 right-0 w-full h-full object-cover opacity-40 hidden md:block -z-50'
                loading='lazy'
              />
              <IKImage
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`
                    : fallbackImage
                }
                className='w-40 md:w-64 md:block hidden'
                loading='lazy'
              />

              {/* <img
                src={
                  !backdropError && movieDetails.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`
                    : fallbackImage
                }
                alt='Backdrop'
                className='absolute top-0 left-0 right-0 w-full h-full object-cover opacity-40 hidden md:block -z-50'
                onError={() => handleImageError("backdrop")}
              /> */}
              {/* <img
                src={
                  !posterError && movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`
                    : fallbackImage
                }
                alt='Poster'
                className='w-40 md:w-64 md:block hidden'
                onError={() => handleImageError("poster")}
              /> */}
              <div className='md:hidden w-full flex justify-center py-5'>
                <IKImage
                  src={
                    movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`
                      : fallbackImage
                  }
                  className='w-40'
                  loading='lazy'
                />
                {/* <motion.img
                  src={
                    movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}`
                      : fallbackImage
                  }
                  alt='Poster'
                  className='w-40'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                /> */}
              </div>
              <motion.div
                className='flex flex-col gap-5 w-full max-w-[500px] px-4 md:px-0'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className='text-2xl md:text-4xl font-bold text-center md:text-left'>
                  {movieDetails.original_title}
                </div>
                <div className='flex justify-center md:justify-start'>
                  <div className='flex flex-wrap gap-2 items-center'>
                    {movieDetails.genres?.map((genre) => (
                      <motion.span
                        key={genre.id}
                        className='rounded-full border border-white px-4 py-1.5 text-sm'
                        whileHover={{ scale: 1.1 }}
                      >
                        {genre.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className='text-sm md:text-base text-center md:text-left'>
                  {`${movieDetails.overview?.trim().slice(0, 250)}.....`}
                </div>
                <div className='flex flex-col md:flex-row gap-4 items-center md:items-start text-gray-400 text-sm md:text-base justify-center md:justify-start'>
                  <div className='flex gap-2 items-center'>
                    <span className='font-semibold text-white'>Rating:</span>
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
                <div className='flex justify-center md:justify-start'>
                  <div
                    className='bg-red-600 rounded-full px-3 py-3 cursor-pointer text-white font-bold flex w-40 gap-2 items-center justify-center'
                    onClick={() => setShowPlayer(true)}
                  >
                    <Play />
                    Watch Now
                  </div>
                </div>
              </motion.div>
            </div>
            <div className='w-full'>
              <Section title={"Similar movies"} movies={similarMovies} />
            </div>
            <div className='w-full'>
              <Footer />
            </div>
          </div>

          {showPlayer && (
            <div className='fixed inset-0 w-screen h-screen bg-black/90 z-50 flex flex-col'>
              <div className='flex justify-end p-4'>
                <button
                  onClick={() => setShowPlayer(false)}
                  className='text-white hover:text-red-500 transition-colors'
                  aria-label='Close player'
                >
                  <X className='w-8 h-8' />
                </button>
              </div>

              <div className='flex-1 px-2 sm:px-4 md:px-8 pb-4'>
                <div className='w-full h-full max-w-7xl mx-auto flex flex-col justify-center items-center'>
                  <Suspense
                    fallback={
                      <div className='flex justify-center items-center w-full h-full'>
                        <ClimbingBoxLoader color='#d3d3d3' />
                      </div>
                    }
                  >
                    <iframe
                      data-aa='2375197'
                      src='//acceptable.a-ads.com/2375197'
                      className='w-full h-14 border-0 p-0 overflow-hidden bg-transparent mb-5'
                    ></iframe>
                    <MoviePlayer id={id} />
                  </Suspense>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default MovieDetailsPage;
