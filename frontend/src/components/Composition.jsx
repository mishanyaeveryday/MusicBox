import React, { useEffect,useState } from 'react';
import "../design/Home.css";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Tooltip,
} from "@material-tailwind/react";
import '../design/Home.css';
import { PlayIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";

const Composition = () => {
    return (
        <div>
            <Card className="w-46 shadowFull m-1 cursor-pointer hover:bg-gray-500/10">
                <div className="relative">
                    <CardHeader color="" className="-mt-0 mt-4">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card-image"
                        />
                        <IconButton
                            size="sm"
                            className="!absolute bottom-0 right-0 m-2"
                        >
                            <PlayIcon className="h-5 w-5"></PlayIcon>
                        </IconButton>
                    </CardHeader>
                </div>
                <CardBody className="p-1">
                    <Typography variant="p" className="text-xs text-left">
                        Name
                    </Typography>
                    <Typography variant="p" className="text-xs text-left">
                        Compositor
                    </Typography>
                </CardBody>
                <CardFooter className="p-1"></CardFooter>
            </Card>
        </div>
    );
};
export default Composition;