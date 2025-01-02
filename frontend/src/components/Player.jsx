import React, { useRef, useState } from "react";
import { Card, Button, Typography, IconButton, Slider } from "@material-tailwind/react";
import { PlayIcon, PauseIcon, XMarkIcon, ChevronDoubleRightIcon, ArrowPathRoundedSquareIcon, ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { usePlayer } from "./PlayerContext";

const PlayerWrapper = () => {
  const { isVisible, closePlayer } = usePlayer();

  if (!isVisible) return null;

  const currentSong = {
    title: "Sample Song",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const skipToPrevious = () => {
    console.log("Skipping to previous track");
  };

  const skipToNext = () => {
    console.log("Skipping to next track");
  };
  
  const [isRepeating, setIsRepeating] = useState(false);

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
    console.log(isRepeating ? "Repeat Off" : "Repeat On");
  };

  const togglePlayPause = () => {
    const audioPlayer = document.getElementById("audio-player");
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleLoadedMetadata = (event) => {
    setDuration(event.target.duration);
  };

  const handleSeek = (event, newValue) => {
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer && typeof newValue === "number" && newValue >= 0 && newValue <= duration) {
      audioPlayer.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    if (typeof newValue === "number" && newValue >= 0 && newValue <= 1) {
      const audioPlayer = document.getElementById("audio-player");
      if (audioPlayer) {
        audioPlayer.volume = newValue;
        setVolume(newValue);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="rounded-xl fixed bottom-0 left-0 w-full shadowHalf text-white z-50">
      <Card className="rounded-xl flex flex-col items-center justify-between px-6 py-4 shadowFull w-full text-white">
        <div className="m-2 w-full">
          <Typography variant="h4" className="text-center">{currentSong.title}</Typography>
        </div>
        <audio
          id="audio-player"
          src={currentSong.src}
          controls
          className="hidden"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        ></audio>
        <div className="flex items-center justify-center w-full space-x-6 mt-4">
          <IconButton onClick={closePlayer} color="red">
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
          <IconButton onClick={skipToPrevious} color="blue">
            <ChevronDoubleLeftIcon className="h-6 w-6" />
          </IconButton>
          <IconButton onClick={togglePlayPause} color={isPlaying ? "blue" : "green"}>
            {isPlaying ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </IconButton>
          <IconButton onClick={skipToNext} color="blue">
            <ChevronDoubleRightIcon className="h-6 w-6" />
          </IconButton>
          <IconButton onClick={toggleRepeat} color={isRepeating ? "green" : "blue"}>
            <ArrowPathRoundedSquareIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <div className="w-full mt-4">
          <div className="flex justify-between items-center w-full">
            <Typography variant="body2" className="text-sm">{formatTime(currentTime)}</Typography>
            <Slider
              value={currentTime}
              min={0}
              max={duration || 0}
              onChange={handleSeek}
              className="mx-4 w-4/5"
              style={{
                backgroundSize: `${(currentTime / duration) * 100}% 100%`, 
                backgroundPosition: '0 0',
                backgroundRepeat: 'no-repeat',
                transition: 'background-size 0.2s ease'
              }}
            />
            <Typography variant="body2" className="text-sm">{formatTime(duration)}</Typography>
          </div>
        </div>

        <div className="w-full mt-4 flex justify-end items-center">
          <Typography variant="body2" className="text-sm mr-2">Volume</Typography>
          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            className="w-1/5"
          />
        </div>

      </Card>
    </div>

  );
};

export default PlayerWrapper;
