import axios from 'axios';
import CharactersGallery from '../../components/CharactersGallery/CharactersGallery';
import { useDeferredValue, useEffect, useState } from 'react';

export default function CharacterSelectionPage() {

    const [characters, setCharacters] = useState([])


    useEffect(() => {
        const getCharacters = async () => {
            const { data } = await axios('http://localhost:5051/characters/characters')
            setCharacters(data)

        }

        getCharacters();
    }, [])

    return (<div>
        <CharactersGallery data={characters} />
    </div>
    )
}
