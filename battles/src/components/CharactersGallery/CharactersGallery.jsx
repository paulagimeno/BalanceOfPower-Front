import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const CharactersGallery = ({data}) => {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const getCharacter = async () => {
            const res = await axios('http://localhost:5051/characters');
            const imageURLs = res.data.map(character => ({
                ...character,
                image: `http://localhost:3000${character.avatarImage}`
            }));
            setCharacters(imageURLs);

        }

        getCharacter();

    }, []);

    return (
        <div>
            <div className='character-container' >
                {data.map((character, i) => (
                    <div key={i}>  
                        <img src={character.avatarImage} alt='' />
                        <div>{character.name}</div>
                    </div>
                ))};
            </div>    
        </div>
    )
}

export default CharactersGallery
