import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const CharactersGallery = ({data}) => {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const getCharacter = async () => {
            const {data} = await axios('http://localhost:5051/characters/characters');
            setCharacters(data);

        }

        getCharacter();

    }, []);

    return (
            <div className='character-container' >
                {data.map((item, i) => (
                    <div key={i}>  
                        <img src={item.avatarImage} alt='' />
                        <div>{item.name}</div>
                    </div>
                ))};
            </div>    
    )
}

export default CharactersGallery
