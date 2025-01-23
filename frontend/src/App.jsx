import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Playlist from './components/Playlist';
import Player from './components/Player';
import Author from './components/Author';
import Register from './components/Register';
import Login from './components/Login';
import Error from './components/Error';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Verify from './components/Verify';
import Notifications from './components/Notifications';
import AddToPlaylist from './components/AddToPlaylist';
import PrivateRoute from './components/PrivateRoute';
import UserPage from './components/UserPage';
import CreatePlaylist from './components/CreatePlaylist';
import FindAComposition from './components/FindAComposition';
import CreateSong from './components/CreateSong';
import './App.css';
import './index.css';
function App() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flexGrow: "2", alignContent: "center" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/playlist/:playlistId' element={<Playlist />} />
          <Route path='/author/:author' element={<Author />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/findAComposition/:name' element={<FindAComposition />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/*" element={<PrivateRoute allowedRoles={['user']}>
            <Routes>
              <Route path="*" element={<Error />}></Route>
              <Route index element={<UserPage />} />
              <Route path="/createPlaylist" element={<CreatePlaylist />} />
              <Route path="/createSong" element={<CreateSong />} />
              <Route path="/addToPlaylist" element={<AddToPlaylist />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </PrivateRoute>} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
      <Player />
      <Footer />
    </div>
  )
}

export default App
