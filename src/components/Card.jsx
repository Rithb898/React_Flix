import { Play, Star } from "lucide-react";
import { Link } from "react-router";

function Card({ id, vote, title, poster, onError }) {
  return (
    <div className='relative group/card w-52'>
      <div className='flex absolute top-1 right-2 text-red-600 text-sm items-center gap-1 z-10'>
        <Star className='w-4 h-4' />
        <span>{vote.toFixed(1)}</span>
      </div>
      <div className='absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/50 flex flex-col items-center justify-center'>
        <Link to={`/movie/${id}`}>
          <button
            className='text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors duration-200'
            aria-label={`Play ${title}`}
          >
            <Play className='w-6 h-6' />
          </button>
        </Link>
        <h3 className='text-center text-white mt-4 px-2 text-sm'>
          {title}
        </h3>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w342/${poster}`}
        alt={`${title} Poster`}
        width={176}
        height={264}
        className='w-full rounded-md'
        onError={onError}
        loading="lazy"
      />
    </div>
  );
}

export default Card;
