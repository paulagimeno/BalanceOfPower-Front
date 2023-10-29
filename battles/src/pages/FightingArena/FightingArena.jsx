import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function FightingArena() {
    const location = useLocation();
    const { fighter1, fighter2 } = location.state;
    const [battleStarted, setBattleStarted] = useState(false);
    console.log(location.state)

    const battle = () => {
        if (fighter1.speed > fighter2.speed) {
            round(fighter1, fighter2);
        } else if (fighter1.speed < fighter2.speed) {
            round(fighter2, fighter1);
        } else if (fighter1.speed === fighter2.speed) {
            const randomNumber = Math.floor(Math.random() * 2) + 1;
            if (randomNumber === 1) {
                round(fighter1, fighter2);
            } else {
                round(fighter2, fighter1);
            }
        }

        setBattleStarted(true);
    }

    const round = (playerFighting, playerDefending) => {
        return (
            <p>{playerFighting.name} wins, {playerDefending.name} loses</p>
        )
    }

    return (
        <div className="arena_body">
            <div className="arena_fighter1">
                
                    <p>{fighter1 ? fighter1.name : 'Not selected'}</p>
                    <img src={fighter1.fullBodyImage} alt='' />
                </div>
                <div className="arena_battle">{!battleStarted ? (
                    <button className="startFight" onClick={battle}>FIGHT!</button>
                ) : (
                    ''
                )}
                </div>
                <div className="arena_fighter2">
                    <p>{fighter2 ? fighter2.name : 'Not selected'}</p>
                    <img src={fighter2.fullBodyImage} alt='' />
                
            </div>
        </div>

    )
}