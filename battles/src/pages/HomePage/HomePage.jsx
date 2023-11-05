import { Link } from "react-router-dom";

export default function HomePage(){

    return(<div className="home-container">
        {/* <h1>Black Desert Battles</h1> */}
        <Link to="/CharacterSelection" className="no-decoration">
        <div className="home-content">
            Choose your characters!
        </div>
        </Link>
        </div>
    )
}