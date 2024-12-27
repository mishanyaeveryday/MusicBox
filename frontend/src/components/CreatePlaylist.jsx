import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";

const CreatePlaylist = () => {
    const { userId } = useParams();
    const [playlistName, setPlaylistName] = useState('');
    const [playlistImage, setPlaylistImage] = useState(null);
    const [compositions, setCompositions] = useState([]);
    const [addedCompositions, setAddedCompositions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/users/${userId}/playlists`)
            .then((response) => {
                const playlist = response.data;
                setPlaylistName(playlist.name);
                setPlaylistImage(playlist.image);
                setCompositions(playlist.compositions);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных плейлиста:", error);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    const handleNameChange = (e) => {
        setPlaylistName(e.target.value);
    };

    const handleAddComposition = (composition) => {
        if (!addedCompositions.includes(composition)) {
            setAddedCompositions([...addedCompositions, composition]);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPlaylistImage(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const updatedPlaylist = {
            name: playlistName,
            image: playlistImage,
            compositions: addedCompositions,
        };
        axios.put(`/api/playlists/${userId}`, updatedPlaylist)
            .then((response) => {
                alert("Плейлист успешно обновлен");
            })
            .catch((error) => {
                console.error("Ошибка при сохранении плейлиста:", error);
            });
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="intro back1">
            <div className="flex flex-row w-full">
                <div className="h-full w-full">
                    <Card className="h-full w-full shadowHalf">
                        <CardHeader floated={false} className="bg-0 text-center">
                            <Typography variant="h3" className="text-center">
                                Создание плейлиста
                            </Typography>
                        </CardHeader>
                        <CardBody className="text-center">
                            <div className="grid grid-cols-1 gap-4">
                                <Input
                                    label="Название плейлиста"
                                    value={playlistName}
                                    onChange={handleNameChange}
                                />
                                <div>
                                    <label className="block">Изображение плейлиста</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {playlistImage && (
                                        <img
                                            src={playlistImage}
                                            alt="Playlist"
                                            className="mt-4 w-32 h-32 object-cover mx-auto"
                                        />
                                    )}
                                </div>
                                <div>
                                    <Typography variant="h5">Список песен</Typography>
                                    <div className="grid grid-cols-5 gap-4 mt-4">
                                        {compositions.map((composition) => (
                                            <div key={composition.id} className="text-center">
                                                <Typography>{composition.name}</Typography>
                                                <Button
                                                    size="sm"
                                                    color="green"
                                                    onClick={() => handleAddComposition(composition)}
                                                >
                                                    Добавить
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Typography variant="h5">Добавленные песни</Typography>
                                    <div>
                                        {addedCompositions.map((composition, index) => (
                                            <div key={index} className="flex justify-between">
                                                <Typography>{composition.name}</Typography>
                                                <Button
                                                    size="sm"
                                                    color="red"
                                                    onClick={() =>
                                                        setAddedCompositions(
                                                            addedCompositions.filter((item) => item !== composition)
                                                        )
                                                    }
                                                >
                                                    Удалить
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center gap-7 pt-2">
                            <Button color="blue" onClick={handleSave}>
                                Сохранить плейлист
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylist;
