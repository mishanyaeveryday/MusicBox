import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";

const Notifications = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in local storage.");
            setLoading(false);
            return;
        }

        axios.get(`${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/notification/`)
            .then((response) => {
                const notifications = response.data;

                const reversedNotifications = notifications.reverse();

                setNews(reversedNotifications);
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
                setNews([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Typography variant="h5" className="text-gray-500">Loading...</Typography>
            </div>
        );
    }

    return (
        <div className="intro back1">
            <div className="mx-auto max-w-3xl">
                <Card  className="shadowHalf">
                    <CardHeader floated={false}  className="bg-0">
                        <Typography variant="h3" color="white">
                            Notifications
                        </Typography>
                    </CardHeader>
                    <CardBody className="text-left p-6">
                        {news.length > 0 ? (
                            <div className="overflow-y-auto max-h-[720px]">
                                <div className="flex flex-col gap-6">
                                    {news.map((item) => (
                                        <NotificationCard key={item.id} data={item} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Typography variant="h6" className="text-center text-gray-500">
                                You don't have any notifications, we will put them here after they appear.
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
        <div className="p-6 shadowFull">
            <Typography variant="h5" className="font-semibold text-xl mb-3">
                {data.title}
            </Typography>
            <Typography className="text-gray-700 text-base mb-4">
                {data.description}
            </Typography>
            <div className="flex justify-between items-center">
                <Typography variant="caption" className="text-gray-500 text-sm">
                    {new Date(data.date).toLocaleString()}
                </Typography>
                <div className="w-2.5 h-2.5 rounded-full"></div>
            </div>
        </div>
    );
};

export default Notifications;
