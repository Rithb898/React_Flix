import React, { useState } from "react";

function WebSeriesPlayer({ id, season, episode }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 rounded-lg">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        src={`https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}?server=2`}
        title="Movie Player"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
}

export default WebSeriesPlayer;
