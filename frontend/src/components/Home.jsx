import React, { useState } from 'react';
import "../design/Home.css";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Tooltip,
} from "@material-tailwind/react";
import '../design/Home.css';
import { MagnifyingGlassIcon, PlusCircleIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";

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
            <Card className="h-full shadowHalf">
                <CardHeader floated={false} className="bg-0">
                </CardHeader>
                <CardBody className="text-center">
                    <Composition />
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
            </Card>
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
            <Card className="mt-6 w-96">
                <CardHeader color="" className="">
                    <img className=''
                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                        alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="" className="mb-2">
                        Name
                    </Typography>
                    <Typography>
                        Compositor
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>Play</Button>
                </CardFooter>
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