import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowButton(true);
        }, 2000); // Retraso de 2 segundos (2000 ms)

        return () => clearTimeout(timeout); // Limpia el temporizador si el componente se desmonta
    }, []);

    return (
        <div className="home-container">
            <div className="video-container">
            <video id="video-background" autoPlay muted loop>
                <source
                    src="https://res.cloudinary.com/dvmkyxyc0/video/upload/v1699307706/FondoLoopHome_x5f2lv.mp4"
                    type="video/mp4"
                />
            </video>
            </div>
            <div className="home-all">
            <div className="logoImg">
                <img
                    className="logo-name puff-in-center"
                    src="https://res.cloudinary.com/dizd9f3ky/image/upload/v1699431365/Logo_name1_haqxgd.png"
                    alt="logo"
                />
            </div>
            <div className="home-button">
            {showButton && (
                <Link to="/CharacterSelection">
                    <button className="home-content fade-in-fwd" type="button">Choose your characters!</button>
                </Link>
            )}
            </div>
            </div>
        </div>
    );
}




