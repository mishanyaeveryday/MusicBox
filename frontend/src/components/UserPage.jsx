import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button, Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon, UserIcon } from "@heroicons/react/24/solid";

const UserPage = () => {
    const [recentSongs, setRecentSongs] = useState([
        "Song 1 - Artist 1",
        "Song 2 - Artist 2",
        "Song 3 - Artist 3",
        "Song 4 - Artist 4",
    ]);

    const [recentArtists, setRecentArtists] = useState([
        "Artist 1",
        "Artist 2",
        "Artist 3",
        "Artist 4",
    ]);

    return (
        <div className="flex flex-col items-center justify-start p-6 h-full">
            <div className="relative w-32 h-32">
                <div className="rounded-full bg-gray-300 flex items-center justify-center w-full h-full">
                    <UserIcon className="h-16 w-16 text-gray-700" />
                </div>
                <Tooltip content="Редактировать" placement="bottom">
                    <IconButton
                        className="absolute right-0 bottom-0"
                        size="sm"
                        onClick={() => alert("Редактирование профиля")}
                    >
                        <PencilIcon className="h-5 w-5" />
                    </IconButton>
                </Tooltip>
            </div>

            <Card className="w-full max-w-lg mt-6">
                <CardHeader floated={false} shadow={false} className="bg-gray-100 p-4 text-center">
                    <Typography variant="h4">Профиль пользователя</Typography>
                </CardHeader>
                <CardBody className="flex flex-col items-center gap-4 p-6">
                    <Button variant="outlined" color="blue" onClick={() => alert("Изменить имя")}>
                        Изменить имя
                    </Button>
                    <Button variant="outlined" color="blue" onClick={() => alert("Изменить пароль")}>
                        Изменить пароль
                    </Button>
                    <Button variant="outlined" color="blue" onClick={() => alert("Изменить электронную почту")}>
                        Изменить электронную почту
                    </Button>
                </CardBody>
            </Card>

            <Card className="w-full max-w-lg mt-6">
                <CardHeader floated={false} shadow={false} className="bg-gray-100 p-4 text-center">
                    <Typography variant="h5">Недавно прослушанные песни</Typography>
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
                            Вы ещё не слушали песни.
                        </Typography>
                    )}
                </CardBody>
            </Card>

            <Card className="w-full max-w-lg mt-6">
                <CardHeader floated={false} shadow={false} className="bg-gray-100 p-4 text-center">
                    <Typography variant="h5">Недавно прослушанные исполнители</Typography>
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
                            Вы ещё не слушали исполнителей.
                        </Typography>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default UserPage;