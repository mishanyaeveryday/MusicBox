import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, IconButton, Tooltip, Input } from "@material-tailwind/react";
import { PencilIcon, UserIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

const UserPage = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });
    const [recentSongs, setRecentSongs] = useState([]);
    const [recentArtists, setRecentArtists] = useState([]);
    const [icon, setIcon] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    navigate("/login");
                    return;
                }

                const { data } = await api.get(`core/users/${userId}/`);
                setRecentSongs(data.songs || []);
                setRecentArtists(data.artists || []);
                setUserData({ name: data.name || "", email: data.email || "", password: "" });

                const { data: userIcon } = await api.get(`core/users/${userId}/`);
                setIcon(userIcon.iconUrl || "");
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleEdit = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
        updateUserData(field, value);
    };

    const updateUserData = async (field, value) => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                await api.put(`core/users/${userId}`, { [field]: value });
                alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`);
            }
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("icon", file);

                const userId = localStorage.getItem("userId");
                if (userId) {
                    await api.post(`core/users/${userId}/upload-icon`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });

                    const { data: userIcon } = await api.get(`core/users/${userId}/icon`);
                    setIcon(userIcon.iconUrl || "");

                    alert("Icon updated successfully!");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Failed to upload icon.");
            }
        }
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start p-6 h-full">
            <div className="relative w-32 h-32">
                <div className="rounded-full bg-gray-300 flex items-center justify-center w-full h-full">
                    {icon ? (
                        <img src={icon} alt="User Icon" className="h-16 w-16 rounded-full" />
                    ) : (
                        <UserIcon className="h-16 w-16 text-gray-700" />
                    )}
                </div>
                <Tooltip content="Edit" placement="bottom">
                    <label className="!absolute right-0 bottom-0 cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="!absolute p-1"
                            style={{ zIndex: "100", opacity: "0", width: "30px" }}
                        />
                        <IconButton size="sm">
                            <PencilIcon className="h-5 w-5" />
                        </IconButton>
                    </label>
                </Tooltip>
            </div>

            <Card className="w-full max-w-lg mt-6">
                <CardHeader floated={false} shadow={false} className="bg-gray-100 p-4 text-center">
                    <Typography variant="h4">User Profile</Typography>
                </CardHeader>
                <CardBody className="flex flex-col items-center gap-4 p-6">
                    <Input
                        value={userData.name}
                        onChange={(e) => handleEdit("name", e.target.value)}
                        placeholder="Name"
                        className="mb-2 placeholder:opacity-100 w-full"
                    />
                    <Input
                        value={userData.email}
                        onChange={(e) => handleEdit("email", e.target.value)}
                        placeholder="Email"
                        className="mb-2 placeholder:opacity-100 w-full"
                    />
                    <Input
                        type="password"
                        value={userData.password}
                        onChange={(e) => handleEdit("password", e.target.value)}
                        placeholder="Password"
                        className="mb-2 placeholder:opacity-100 w-full"
                    />
                </CardBody>
            </Card>

            <Card className="w-full max-w-lg mt-6">
                <CardHeader floated={false} shadow={false} className="bg-gray-100 p-4 text-center">
                    <Typography variant="h5">Recently Played Songs</Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 p-4">
                    {recentSongs.length > 0 ? (
                        recentSongs.map((song, index) => (
                            <Typography key={index} className="text-gray-700">
                                {index + 1}. {song}
                            </Typography>
                        ))
                    ) : (
                        <Typography className="text-gray-500 text-center">
                            You haven’t listened to any songs yet.
                        </Typography>
                    )}
                </CardBody>
            </Card>

            <Card className="w-full max-w-lg mt-6">
                <CardHeader floated={false} shadow={false} className="bg-gray-100 p-4 text-center">
                    <Typography variant="h5">Recently Played Artists</Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 p-4">
                    {recentArtists.length > 0 ? (
                        recentArtists.map((artist, index) => (
                            <Typography key={index} className="text-gray-700">
                                {index + 1}. {artist}
                            </Typography>
                        ))
                    ) : (
                        <Typography className="text-gray-500 text-center">
                            You haven’t listened to any artists yet.
                        </Typography>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default UserPage;
