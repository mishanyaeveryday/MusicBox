import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsVisible(true);
  };

  const closePlayer = () => {
    setIsVisible(false);
    setCurrentSong(null);
  };

  return (
    <PlayerContext.Provider value={{ isVisible, currentSong, playSong, closePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  return context;
};
