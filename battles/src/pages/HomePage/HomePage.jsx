import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="home-container">
            <video id="video-background" autoPlay muted loop>
                <source
                    src="https://res.cloudinary.com/dvmkyxyc0/video/upload/v1699307706/FondoLoopHome_x5f2lv.mp4 "
                    type="video/mp4"
                />
            </video>

            <Link to="/CharacterSelection" className="no-decoration">
                <div className="home-content">Choose your characters!</div>
            </Link>
        </div>
    );
}



