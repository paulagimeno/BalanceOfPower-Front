import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


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

        if (fighter1 === data[i]){
            setFighter1(null);
        } else if (fighter2 === data[i]) {
            setFighter2(null);
        } else if (fighter1 === null) {
            setFighter1(data[i]);
        } else if (fighter2 === null) {
            setFighter2(data[i]);
        }
    }

    console.log( 'fighter 1 is', fighter1)
    console.log('fighter2 is', fighter2)

    return (
            <div className='character-container' >
                {data.map((item, i) => (
                    <div key={i} onClick={() =>handleFighters(i)} 
                        className={`character-item ${fighter1 === data[i] ? 'fighter1' : '' } ${fighter2 === data[i] ? 'fighter2' : '' }`}>  
                        <img className='character-img' src={item.avatarImage} alt='' />
                        <div className='character-overlay'>
                            <div className='character-name'>{item.name}</div>
                        </div>
                    </div>
                ))};
            </div>    
    )
}

export default CharactersGallery
