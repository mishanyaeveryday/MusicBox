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

const Library = (isLoggedIn, isEmptyPlaylists, isEmptyCompositors) => {
    const navigate = useNavigate();
    return (
        <div className="h-full">
            <Card className="h-full shadowHalf">
                <CardHeader floated={false} className="bg-0">
                    <div className="flex gap-2 justify-between">
                        <IconButton variant="text" color="white" className="rounded">
                            <QueueListIcon className="h-6 w-6" />
                        </IconButton>
                        <Typography variant="h3">My media library</Typography>
                        <IconButton onClick={() => {
                            if (isLoggedIn) {
                                navigate("/createPlaylist");
                            } else {
                                navigate("/login");
                            }
                        }} variant="text" color="white" className="rounded">
                            <PlusIcon
                                className="h-6 w-6" />
                        </IconButton>
                    </div>
                </CardHeader>
                <CardBody className="text-center">
                    {!isEmptyPlaylists ? (<>
                        <div>

                        </div>
                    </>) : (<>
                        <div className='flex flex-col text-left p-6 shadowFull'>
                            <Typography className='mp-2' variant='h5' color='white'>Create first playlist</Typography>
                            <Typography className='mb-2 ml-2' variant='h7'>We will help you</Typography>
                            <Button onClick={() => {
                                if (isLoggedIn) {
                                    navigate("/createPlaylist");
                                } else {
                                    navigate("/login");
                                }
                            }} className='w-56' color='white'>Create playlist</Button>
                        </div>
                    </>)}
                    {isEmptyCompositors ? (<>
                        <div>

                        </div>
                    </>) : (<>
                        <div>

                        </div>
                    </>)}
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
            </Card>
        </div >
    );
};

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch('/playlists')
            .then((res) => res.json())
            .then((data) => setPlaylists(data));
    }, []);

    return (
        <div className="h-full">
            <Card className="h-full shadowHalf flex flex-col overflow-y-scroll">
                <CardHeader floated={false} className="bg-0"></CardHeader>
                <CardBody className="text-center flex flex-col">
                    {playlists.map((playlist) => (
                        <Playlist
                            key={playlist.id}
                            id={playlist.id}
                            category={playlist.category}
                            name={playlist.name}
                        />
                    ))}
                    <Composition />
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
            </Card>
        </div>
    );
};

const Playlist = ({ id, category, name }) => {
    const [compositions, setCompositions] = useState([]);

    useEffect(() => {
        fetch(`/playlists/${id}/compositions`)
            .then((res) => res.json())
            .then((data) => setCompositions(data));
    }, [id]);

    return (
        <div>
            <div className="relative">
                <Typography variant="h6" className="text-white text-left ml-6">
                    {name}
                    <Link
                        to={`/playlist/${category}`}
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
            <div className="text-center flex flex-row justify-between">
                {compositions.map((composition) => (
                    <Composition key={composition.id} data={composition} />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setIsLoggedIn(false);
                return;
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/token`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.valid) {
                    setIsLoggedIn(true);
                    const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/users/${accountId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    let formattedUsername = "";
                    if (localStorage.getItem('role') == "admin") {
                        formattedUsername = "Admin";
                    }
                    else {
                        console.log(userResponse.data.person);
                        const { firstname, middlename } = userResponse.data.person;
                        formattedUsername = `${firstname} ${middlename}`;
                    }
                    setUserName(formattedUsername);
                } else {
                    localStorage.removeItem("accountId");
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkToken();
    }, [token]);
    const [isEmptyPlaylists, setIsEmptyPlaylists] = useState(false);
    const [isEmptyCompositors, setIsEmptyCompositors] = useState(false);
    return (
        <div>
            <div className="intro back1">
                <div className="flex flex-row w-full">
                    <div className="w-1/3 h-full p-6">
                        <Library isLoggedIn={isLoggedIn} isEmptyPlaylists={isEmptyPlaylists} isEmptyCompositors={isEmptyCompositors} />
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