import React from "react";
import { useLocation } from 'react-router-dom'; 

export default function FightingArena(){
 const location = useLocation();
 const { fighter1, fighter2 } = location.state;

 console.log(location.state)

    return(
        <div>
        <p>Fighter 1: {fighter1 ? fighter1.name : 'Not selected'}</p>
        <p>Fighter 2: {fighter2 ? fighter2.name : 'Not selected'}</p>
        </div> 

    )
}