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
    const [isEmptyPlaylists, setIsEmptyPlaylists] = useState(true);
    const [isLoggedIn, setIsLogin] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("Пользователь не авторизован");
            setLoading(false);
            setIsLogin(false);
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/library`)
            .then((response) => {
                const { playlists, compositors } = response.data || {};

                if (playlists?.length > 0) {
                    setIsEmptyPlaylists(false);
                    setPlaylists(playlists);
                } else {
                    setIsEmptyPlaylists(true);
                }
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных библиотеки:", error);
            })
            .finally(() => {
                setLoading(false);
            });
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
                    {isEmptyPlaylists === true ? (
                        <div className="flex flex-col text-left p-6 shadowFull">
                            <Typography className="mb-2" variant="h5" color="white">
                                Create your first playlist
                            </Typography>
                            <Typography className="mb-2 ml-2" variant="h7">
                                We will help you
                            </Typography>
                            <Button
                                onClick={() => navigate(isLoggedIn ? "/user/createPlaylist" : "/login")}
                                className="w-56"
                                color="white"
                            >
                                Create playlist
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {playlists.map((playlist) => (
                                <div key={playlist.id} className="p-4 border rounded-md shadow-sm bg-white">
                                    <Typography variant="h5">{playlist.name}</Typography>
                                    <Typography className="text-gray-600">{playlist.description}</Typography>
                                </div>
                            ))}
                        </div>
                    )}
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
            <Card className="h-full shadowHalf flex flex-col overflow-y-scroll">
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

    return (
        <div>
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
                className="text-center flex flex-row justify-start overflow-x-auto"
                style={{ maxWidth: "100%", whiteSpace: "nowrap" }}
            >
                {compositions.map((composition) => (
                    <div key={composition.id} className="inline-block mx-2">
                        <Composition compositionId={composition.id} />
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
                    <div className="w-1/3 h-full p-6">
                        <Library />
                    </div>
                    <div className="w-2/3 h-full p-6">
                        <Playlists />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
