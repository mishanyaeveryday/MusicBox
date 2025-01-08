import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, IconButton, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { PlayIcon } from "@heroicons/react/24/outline";

const Author = () => {
    const { author } = useParams();
    const [compositions, setCompositions] = useState([]);
    const [playlistIcon, setPlaylistIcon] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}core/users?author=${author}`)
            .then((response) => {
                setPlaylistIcon(response.data.icon || "");
                setCompositions(response.data.compositions || []);
            })
            .catch((error) => {
                console.error("Error fetching author data:", error);
            });
    }, [author]);

    return (
        <div>
            <div className="intro back1">
                <div className="shadowHalf rounded flex flex-col w-full mt-4 m-4">
                    <div className="shadowFull rounded flex items-center bg-white px-6 py-4 m-4">
                        <div className="w-24 h-24 mr-6">
                            {playlistIcon ? (
                                <img
                                    src={playlistIcon}
                                    alt="Playlist Icon"
                                    className="rounded-full object-cover w-full h-full"
                                />
                            ) : (
                                <div className="rounded-full bg-gray-300 w-full h-full flex items-center justify-center">
                                    <Typography className="text-gray-600">No Image</Typography>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <Typography variant="h3" className="font-semibold text-gray-800">
                                {author}
                            </Typography>
                        </div>
                        <IconButton
                            size="sm"
                            className="h-16 w-16 max-w-full max-h-full rounded-full"
                        >
                            <PlayIcon className="pl-1 h-16 w-16"></PlayIcon>
                        </IconButton>
                    </div>
                    <div className="h-full w-full">
                        <Card className="h-full w-full bg-0">
                            <CardBody className="text-center">
                                <div className="grid grid-cols-5 gap-4">
                                    {compositions.map((composition) => (
                                        <Composition key={composition.id} data={composition} />
                                    ))}
                                </div>
                            </CardBody>
                            <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;
