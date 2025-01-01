import React, { useRef, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Transition } from "@headlessui/react";

const AdvancedAudioPlayer = ({ songName, audioSrc, onClose }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <Transition
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 z-50"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <Typography variant="h6" className="text-gray-800">
            {songName || "No Song Selected"}
          </Typography>
          <audio ref={audioRef} src={audioSrc} onTimeUpdate={handleTimeUpdate} />
        </div>
        <div className="flex items-center gap-4">
          {!isPlaying ? (
            <Button
              color="blue"
              onClick={handlePlay}
              className="rounded-full w-12 h-12 flex justify-center items-center"
            >
              ▶
            </Button>
          ) : (
            <Button
              color="red"
              onClick={handlePause}
              className="rounded-full w-12 h-12 flex justify-center items-center"
            >
              ❚❚
            </Button>
          )}
          <Button
            color="gray"
            onClick={onClose}
            className="rounded-full w-12 h-12 flex justify-center items-center"
          >
            ✖
          </Button>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </Transition>
  );
};

const PlayerApp = () => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState({ name: "", src: "" });

  const handleOpenPlayer = (name, src) => {
    setCurrentSong({ name, src });
    setIsPlayerVisible(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerVisible(false);
    setCurrentSong({ name: "", src: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Button
        color="blue"
        onClick={() =>
          handleOpenPlayer(
            "Sample Song",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          )
        }
      >
        Open Player
      </Button>

      {isPlayerVisible && (
        <AdvancedAudioPlayer
          songName={currentSong.name}
          audioSrc={currentSong.src}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default PlayerApp;
