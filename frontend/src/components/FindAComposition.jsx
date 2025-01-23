import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { useParams } from 'react-router-dom';
import Composition from './Composition';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

const SearchMusic = () => {
    const { name } = useParams();
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [compositions, setCompositions] = useState([]);
    const [filteredCompositions, setFilteredCompositions] = useState([]);
    const navigate = useNavigate();  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const playlistsResponse = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}core/playlists/`
                );
                setPlaylists(playlistsResponse.data);

                const compositionsResponse = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}core/compositions/`
                );
                setCompositions(compositionsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!name) {
            setFilteredPlaylists(playlists);
            setFilteredCompositions(compositions);
            return;
        }

        const query = name.toLowerCase();

        setFilteredPlaylists(
            playlists.filter((playlist) =>
                playlist.name.toLowerCase().includes(query)
            )
        );

        setFilteredCompositions(
            compositions.filter((composition) =>
                composition.name.toLowerCase().includes(query)
            )
        );
    }, [name, playlists, compositions]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="intro back1 h-screen flex items-center justify-center">
            <Card className="h-full w-full shadowHalf">
                <CardHeader floated={false} className="bg-0">
                    <div className="flex justify-between items-center px-6 py-4">
                        <Typography variant="h3" color="white">
                            Search Results
                        </Typography>
                        <Button
                            onClick={() => navigate("/")}
                            className="bg-white text-black"
                        >
                            Go Back
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="h-[calc(100%-100px)] text-center flex">
                    <div className="flex w-full gap-6">
                        <div className="w-1/2 text-center flex flex-col m-4">
                            <Typography variant="h5" color="white">
                                Playlists
                            </Typography>
                            <div
                                className="flex-1 overflow-y-auto p-2 rounded-md"
                                style={{ scrollbarWidth: "thin", scrollbarColor: "#ffffff #2d3748" }}
                            >
                                {playlists.length > 0 ? (
                                    <div className="flex flex-col gap-4"
                                    style={{ scrollbarWidth: "thin", scrollbarColor: "#ffffff #2d3748" }}>
                                        {playlists.map((playlist) => (
                                            <div
                                            key={playlist.id}
                                            className="p-4 rounded-md shadowFull flex flex-col justify-between"
                                        >
                                            <Typography variant="h6" className="mb-2 text-center text-white">
                                                {playlist.name}
                                            </Typography>
                                        
                                            <Typography className="text-gray-600 mb-4">
                                                {playlist.description || "No description provided."}
                                            </Typography>
                                        
                                            <Link
                                                to={`/playlist/${playlist.id}`}
                                                className="text-white hover:underline mt-auto"
                                                style={{
                                                    fontFamily: "Arsenal",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Show all
                                            </Link>
                                        </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Typography variant="h6" color="gray">
                                        No playlists found.
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className="w-1/2 text-center flex flex-col m-4">
                            <Typography variant="h5" color="white">
                                Compositions
                            </Typography>
                            <div
                                className="flex-1 overflow-y-auto p-2 rounded-md"
                                style={{ scrollbarWidth: "thin", scrollbarColor: "#ffffff #2d3748" }}
                            >
                                {compositions.length > 0 ? (
                                    <div className="grid grid-cols-4 gap-6">
                                        {compositions.map((composition) => (
                                            <Composition compositionId={composition.id} />
                                        ))}
                                    </div>
                                ) : (
                                    <Typography variant="h6" color="gray">
                                        No compositions found.
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );


};

export default SearchMusic;
