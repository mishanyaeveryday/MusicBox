import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import axios from "axios";

const Playlist = () => {
    const { category } = useParams();
    const [compositions, setCompositions] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/compositions?category=${category}`)
            .then((response) => {
                setCompositions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching compositions:', error);
            });
    }, [category]);

    return (
        <div>
            <div className="intro back1">
                <div className="flex flex-row w-full">
                    <div className="h-full w-full">
                        <Card className="h-full w-full shadowHalf">
                            <CardHeader floated={false} className="bg-0 text-center">
                                <Typography variant="h3" className="text-center">
                                    {category}
                                </Typography>
                            </CardHeader>
                            <CardBody className="text-center">
                                <div className="grid grid-cols-5 gap-4">
                                    {compositions.map((composition) => (
                                        <Composition key={composition.id} data={composition} />
                                    ))}
                                </div>
                            </CardBody>
                            <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playlist;