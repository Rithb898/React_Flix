import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { apiOptions } from "../lib/apiOptions";
import { ArrowLeft, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import Section from "../components/Section";
import Footer from "../components/Footer";

function WebSeriesDetailsPage() {
  const { id } = useParams();
  const [webSeriesDetails, setWebSeriesDetails] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [simmilarWebSeries, setSimmilarWebSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, apiOptions),
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}`,
        apiOptions
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
        apiOptions
      ),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        setWebSeriesDetails(data[0]);
        setEpisodes(data[1].episodes || []);
        setSimmilarWebSeries(data[2].results);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, [id, selectedSeason]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <motion.div initial='hidden' animate='visible' variants={containerVariants}>
      {loading ? (
        <div className='min-h-screen w-full flex justify-center items-center'>
          <ClimbingBoxLoader color='#d3d3d3' />
        </div>
      ) : (
        <div className='flex flex-col'>
          <Link to={"/"}>
            <div className='fixed left-4 top-4 cursor-pointer flex items-center text-xl font-bold'>
              <ArrowLeft /> Back
            </div>
          </Link>
          <div className='h-[850px] w-screen flex justify-center items-center gap-5'>
            <img
              src={`https://image.tmdb.org/t/p/original${webSeriesDetails.backdrop_path}`}
              alt=''
              className='absolute -z-10 w-screen opacity-40'
            />
            <motion.img
              src={`https://image.tmdb.org/t/p/w342/${webSeriesDetails.poster_path}`}
              alt=''
              className='w-64 rounded-md shadow-lg'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className='flex flex-col gap-5 w-[500px]'
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='text-4xl font-bold'>{webSeriesDetails.name}</div>
              <div>
                <div className='flex gap-2 items-center'>
                  {webSeriesDetails.genres?.map((genre) => (
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
              <div>{`${webSeriesDetails.overview
                ?.trim()
                .slice(0, 250)}.....`}</div>
            </motion.div>
          </div>
          <div className='w-screen flex mx-auto items-center justify-center gap-5 -mt-40 mb-5'>
            <label htmlFor='seasons' className='flex gap-2 items-center'>
              Select Season:
            </label>
            <select
              id='seasons'
              className='bg-gray-800 text-white border border-gray-600 rounded-md py-1 px-2 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500'
              onChange={(e) => setSelectedSeason(parseInt(e.target.value, 10))}
              value={selectedSeason}
            >
              {webSeriesDetails.seasons?.map((season) => (
                <option key={season.season_number} value={season.season_number}>
                  Season {season.season_number}
                </option>
              ))}
            </select>
          </div>
          <motion.div
            className='w-screen flex gap-6 flex-wrap justify-center items-center'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {episodes.map((episode) => (
              <motion.div
                key={episode.id}
                className='w-96 rounded-md shadow-lg p-2'
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  src={`https://image.tmdb.org/t/p/w342/${episode.still_path}`}
                  alt=''
                  className='w-full rounded-md'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <span className='text-sm font-bold text-white mb-1'>
                  Episode {episode.episode_number}: {episode.name}
                </span>
                <div className='text-xs text-gray-400'>{episode.overview}</div>
              </motion.div>
            ))}
          </motion.div>
          <div className='w-full ml-40'>
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
      )}
    </motion.div>
  );
}

export default WebSeriesDetailsPage;
