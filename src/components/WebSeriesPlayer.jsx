import React from "react";

function WebSeriesPlayer({ id, season, episode }) {
  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <iframe
        src={`https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}?server=2`}
        title="Movie Player"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
}

export default WebSeriesPlayer;
