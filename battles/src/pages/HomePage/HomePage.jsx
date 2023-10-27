import { Link } from "react-router-dom";

export default function HomePage(){

    return(<div>
        <h1>Black Desert Battles</h1>
        <Link to="/CharacterSelection">
        <div>
            Choose your characters!
        </div>
        </Link>
        </div>
    )
}