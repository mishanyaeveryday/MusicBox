import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Typography, IconButton } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const AddToPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedCompositionId, setSelectedCompositionId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const compositionId = localStorage.getItem("selectedCompositionId");
        if (compositionId) {
            setSelectedCompositionId(compositionId);
        } else {
            alert("No composition selected. Please select a composition to add.");
        }
    }, []);

    useEffect(() => {
        const fetchUserPlaylists = async () => {
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

                const playlistsPromises = playlistIds.map((id) =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/${id}/`)
                );
                const playlistsData = await Promise.all(playlistsPromises);

                setPlaylists(playlistsData.map((response) => response.data));
            } catch (error) {
                console.error("Error fetching playlists:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPlaylists();
    }, []);

    const handleAddToPlaylist = async (playlistId) => {
        if (!selectedCompositionId) {
            console.error("No composition selected");
            alert("Please select a composition to add.");
            return;
        }

        try {
            // Get the playlist to check for the existing composition
            const { data: playlist } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}core/playlists/${playlistId}/`
            );

            if (playlist.compositions.includes(selectedCompositionId)) {
                alert("Composition is already in this playlist.");
                return;
            }

            // Use PATCH to update the playlist with the new composition ID
            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}core/playlists/${playlistId}/`,
                {
                    compositions: [...playlist.compositions, selectedCompositionId], // Append the composition ID
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

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

            {loading ? (
                <Typography variant="h6" className="text-gray-500">
                    Loading playlists...
                </Typography>
            ) : playlists.length === 0 ? (
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
