import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Notifications = () => {
    const [userId] = useParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/subscriptions`)
            .then((response) => {
                const subscriptions = response.data?.subscriptions;
                if (subscriptions?.length > 0) {
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}core/news?subscriptions=${subscriptions.join(',')}`)
                        .then((newsResponse) => {
                            setNews(newsResponse.data);
                        })
                        .catch((error) => {
                            console.error('Ошибка при загрузке новостей:', error);
                            setNews([]);
                        });
                } else {
                    setNews([]);
                }
            })
            .catch((error) => {
                console.error('Ошибка при загрузке подписок:', error);
                setNews([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Typography variant="h5">Loading...</Typography>
            </div>
        );
    }

    return (
        <div className="intro back1">
            <div className="h-full w-full p-4">
                <Card className="h-full w-full shadowHalf">
                    <CardHeader floated={false} className="bg-0 text-center">
                        <Typography variant="h3" className="text-center">
                            Notifications
                        </Typography>
                    </CardHeader>
                    <CardBody className="text-left p-4">
                        {news.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {news.map((item) => (
                                    <NotificationCard key={item.id} data={item} />
                                ))}
                            </div>
                        ) : (
                            <Typography variant="h6" className="text-center">
                                You don't have any notifications, we will put them her after they appears.
                            </Typography>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

const NotificationCard = ({ data }) => {
    return (
        <div className="p-4 border rounded-md shadow-sm bg-white">
            <Typography variant="h5" className="mb-2">
                {data.title}
            </Typography>
            <Typography className="text-gray-600">
                {data.description}
            </Typography>
            <Typography variant="caption" className="text-gray-400 mt-2">
                {new Date(data.date).toLocaleString()}
            </Typography>
        </div>
    );
};

export default Notifications;