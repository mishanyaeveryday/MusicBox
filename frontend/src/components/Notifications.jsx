import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const Notifications = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/user/subscriptions')
            .then((res) => res.json())
            .then((data) => {
                if (data?.subscriptions?.length > 0) {
                    fetch(`/api/news?subscriptions=${data.subscriptions.join(',')}`)
                        .then((res) => res.json())
                        .then((newsData) => setNews(newsData));
                } else {
                    setNews([]);
                }
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных:", error);
                setNews([]);
            })
            .finally(() => setLoading(false));
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