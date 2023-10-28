import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';



const CharactersGallery = ({data}) => {

    const [characters, setCharacters] = useState([]);
    const [fighter1, setFighter1] = useState()
    const [fighter2, setFighter2] = useState()

    useEffect(() => {
        const getCharacter = async () => {
            const {data} = await axios('http://localhost:5051/characters/characters');
            setCharacters(data);

        }

        getCharacter();

    }, []);

    const handleFighters = (i) => {
    if (fighter1){
        setFighter2(data[i]) 
    } else {
        setFighter1(data[i])
    }
    }

    console.log( 'fighter 1 is', fighter1)
    console.log('fighter2 is', fighter2)

    return (
            <div className='character-container' >
                {data.map((item, i) => (
                    <div key={i} onClick={() =>handleFighters(i)} 
                    className={`character-item ${fighter1 === data[i] ? 'red-border' : '' } ${fighter2 === data[i] ? 'blue-border' : '' }`}>  
                        <img src={item.avatarImage} alt='' />
                        <div>{item.name}</div>
                    </div>
                ))};
            </div>    
    )
}

export default CharactersGallery
