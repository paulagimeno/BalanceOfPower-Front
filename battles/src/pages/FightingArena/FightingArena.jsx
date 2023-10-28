import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'; 

export default function FightingArena(){
 const location = useLocation();
 const { fighter1, fighter2 } = location.state;
 const [battleStarted, setBattleStarted] = useState(false);
 console.log(location.state)
const [battleSteps, setBattleSteps] = useState([]);
const [currentStep, setCurrentStep] = useState(0);
const [turn, setTurn] = useState();
const [playerChoice, setPlayerChoice] = useState(null);

const [fighter1HP, setFighter1HP] = useState(fighter1.hp)
const [fighter2HP, setFighter2HP] = useState(fighter2.hp)

const abilities = {
    strike: (attacker, defender) => {

        const damage = calculateDamage(attacker.strenght, attacker.crit, defender.defense);
        defender.hp -= damage;
        return `${attacker.name} used Strike and dealt ${damage} damage.`;
    }, 
    Execute: (attacker, defender) => {
        const randomNum = Math.floor(Math.random() * 20) + 1;
        if (randomNum === 1) {
            const damage = defender.hp;
            defender.hp -= damage;
            return `${attacker.name} successfully executed ${defender.name}.`
        } else {
            return `${attacker.name}'s attack missed!`
        }
    }, 
    Heal: (attacker, defender) => {
        const recover = calculateRecover(attacker.strenght, attacker.crit);
        attacker.hp += recover; 
        return `${attacker.name} used Heal and recovered ${recover} Health Points.`
    }, 
    Block: 

}
 
const calculateDamage = (strength, crit, defense) => {
    const baseDamage = Math.floor(Math.random() * (strength[1] - strength[0] + 1)) + strength[0];
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let critMultiplier;
    if (randomNumber === 1) {
     critMultiplier = crit / 100
    } else {
    critMultiplier = 0
    }

    const damage = (baseDamage +(baseDamage * critMultiplier)) - defense;
    return damage;
}

const calculateRecover = (strength, crit) => {
    const baseRecover = Math.floor(Math.random() * (strength[1] - strength[0] + 1)) + strength[0];
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let critMultiplier;
    if (randomNumber === 1) {
     critMultiplier = crit / 100
    } else {
    critMultiplier = 0
    }

  const recover = (baseRecover + (baseRecover * critMultiplier));
  return recover;


}

const battle = () => {
    const steps = [];

    steps.push(`${fighter1.name} and ${fighter2.name} are ready for battle!`);

    while (fighter1HP > 0 && fighter2HP > 0) {
      const attacker = turn;
      const defender = attacker === fighter1 ? fighter2 : fighter1;

      
      steps.push(`It's ${attacker.name}'s turn.`);
      steps.push('Choose an ability:');

      
      if (attacker === playerChoice) {
        steps.push(
          <>
            <button onClick={() => chooseAbility('ability1', attacker, defender)}>Ability 1</button>
            <button onClick={() => chooseAbility('ability2', attacker, defender)}>Ability 2</button>
          </>
        );
      }

      
      if (playerChoice === attacker) {
       
        const abilityResult = abilities[playerChoice](attacker, defender);
        steps.push(abilityResult);
        
        setPlayerChoice(null);
      }

      
      setTurn(attacker === fighter1 ? fighter2 : fighter1);
    }

    
    const winner = fighter1HP > 0 ? fighter1 : fighter2;
    steps.push(`${winner.name} wins the battle!`);

    setBattleStarted(true);
    setBattleSteps(steps);
  }



    useEffect(() => {
        if(battleStarted && currentStep < battleSteps.length -1){
            const timer = setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [battleStarted, currentStep, battleSteps]);

    return(
        <div className="arena_body">
        <div className="arena_fighter1">
        <p>{fighter1 ? fighter1.name : 'Not selected'}</p>
        <img className="fighters" src={fighter1.fullBodyImage} alt=''/>
        </div>
        <div className="arena_battle">{!battleStarted ? (
            <button className="startFight" onClick={battle}>FIGHT!</button>
        ) :(
            <p>{battleSteps[currentStep]}</p>
        )}
        </div>
        <div className="arena_fighter2">
        <p>{fighter2 ? fighter2.name : 'Not selected'}</p>
        <img className="fighters" src={fighter2.fullBodyImage} alt=''/>
        </div>
        </div> 

    )
}