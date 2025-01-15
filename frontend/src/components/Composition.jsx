import React, { useEffect, useState } from 'react';
import "../design/Home.css";
import { usePlayer } from './PlayerContext';
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Tooltip,
} from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/outline";

const Composition = ({ compositionId }) => {
    const { playSong } = usePlayer();

    const [compositionData, setCompositionData] = useState({
        name: '',
        author: '',
        imageUrl: '',
        songUrl: '',
    });

    useEffect(() => {
        const fetchCompositionData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/compositions/${compositionId}`);
                const data = response.data;

                const response2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/users/${data.user_id}`);
                const data2 = response2.data;

                setCompositionData({
                    name: data.name,
                    author: data2.username,
                    imageUrl: data.image,
                    songUrl: data.audio_file,
                });
            } catch (error) {
                console.error("Error fetching composition data:", error);
            }
        };

        fetchCompositionData();
    }, [compositionId]);

    return (
        <div>
            <Card className="w-46 shadowFull m-1 cursor-pointer hover:bg-gray-500/10">
                <div className="relative">
                    <CardHeader color="" className="-mt-0 mt-4">
                        <img
                            className="w-full"
                            src={compositionData.imageUrl || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90-..."}
                            alt="card-image"
                        />
                        <IconButton
                            size="sm"
                            className="!absolute bottom-0 right-0 m-2"
                            onClick={() => playSong({ title: compositionData.title, src: compositionData.songUrl })}
                        >
                            <PlayIcon className="h-5 w-5" />
                        </IconButton>
                    </CardHeader>
                </div>
                <CardBody className="p-1">
                    <Typography variant="p" className="text-xs text-left">
                        {compositionData.name || "Name"}
                    </Typography>
                    <Typography variant="p" className="text-xs text-left">
                        {compositionData.author || "Compositor"}
                    </Typography>
                </CardBody>
                <CardFooter className="p-1">
                </CardFooter>
            </Card>
        </div>
    );
};

export default Composition;
