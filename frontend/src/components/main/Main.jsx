import React, { useState, useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";
import axios from 'axios';
import './Main.css';

const MainPage = () => {
    const [userCount, setUserCount] = useState(null);
    const [osbbCount, setOsbbCount] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserCount = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/dataformain`);
            setOsbbCount(response.data.count);
            setUserCount(response.data.count2);
        } catch (error) {
            console.error("Ошибка при получении количества пользователей:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserCount();
            setLoading(false);
        };
        fetchData();
    }, []);

    const showSpinner = loading || userCount === null || osbbCount === null || userCount === 0 || osbbCount === 0;

    return (
        <div>
            <div className="intro back1">
                <h1>ОСББ</h1>
                <h1>"THE ENCLAVE"</h1>
                <p>Ми є спільнота мешканців, що забезпечує комфорт, безпеку та ефективне управління будинком.</p>
            </div>

            <div className="wimg">
                <div className="achievements-container">
                    <div className="achievements">
                        <h2 className="family-header">У НАШІЙ СІМ'Ї ВЖЕ:</h2>
                        <div className="achievement-row">
                            <div className="work">
                                {showSpinner ? (
                                    <Spinner color="pink" className="h-8 w-8" />
                                ) : (
                                    <>
                                        <p className="work-heading">{osbbCount}</p>
                                        <p className="work-text">ОСББ</p>
                                    </>
                                )}
                            </div>
                            <div className="work">
                                {showSpinner ? (
                                    <Spinner color="pink" className="h-8 w-8" />
                                ) : (
                                    <>
                                        <p className="work-heading">{userCount}</p>
                                        <p className="work-text">ВДЯЧНИХ КОРИСТУВАЧІВ</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-me">
                    <div className="about-me-text">
                        <h2>ПРО НАС</h2>
                        <p>
                            ОСББ «Enclave» — це сучасний житловий комплекс, який втілює найкращі традиції
                            надійного та комфортного проживання. Ми забезпечуємо ефективне управління та
                            підтримку всіх житлових процесів, створюючи безпечне і затишне середовище для
                            мешканців.
                        </p>
                        <p>
                            Наш підхід базується на принципах довіри, прозорості та відповідальності.
                            Ми прагнемо до того, щоб кожен мешканець відчував себе у повній безпеці та комфорті,
                            знаючи, що його будинок під надійним захистом.
                        </p>
                        <p>
                            ОСББ «Enclave» — це ваш надійний партнер у питаннях управління житлом.
                            Вибираючи нас, ви обираєте стабільність, якість та безпеку для вашої родини.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default MainPage;