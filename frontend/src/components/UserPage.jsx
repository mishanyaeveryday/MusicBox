import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    IconButton,
    Tooltip,
    Input,
    Button,
} from "@material-tailwind/react";
import { PencilIcon, UserIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

const UserPage = () => {
    const [userData, setUserData] = useState({ username: "", email: "", avatar: "" });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                navigate("/login");
                return;
            }

            const { data } = await api.get(`core/users/${userId}/`);
            setUserData({
                username: data.username || "",
                email: data.email || "",
                avatar: data.avatar || "/images/default_avatar.png",
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        // Удаляем данные пользователя из localStorage
        localStorage.removeItem("userId");
        // Перенаправляем на страницу входа
        navigate("/login");
    };

    const updateUserData = async (field, value) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                console.error("User ID not found in local storage.");
                return;
            }

            const formData = new FormData();
            formData.append(field, value);

            await api.patch(`core/users/${userId}/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            alert(`Failed to update ${field}.`);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const formData = new FormData();
                formData.append("avatar", file);

                await api.patch(`core/users/${userId}/`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const { data: user } = await api.get(`core/users/${userId}/`);
                setUserData((prev) => ({ ...prev, avatar: user.avatar || "/images/default_avatar.png" }));
                alert("Avatar updated successfully!");
            } catch (error) {
                console.error("Error uploading avatar:", error);
                alert("Failed to upload avatar.");
            }
        }
    };

    const handleEdit = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
        updateUserData(field, value);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start p-6 h-full">
            <div className="relative w-32 h-32">
                <div className="rounded-full flex items-center justify-center w-full h-full">
                    {userData.avatar ? (
                        <img src={`http://127.0.0.1:8000/${userData.avatar}`} alt="User Avatar" className="h-32 w-32 rounded-full" />
                    ) : (
                        <UserIcon className="h-32 w-32 text-gray-700" />
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
                        value={userData.username}
                        onChange={(e) => handleEdit("username", e.target.value)}
                        placeholder="Name"
                        className="mb-2 w-full"
                    />
                    <Input
                        value={userData.email}
                        onChange={(e) => handleEdit("email", e.target.value)}
                        placeholder="Email"
                        className="mb-2 w-full"
                    />
                    <Button
                        color="red"
                        onClick={handleLogout}
                        className="w-full mt-4"
                    >
                        Logout
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserPage;
