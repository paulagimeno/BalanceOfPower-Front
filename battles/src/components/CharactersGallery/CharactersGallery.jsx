import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const CharactersGallery = ({data}) => {

    const [characters, setCharacters] = useState([]);
    const [fighter1, setFighter1] = useState(null)
    const [fighter2, setFighter2] = useState(null)

    useEffect(() => {
        const getCharacter = async () => {
            const {data} = await axios('http://localhost:5051/characters/characters');
            setCharacters(data);

        }

        getCharacter();

    }, []);

    const handleFighters = (i) => {

        if (fighter1 === characters[i]){
            setFighter1(null);
        } else if (fighter2 === characters[i]) {
            setFighter2(null);
        } else if (fighter1 === null) {
            setFighter1(characters[i]);
        } else if (fighter2 === null) {
            setFighter2(characters[i]);
        }
    }

    console.log( 'fighter 1 is', fighter1)
    console.log('fighter2 is', fighter2)

    return (<div>
            <div className='character-container' >
                {characters.map((item, i) => (
                    <div key={i} onClick={() =>handleFighters(i)} 

                        className={`character-item ${fighter1 === characters[i] ? 'fighter1' : '' } ${fighter2 === characters[i] ? 'fighter2' : '' }`}>  
                        <img className='character-img' src={item.avatarImage} alt='' />
                        <div className='character-overlay'>
                            <div className='character-name'>{item.name}</div>
                        </div>
                    </div>
                ))};
            </div>  
            <div className='button_div'>
            {fighter1 && fighter2 ? (
            <Link to='/FightingArena' state={{ fighter1: fighter1, fighter2: fighter2 }}>
                <button className='button_arena'>Move to the fighting arena</button>
            </Link>
            ) : (
                <p>Please select two fighters.</p>
            )}
            </div>  
            </div>
    )
}

export default CharactersGallery
