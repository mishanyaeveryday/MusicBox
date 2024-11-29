import React from "react";
import "../design/Home.css";
import { Button, Typography } from "@material-tailwind/react";
import '../design/Home.css';
const Home = () => {
  return (
    <div>
            <div className="intro back1">
                <Typography color="teal" variant="h1">Peach Note</Typography>
                <Typography variant="p">Ми є спільнота мешканців, що забезпечує комфорт, безпеку та ефективне управління будинком.</Typography>
            </div>

            <div className="wimg">
                <div className="achievements-container">
                    <div className="achievements">
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

export default Home;