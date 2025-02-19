import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistImage, setPlaylistImage] = useState(null);
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setPlaylistName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPlaylistImage(file);
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
        formData.append("name", playlistName);
        formData.append("description", description);
        if (playlistImage) {
            formData.append("image", playlistImage);
        }
    
        try {
            const createResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}core/playlists/create/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            const playlistId = createResponse.data.id;
            console.log("Created playlist ID:", playlistId);
    
            const userResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/`
            );
    
            const currentPlaylists = userResponse.data.playlists || [];
            const updatedPlaylists = [...currentPlaylists, playlistId];
    
            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/`,
                {
                    playlists: updatedPlaylists,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log("User playlists updated successfully.");
            navigate("/");
        } catch (error) {
            console.error(
                "Error during playlist creation or user update:",
                error.response?.data || error.message
            );
        }
    };
    
    
    
    

    return (
        <div className="back1 flex justify-center items-center min-h-screen bg-0">
            <Card className="w-full max-w-4xl shadowHalf">
                <CardHeader floated={false} className="text-center shadowFull py-4">
                    <Typography variant="h4">Create a Playlist</Typography>
                </CardHeader>
                <CardBody className="space-y-6">
                    <div>
                        <Input
                            label="Playlist Name"
                            value={playlistName}
                            color="white"
                            onChange={handleNameChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Input
                            label="Playlist Description"
                            value={description}
                            color="white"
                            onChange={handleDescriptionChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-white">Playlist Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full mt-2"
                        />
                        {playlistImage && (
                            <img
                                src={URL.createObjectURL(playlistImage)}
                                alt="Playlist"
                                className="mt-4 w-32 h-32 object-cover mx-auto rounded-md shadow-md"
                            />
                        )}
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center py-4">
                    <Button onClick={handleSave} className="px-6">
                        Save Playlist
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreatePlaylist;
