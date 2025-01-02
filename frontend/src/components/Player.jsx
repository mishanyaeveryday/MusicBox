import React, { useRef, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { usePlayer } from "./PlayerContext";
import AudioPlayer from 'react-h5-audio-player';
import "react-h5-audio-player/lib/styles.css";
import '../design/Player.css';

const PlayerWrapper = () => {
  const { isVisible, closePlayer } = usePlayer();

  if (!isVisible) return null;

  const currentSong = {
    title: "Sample Song",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleLoadedMetadata = (event) => {
    setDuration(event.target.duration);
  }; 

  return (
    <div className="rounded-xl fixed bottom-0 left-0 w-full shadowHalf text-white z-50">
      <Card className="rounded-xl flex flex-col items-center justify-between px-6 py-4 shadowFull w-full text-white">
        <div className="m-2 w-full">
          <Typography variant="h4" className="text-center">{currentSong.title}</Typography>
        </div>
        <AudioPlayer
          id="audio-player"
          src={currentSong.src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          style={{backgroundColor:"black !important",boxShadow:0}}
        />
      </Card>
    </div>

  );
};

export default PlayerWrapper;
