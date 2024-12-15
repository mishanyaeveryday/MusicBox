import React, { useState } from 'react';
import "../design/Home.css";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Tooltip,
} from "@material-tailwind/react";
import '../design/Home.css';
import { PlayIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";

const Library = (isEmptyPlaylists, isEmptyCompositors) => {
    return (
        <div className="h-full">
            <Card className="h-full shadowHalf">
                <CardHeader floated={false} className="bg-0">
                    <div className="flex gap-2 justify-between">
                        <IconButton variant="text" color="white" className="rounded">
                            <QueueListIcon className="h-6 w-6" />
                        </IconButton>
                        <Typography variant="h3">My media library</Typography>
                        <IconButton variant="text" color="white" className="rounded">
                            <PlusIcon className="h-6 w-6" />
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
                            <Button className='w-56' color='white'>Create playlist</Button>
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
        </div>
    );
};

const Playlists = () => {
    return (
        <div className="h-full">
            <Card className="h-full shadowHalf flex flex-col overflow-y-scroll">
                <CardHeader floated={false} className="bg-0">
                </CardHeader>
                <CardBody className="text-center flex flex-col">
                   <Playlist/>
                   <Playlist/>
                   <Playlist/>
                   <Playlist/>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
            </Card>
        </div>
    );
};

const Playlist = () => {
    return (
        <div>
            <div className="relative">
                <Typography variant="h6" className="text-white text-left ml-6">
                    Name of Playlist
                    <Link
                        className="text-white hover:underline"
                        size="sm"
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
                <Composition />
                <Composition />
                <Composition />
                <Composition />
                <Composition />
                <Composition />
            </div>
        </div>
    );
};

const Compositor = () => {
    return (
        <div>
        </div>
    );
};

const Composition = () => {
    return (
        <div>
            <Card className="w-46 shadowFull m-1 cursor-pointer hover:bg-gray-500/10">
                <div className="relative">
                    <CardHeader color="" className="-mt-0 mt-4">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card-image"
                        />
                        <IconButton
                            size="sm"
                            className="!absolute bottom-0 right-0 m-2"
                        >
                            <PlayIcon className="h-5 w-5"></PlayIcon>
                        </IconButton>
                    </CardHeader>
                </div>
                <CardBody className="p-1">
                    <Typography variant="p" className="text-xs text-left">
                        Name
                    </Typography>
                    <Typography variant="p" className="text-xs text-left">
                        Compositor
                    </Typography>
                </CardBody>
                <CardFooter className="p-1"></CardFooter>
            </Card>
        </div>
    );
};

const Home = () => {
    const [isEmptyPlaylists, setIsEmptyPlaylists] = useState(false);
    const [isEmptyCompositors, setIsEmptyCompositors] = useState(false);
    return (
        <div>
            <div className="intro back1">
                <div className="flex flex-row w-full">
                    <div className="w-1/3 h-full p-6">
                        <Library isEmptyPlaylists={isEmptyPlaylists} isEmptyCompositors={isEmptyCompositors} />
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