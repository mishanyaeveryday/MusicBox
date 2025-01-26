import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const CreateComposition = () => {
    const [compositionName, setCompositionName] = useState('');
    const [compositionImage, setCompositionImage] = useState(null);
    const [compositionFile, setCompositionFile] = useState(null);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setCompositionName(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompositionFile(file);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompositionImage(file);
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
        formData.append("text", "None");
        formData.append("name", compositionName);
        if (compositionImage) {
            formData.append("image", compositionImage);
        }
        if (compositionFile) {
            formData.append("audio_file", compositionFile);
        }
    
        try {
            const createResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}core/compositions/create/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            const compositionId = createResponse.data.id;
            console.log("Created composition ID:", compositionId);
    
            const userResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/`
            );
    
            const currentCompositions = userResponse.data.compositions || [];
            const updatedCompositions = [...currentCompositions, compositionId];
    
            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/`,
                {
                    compositions: updatedCompositions,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log("User compositions updated successfully.");
            navigate("/");
        } catch (error) {
            console.error(
                "Error during composition creation or user update:",
                error.response?.data || error.message
            );
        }
    };
    

    return (
        <div className="back1 flex justify-center items-center min-h-screen bg-0">
            <Card className="w-full max-w-4xl shadowHalf">
                <CardHeader floated={false} className="text-center shadowFull py-4">
                    <Typography variant="h4">Create a Composition</Typography>
                </CardHeader>
                <CardBody className="space-y-6">
                    <div>
                        <Input
                            label="Composition Name"
                            value={compositionName}
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
                        {compositionImage && (
                            <img
                                src={URL.createObjectURL(compositionImage)}
                                alt="Composition"
                                className="mt-4 w-32 h-32 object-cover mx-auto rounded-md shadow-md"
                            />
                        )}
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center py-4">
                    <Button onClick={handleSave} className="px-6">
                        Save Composition
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreateComposition;
