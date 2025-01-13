import { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { apiOptions } from "../lib/apiOptions";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Section from "../components/Section";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const WebSeriesPlayer = lazy(() => import("../components/WebSeriesPlayer"));
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// Add these fetch functions
const fetchWebSeriesDetails = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    apiOptions
  );
  return res.json();
};

const fetchSeasonEpisodes = async ({ id, selectedSeason }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}`,
    apiOptions
  );
  return res.json();
};

const fetchSimilarWebSeries = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
    apiOptions
  );
  return res.json();
};

function WebSeriesDetailsPage() {
  const { id } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);

  // Replace useState and useEffect with useQuery
  const { data: webSeriesDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["webSeriesDetails", id],
    queryFn: () => fetchWebSeriesDetails(id),
  });

  const { data: seasonData, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ["seasonEpisodes", id, selectedSeason],
    queryFn: () => fetchSeasonEpisodes({ id, selectedSeason }),
    enabled: !!id && !!selectedSeason,
  });

  const { data: similarData, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ["similarWebSeries", id],
    queryFn: () => fetchSimilarWebSeries(id),
  });

  const episodes = seasonData?.episodes || [];
  const simmilarWebSeries = similarData?.results || [];
  const isLoading = isLoadingDetails || isLoadingEpisodes || isLoadingSimilar;

  // Add image error handling function
  const handleImageError = (e) => {
    e.target.src = "/path/to/fallback-image.jpg"; // Add a fallback image path
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode.episode_number);
    setShowPlayer(true);
  };

  // console.log(simmilarWebSeries);

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className='relative min-h-screen overflow-x-hidden'
    >
      {isLoading ? (
        <div className='min-h-screen w-full flex justify-center items-center'>
          <ClimbingBoxLoader color='#d3d3d3' />
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center px-4 pt-2 md:px-5'>
            <Navbar />
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='w-full md:h-[700px] flex flex-col md:flex-row justify-center items-center gap-5 relative'>
              <img
                src={`https://image.tmdb.org/t/p/original${webSeriesDetails?.backdrop_path}`}
                alt={`${webSeriesDetails?.name} Backdrop`}
                onError={handleImageError}
                loading='lazy'
                className='absolute top-0 left-0 right-0 w-full h-full object-cover opacity-40 hidden md:block -z-50'
              />
              <img
                src={`https://image.tmdb.org/t/p/w342/${webSeriesDetails?.poster_path}`}
                alt={`${webSeriesDetails?.name} Poster`}
                onError={handleImageError}
                loading='lazy'
                className='w-40 md:w-64 md:block hidden'
              />
              <div className='md:hidden flex w-screen justify-center py-5'>
                <motion.img
                  src={`https://image.tmdb.org/t/p/w342/${webSeriesDetails?.poster_path}`}
                  alt={`${webSeriesDetails?.name} Poster`}
                  className='w-40'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <motion.div
                className='flex flex-col gap-5 w-full max-w-[500px] px-4 md:px-0'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className='text-2xl md:text-4xl font-bold text-center md:text-left'>
                  {webSeriesDetails?.name}
                </div>
                <div className='flex justify-center md:justify-start'>
                  <div className='flex flex-wrap gap-2 items-center'>
                    {webSeriesDetails?.genres?.map((genre) => (
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
                <div className='text-sm md:text-base text-center md:text-left'>{`${webSeriesDetails?.overview
                  ?.trim()
                  .slice(0, 250)}.....`}</div>
              </motion.div>
            </div>

            <div className='w-full flex flex-col md:flex-row mx-auto items-center justify-center gap-3 md:gap-5 mt-5 md:-mt-32 mb-5 z-50'>
              <Select
                onValueChange={(value) => setSelectedSeason(Number(value))}
              >
                <SelectTrigger className='w-[180px] bg-gray-800 text-white border-gray-600'>
                  <SelectValue placeholder='Select Season' />
                </SelectTrigger>
                <SelectContent>
                  {webSeriesDetails?.seasons?.map((season) => (
                    <SelectItem
                      key={season.season_number}
                      value={season.season_number.toString()}
                    >
                      Season {season.season_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='w-full flex gap-4 md:gap-6 flex-wrap justify-center items-center px-4 md:px-10'>
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className='w-full md:w-80 rounded-md shadow-lg p-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl bg-gray-800 hover:bg-gray-700'
                  onClick={() => handleEpisodeClick(episode)}
                >
                  <div className='relative'>
                    <img
                      src={`${episode.still_path ? `https://image.tmdb.org/t/p/w342/${episode.still_path}` : "https://placehold.co/304x232/000000/FFF?text=Not+Released" } `}
                      alt={`Episode ${episode.episode_number}`}
                      onError={handleImageError}
                      loading='lazy'
                      className='w-full rounded-md'
                    />
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50'>
                      <Play className='w-12 h-12 text-white' />
                    </div>
                  </div>
                  <span className='text-sm font-bold text-white mb-1'>
                    Episode {episode.episode_number}: {episode.name}
                  </span>
                  <div className='text-xs text-gray-400'>
                    {episode.overview}
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full'>
              <Section
                title={"Similar Web Series"}
                movies={simmilarWebSeries}
                link={"similar-web-series"}
                type={"web-series"}
              />
            </div>
            <div className='w-screen'>
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
                <div className='w-full h-full max-w-7xl mx-auto flex justify-center items-center'>
                  <Suspense fallback={<ClimbingBoxLoader color='#d3d3d3' />}>
                    <WebSeriesPlayer
                      id={id}
                      season={selectedSeason}
                      episode={selectedEpisode}
                    />
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

export default WebSeriesDetailsPage;
