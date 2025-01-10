import { Play, Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";
import LazyLoad from "react-lazyload";

function Section({ title, movies, link, type }) {
  return (
    <div className="px-1 md:px-10">
      {/* Section Title */}
      <div className="flex justify-between items-center pt-5">
        <div>
          <div className="text-xl md:text-2xl font-bold">{title}</div>
          <div className="bg-red-600 w-16 md:w-24 h-1 mt-2"></div>
        </div>
        <Link to={`/type/${link}`}>
          <div className="border-2 border-white/70 rounded-xl px-3 py-0.5 text-white cursor-pointer text-sm md:text-base">
            View All
          </div>
        </Link>
      </div>

      {/* Movies Swiper */}
      <div className="relative group mt-5">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView="auto"
          className="!overflow-hidden"
        >
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className="!w-32 sm:!w-36 md:!w-44 lg:!w-48"
            >
              <div className="relative group/card">
                {/* Movie Rating */}
                <div className="flex absolute top-1 right-2 text-orange-500 text-xs md:text-sm items-center gap-1 z-10">
                  <Star className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/50 flex flex-col items-center justify-center">
                  <Link to={`/${type}/${movie.id}`}>
                    <button
                      className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                      aria-label={`Play ${movie.original_title}`}
                    >
                      <Play className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </Link>
                  <h3 className="text-center text-white mt-4 px-2 text-xs md:text-sm">
                    {movie.original_title || movie.name}
                  </h3>
                </div>

                {/* Movie Poster */}
                <LazyLoad height={216} offset={100}>
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt={`${movie.original_title} Poster`}
                    width={144}
                    height={216}
                    className="w-full h-auto rounded-md"
                  />
                </LazyLoad>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Section;
