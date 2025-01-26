import React, { useEffect, useState } from 'react';
import "../design/Home.css";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Tooltip,
} from "@material-tailwind/react";
import Composition from './Composition';
import '../design/Home.css';
import axios from "axios";
import { PlayIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";

const Library = () => {
    const [isLoggedIn, setIsLogin] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const [compositions, setCompositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("User not logged in");
                    return;
                }

                const { data: userData } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/`
                );

                const playlistIds = userData.playlists || [];
                const compositionIds = userData.compositions || [];

                const playlistsPromises = playlistIds.map((id) =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/${id}/`)
                );
                const playlistsData = await Promise.all(playlistsPromises);

                const compositionsPromises = compositionIds.map((id) =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}core/compositions/${id}/`)
                );
                const compositionsData = await Promise.all(compositionsPromises);

                setPlaylists(playlistsData.map((response) => response.data));
                setCompositions(compositionsData.map((response) => response.data));
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Typography variant="h5">Loading...</Typography>
            </div>
        );
    }

    return (
        <div className="h-full">
            <Card className="h-full shadowHalf">
                <CardHeader floated={false} className="bg-0">
                    <div className="flex gap-2 justify-between">
                        <IconButton variant="text" color="white" className="rounded">
                            <QueueListIcon className="h-6 w-6" />
                        </IconButton>
                        <Typography variant="h3">My media library</Typography>
                        <IconButton
                            onClick={() => navigate(isLoggedIn ? "/user/createPlaylist" : "/login")}
                            variant="text"
                            color="white"
                            className="rounded"
                        >
                            <PlusIcon className="h-6 w-6" />
                        </IconButton>
                    </div>
                </CardHeader>
                <CardBody className="text-center">
                    <div className="flex flex-row justify-between shadowFull">
                        <Button
                            onClick={() => navigate(isLoggedIn ? "/user/createPlaylist" : "/login")}
                            className="w-56 m-2"
                            color="white"
                        >
                            Create playlist
                        </Button>
                        <Button
                            onClick={() => navigate(isLoggedIn ? "/user/createSong" : "/login")}
                            className="w-56 m-2"
                            color="white"
                        >
                            Create composition
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 max-h-[255px] overflow-y-auto"
                        style={{
                            maxWidth: "100%",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#ffffff #2d3748",
                        }}>
                        {playlists.reverse().map((playlist) => (
                            <div key={playlist.id} className="p-4 my-1 rounded-md bg-gray-800">
                                <Typography variant="h5" className="text-white">{playlist.name}</Typography>
                                <Typography className="text-gray-400">{playlist.description}</Typography>
                                <Link
                                    to={`/playlist/${playlist.id}`}
                                    className="hover:underline text-blue-400"
                                    style={{
                                        fontFamily: "Arsenal",
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    Show all
                                </Link>
                            </div>

                        ))}
                    </div>
                    <div
                        className="text-center grid grid-cols-3 gap-4 justify-items-center overflow-y-auto overflow-x-hidden"
                        style={{
                            maxWidth: "100%",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#ffffff #2d3748",
                        }}
                    >
                        {compositions.map((composition) => (
                            <div key={composition.id} className="ml-4 p-4">
                                <Composition compositionId={composition.id} playlistId={"none"} />
                            </div>
                        ))}
                    </div>

                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
            </Card>
        </div>
    );
};



const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/`)
            .then((res) => setPlaylists(res.data))
            .catch((error) => console.error("Error fetching playlists:", error));
    }, []);

    return (
        <div className="h-full">
            <Card className="h-full shadowHalf flex flex-col overflow-y-scroll"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#ffffff #2d3748" }}>
                <CardBody className="text-center flex flex-col">
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <Playlist
                                key={playlist.id}
                                id={playlist.id}
                                name={playlist.name}
                            />
                        ))
                    ) : (
                        <Typography variant="h6" color="gray">
                            No playlists available
                        </Typography>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};


const Playlist = ({ id, name }) => {
    const [compositions, setCompositions] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/${id}/compositions/`)
            .then((res) => setCompositions(res.data))
            .catch((error) => console.error(`Error fetching compositions for playlist ${id}:`, error));
    }, [id]);

    if (compositions.length === 0) {
        return null;
    }

    return (
        <div className="relative my-4">
            <div className="relative">
                <Typography variant="h6" className="text-white text-left ml-6">
                    {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                    <Link
                        to={`/playlist/${id}`}
                        className="text-white hover:underline"
                        style={{
                            fontFamily: "Arsenal",
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        Show all
                    </Link>
                </Typography>
            </div>
            <div
                className="text-center flex flex-row justify-start overflow-x-scroll overflow-y-hidden"
                style={{ maxWidth: "100%", whiteSpace: "nowrap", scrollbarWidth: "thin", scrollbarColor: "#ffffff #2d3748" }}
            >
                {compositions.map((composition) => (
                    <div key={composition.id} className="inline-block mx-2">
                        <Composition compositionId={composition.id} playlistId={id} />
                    </div>
                ))}
            </div>
        </div>
    );
};



const Home = () => {
    return (
        <div>
            <div className="intro back1">
                <div className="flex flex-row w-full">
                    <div className="w-1/3 h-full p-3">
                        <Library />
                    </div>
                    <div className="w-2/3 h-full p-3">
                        <Playlists />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
