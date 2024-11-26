import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";

const Error = () => {

    return (
        <div className="px-4 items-center flex justify-center flex-col-reverse lg:flex-row">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <Typography variant='h1' className="my-2 font-bold">
                                ПОМИЛКА 404
                            </Typography>
                            <Typography variant='h5' className='text-gray-800'>СТОРІНКА НЕ ЗНАЙДЕНА</Typography>
                            <Link to="/" className='mx-10 p-2 text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
                            <Button className="mt-12 to-indigo-100 from-deep-purple-100 text-black text-2xl rounded-2xl font-thin" fullWidth type="submit" style={{ fontFamily: 'Philosopher' }} variant="gradient">
                                НА ГОЛОВНУ
                            </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;