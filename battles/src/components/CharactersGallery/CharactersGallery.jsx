import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const CharactersGallery = ({ data }) => {
    const [characters, setCharacters] = useState([]);
    const [fighter1, setFighter1] = useState(null);
    const [fighter2, setFighter2] = useState(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const getCharacter = async () => {
            const { data } = await axios('http://localhost:5051/characters/characters');
            setCharacters(data);
        }

        getCharacter();
    }, []);

    const handleFighters = (character) => {
        if (fighter1 === character) {
            setFighter1(null);
        } else if (fighter2 === character) {
            setFighter2(null);
        } else if (fighter1 === null) {
            setFighter1(character);
        } else if (fighter2 === null) {
            setFighter2(character);
        }
    }

    const filterCharacters = (category) => {
        setFilter(category);
    }

    const filteredCharacters = filter === "All" ? characters : characters.filter((character) => character.category === filter);

    return (
        <div className="character-container">
            <h1>Character Select</h1>
            <div className="filter-buttons">
                <button onClick={() => filterCharacters("All")}>All</button>
                <button onClick={() => filterCharacters("DPS")}>DPS</button>
                <button onClick={() => filterCharacters("Tank")}>TANK</button>
                <button onClick={() => filterCharacters("Healer")}>HEALER</button>
            </div>
            <div className="character-content">

                <SimpleBar style={{ maxHeight: 600, width: "70%" }}>
                    <div className="character-gallery">
                        {filteredCharacters.map((item, i) => (
                            <div
                                className={`character-item ${fighter1 === item ? "fighter1" : ""} ${fighter2 === item ? "fighter2" : ""}`}
                                key={i}
                                onClick={() => handleFighters(item)}
                            >
                                <img className="character-img" src={item.avatarImage} alt="" />
                                <div className="character-overlay">
                                    <div className="character-name">{item.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </SimpleBar>

                <div className="characters-selected">
                    <div className='charcters-selection'>
                        {fighter1 && (
                            <div className="character-selected1">
                                <img src={fighter1.avatarImage} alt={fighter1.name} />
                                <p>{fighter1.name}</p>
                            </div>
                        )}
                        {fighter2 && (
                            <div className="character-selected2">
                                <img src={fighter2.avatarImage} alt={fighter2.name} />
                                <p>{fighter2.name}</p>
                            </div>
                        )}
                    </div>
                    <div className="characters-button">
                        {fighter1 && fighter2 ? (
                            <Link to="/FightingArena" state={{ fighter1: fighter1, fighter2: fighter2 }}>
                                <button className="button-arena">Move to the fighting arena</button>
                            </Link>
                        ) : (
                            <p>Choose your fighters!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharactersGallery;
