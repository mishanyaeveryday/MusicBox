import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Typography, IconButton } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const AddToPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedCompositionId, setSelectedCompositionId] = useState(null);

    useEffect(() => {
        const compositionId = localStorage.getItem("selectedCompositionId");
        if (compositionId) {
            setSelectedCompositionId(compositionId);
        }
    }, []);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/`);
                setPlaylists(response.data || []);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        fetchPlaylists();
    }, []);

    const handleAddToPlaylist = async (playlistId) => {
        if (!selectedCompositionId) {
            console.error("No composition selected");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}core/playlists/${playlistId}/add-composition/`, {
                composition_id: selectedCompositionId,
            });
            alert("Composition added to playlist successfully!");
        } catch (error) {
            console.error("Error adding composition to playlist:", error);
            alert("Failed to add composition to playlist.");
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <Typography variant="h3" className="mb-4 font-bold text-gray-800">
                Add Composition to Playlist
            </Typography>

            {playlists.length === 0 ? (
                <Typography variant="h6" className="text-gray-500">
                    No playlists available.
                </Typography>
            ) : (
                <div className="grid grid-cols-1 gap-4 w-full max-w-4xl overflow-y-auto">
                    {playlists.map((playlist) => (
                        <Card key={playlist.id} className="flex flex-row items-center p-4 shadow-md">
                            <CardBody className="flex-1">
                                <Typography variant="h5" className="font-semibold text-gray-800">
                                    {playlist.name.length > 20 ? `${playlist.name.substring(0, 20)}...` : playlist.name}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500">
                                    {playlist.description.length > 50
                                        ? `${playlist.description.substring(0, 50)}...`
                                        : playlist.description}
                                </Typography>
                            </CardBody>
                            <CardFooter>
                                <IconButton
                                    size="lg"
                                    className="bg-green-500 text-white hover:bg-green-600"
                                    onClick={() => handleAddToPlaylist(playlist.id)}
                                >
                                    <PlusIcon className="h-6 w-6" />
                                </IconButton>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddToPlaylist;