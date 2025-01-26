import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

const EditComposition = () => {
    const [selectedCompositionId, setSelectedCompositionId] = useState(null);
    const playlistId = localStorage.getItem("playlistId");
    const [compositionData, setCompositionData] = useState({
        name: '',
        imageUrl: '',
        songUrl: '',
        compositionImage: null,
        compositionFile: null,
    });
    const [showRemoveFromPlaylist, setShowRemoveFromPlaylist] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const compositionId = localStorage.getItem("selectedCompositionId");
        if (compositionId) {
            setSelectedCompositionId(compositionId);
        } else {
            alert("No composition selected. Please select a composition to add.");
        }
    }, []);

    useEffect(() => {
        const fetchCompositionData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/compositions/${selectedCompositionId}/`);
                const data = response.data;
                setCompositionData({
                    name: data.name,
                    imageUrl: data.image,
                    songUrl: data.audio_file,
                });
            } catch (error) {
                console.error("Error fetching composition data:", error);
            }
        };

        fetchCompositionData();

        if (playlistId === "none") {
            setShowRemoveFromPlaylist(false); 
        }
    }, [selectedCompositionId, playlistId]);

    const handleNameChange = (e) => {
        setCompositionData({ ...compositionData, name: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompositionData({ ...compositionData, compositionFile: file });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompositionData({ ...compositionData, compositionImage: file });
        }
    };

    const handleSave = async () => {
        const formData = new FormData();

        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        formData.append("user_id", userId);
        formData.append("name", compositionData.name);
        if (compositionData.compositionImage) {
            formData.append("image", compositionData.compositionImage);
        }
        if (compositionData.compositionFile) {
            formData.append("audio_file", compositionData.compositionFile);
        }

        try {
            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}core/compositions/${selectedCompositionId}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Composition updated successfully.");
            navigate(`/`);
        } catch (error) {
            console.error("Error during composition update:", error.response?.data || error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}core/compositions/${selectedCompositionId}/`);
            console.log("Composition deleted successfully.");
            navigate(`/`);
        } catch (error) {
            console.error("Error deleting composition:", error.response?.data || error.message);
        }
    };

    const handleRemoveFromPlaylist = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/playlists/${playlistId}/`);
            const playlist = response.data;

            const updatedCompositions = playlist.compositions.filter(
                (id) => id !== selectedCompositionId
            );

            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}core/playlists/${playlistId}/`,
                { compositions: updatedCompositions },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Composition removed from playlist.");
            navigate(`/playlist/${playlistId}`);
        } catch (error) {
            console.error("Error removing composition from playlist:", error.response?.data || error.message);
        }
    };

    return (
        <div className="back1 flex justify-center items-center min-h-screen bg-0">
            <Card className="w-full max-w-4xl shadowHalf">
                <CardHeader floated={false} className="text-center shadowFull py-4">
                    <Typography variant="h4">Edit Composition</Typography>
                </CardHeader>
                <CardBody className="space-y-6">
                    <div>
                        <Input
                            label="Composition Name"
                            value={compositionData.name}
                            color="white"
                            onChange={handleNameChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-white">Composition Audio</label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="block w-full mt-2"
                        />
                    </div>
                    <div>
                        <label className="block text-white">Composition Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full mt-2"
                        />
                        {compositionData.compositionImage && (
                            <img
                                src={URL.createObjectURL(compositionData.compositionImage)}
                                alt="Composition"
                                className="mt-4 w-32 h-32 object-cover mx-auto rounded-md shadow-md"
                            />
                        )}
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center py-4 space-x-4">
                    <Button onClick={handleSave} className="px-6">
                        Save Changes
                    </Button>
                    <Button onClick={handleDelete} color="red" className="px-6">
                        Delete Composition
                    </Button>
                    {showRemoveFromPlaylist && (
                        <Button onClick={handleRemoveFromPlaylist} color="red" className="px-6">
                            Remove from Playlist
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default EditComposition;
