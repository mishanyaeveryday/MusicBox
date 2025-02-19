import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, IconButton, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import axios from "axios";
import { PlayIcon } from "@heroicons/react/24/outline";
import Composition from './Composition';
import { usePlayer } from './PlayerContext';

const Playlist = () => {
    const { playlistId } = useParams();
    const [compositions, setCompositions] = useState([]);
    const { playSong } = usePlayer();
    const [playlistIcon, setPlaylistIcon] = useState("");
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/${playlistId}/`)
            .then((response) => {
                setPlaylistIcon(response.data.image);
                setPlaylistName(response.data.name);
                setPlaylistDescription(response.data.description);
            })
            .catch((error) => {
                console.error("Error fetching playlist data:", error);
            });

        axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/${playlistId}/compositions/`)
            .then((response) => {
                setCompositions(response.data || []);
            })
            .catch((error) => {
                console.error("Error fetching compositions data:", error);
            });
    }, [playlistId]);

    const handlePlayPlaylist = () => {
        if (compositions.length > 0) {
            const firstComposition = compositions[0];
            playSong({
                title: firstComposition.name,
                src: firstComposition.audio_file,
            });
        } else {
            alert("Playlist is empty!");
        }
    };

    return (
        <div>
            <div className="intro back1">
                <div className="shadowHalf rounded flex flex-col w-full mt-4 m-4">
                    <div className="shadowFull rounded flex items-center bg-white px-6 py-4 m-4">
                        <div className="w-24 h-24 mr-6">
                            {playlistIcon ? (
                                <img
                                    src={`http://127.0.0.1:8000${playlistIcon}`}
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
                                {playlistName.length > 10 ? `${playlistName.substring(0, 10)}...` : playlistName}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500 text-sm leading-relaxed">
                                <p className="break-words mt-2 max-w-2xl">{playlistDescription}</p>
                            </Typography>
                        </div>
                        <IconButton
                            size="sm"
                            className="h-16 w-16 max-w-full max-h-full rounded-full"
                            onClick={handlePlayPlaylist}
                        >
                            <PlayIcon className="pl-1 h-16 w-16"></PlayIcon>
                        </IconButton>
                    </div>
                    <div className="h-full w-full">
                        <Card className="h-full w-full bg-0">
                            <CardBody className="text-center">
                                <div className="grid grid-cols-8 gap-4">
                                    {compositions.length === 0 ? (
                                        <Typography variant="h6" className="col-span-5 text-center text-gray-500">
                                            No compositions available in this playlist.
                                        </Typography>
                                    ) : (
                                        compositions.map((composition) => (
                                            <Composition compositionId={composition.id} playlistId={playlistId} />
                                        ))
                                    )}
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

export default Playlist;
