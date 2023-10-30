import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function FightingArena() {
  const location = useLocation();
  const { fighter1, fighter2 } = location.state;
  const [battleStarted, setBattleStarted] = useState(false);
  console.log(location.state);
  const [battleSteps, setBattleSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [turn, setTurn] = useState();
  const [playerChoice, setPlayerChoice] = useState("");
  const [attacker, setAttacker] = useState();
  const [defender, setDefender] = useState();

  const [fighter1HP, setFighter1HP] = useState(fighter1.hp);
  const [fighter2HP, setFighter2HP] = useState(fighter2.hp);

  const abilities = {
    strike: (attacker, defender) => {
      const damage = calculateDamage(
        attacker.strenght,
        attacker.crit,
        defender.defense
      );
      defender.hp -= damage;
      console.log("holita");
      return `${attacker.name} used Strike and dealt ${damage} damage.`;
    },
    execute: (attacker, defender) => {
      const randomNum = Math.floor(Math.random() * 20) + 1;
      if (randomNum === 1) {
        const damage = defender.hp;
        defender.hp -= damage;
        return `${attacker.name} successfully executed ${defender.name}.`;
      } else {
        return `${attacker.name}'s attack missed!`;
      }
    },
    heal: (attacker, defender) => {
      const recover = calculateRecover(attacker.strenght, attacker.crit);
      attacker.hp += recover;
      return `${attacker.name} used Heal and recovered ${recover} Health Points.`;
    },
    block: () => {},
  };

  const calculateDamage = (strength, crit, defense) => {
    const baseDamage =
      Math.floor(Math.random() * (strength[1] - strength[0] + 1)) + strength[0];
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let critMultiplier;
    if (randomNumber === 1) {
      critMultiplier = crit / 100;
    } else {
      critMultiplier = 0;
    }

    const damage = baseDamage + baseDamage * critMultiplier - defense;
    return damage;
  };

  const calculateRecover = (strength, crit) => {
    const baseRecover =
      Math.floor(Math.random() * (strength[1] - strength[0] + 1)) + strength[0];
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let critMultiplier;
    if (randomNumber === 1) {
      critMultiplier = crit / 100;
    } else {
      critMultiplier = 0;
    }

    const recover = baseRecover + baseRecover * critMultiplier;
    return recover;
  };

  const battle = () => {
    const steps = [];

    setBattleStarted(true);
    setBattleSteps(steps);

    steps.push(`${fighter1.name} and ${fighter2.name} are ready for battle!`);

    const battleStep = () => {
      if (fighter1.hp > 0 && fighter2.hp > 0) {
        let attacker;
        if (fighter1.speed > fighter2.speed) {
          attacker = fighter1;
        } else if (fighter1.speed < fighter2.speed) {
          attacker = fighter2;
        } else {
          const randomNumber = Math.floor(Math.random() * 2) + 1;
          if (randomNumber === 1) {
            attacker = fighter1;
          } else {
            attacker = fighter2;
          }
        }

        let defender = attacker === fighter1 ? fighter2 : fighter1;

        setAttacker(attacker);
        setDefender(defender);

        steps.push(`It's ${attacker.name}'s turn.`);
        steps.push("Choose your next move:");

        if (attacker.category === "DPS") {
          steps.push(
            <div>
              <button onClick={() => chooseAbility("Strike", attacker, defender)}>Strike</button>
              <button onClick={() => chooseAbility("execute", attacker, defender)}>Execute</button>
            </div>
          );
        } else if (attacker.category === "Healer") {
          steps.push(
            <div>
              <button onClick={() => chooseAbility("strike", attacker, defender)}>Strike</button>
              <button onClick={() => chooseAbility("heal", attacker, defender)}>Heal</button>
            </div>
          );
        } else if (attacker.category === "Tank") {
          steps.push(
            <div>
              <button onClick={() => chooseAbility("strike", attacker, defender)}>Strike</button>
              <button onClick={() => chooseAbility("block", attacker, defender)}>Block</button>
            </div>
          );
        }
        
       
        

        setTurn(attacker === fighter1 ? fighter2 : fighter1);
      } else if (fighter1.hp <= 0 || fighter2.hp <= 0) {
        const winner = fighter1.hp > 0 ? fighter1 : fighter2;
        steps.push(`${winner.name} won the battle!`);
      }
    };

    battleStep();
  };

  const chooseAbility = (data, attacker, defender) => {
    console.log("holiwis");
    setPlayerChoice(data);
    console.log(data);
    executeAttack(data, attacker, defender)
  };

  const executeAttack = (playerChoice, attacker, defender) => {
      if (playerChoice === "Strike") {
        console.log(attacker)
        const abilityResult = abilities.strike(attacker, defender);
        console.log(defender.hp)
        setBattleSteps((prevSteps) => [...prevSteps, abilityResult]);
        setPlayerChoice("");
      } else if (playerChoice === "execute") {
        const abilityResult = abilities.execute(attacker, defender);
        setBattleSteps((prevSteps) => [...prevSteps, abilityResult]);
        setPlayerChoice("");
      } else if (playerChoice === "heal") {
        const abilityResult = abilities.heal(attacker, defender);
        setBattleSteps((prevSteps) => [...prevSteps, abilityResult]);
        setPlayerChoice("");
      }
    }
  

  useEffect(() => {
    if (battleStarted && currentStep < battleSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [battleStarted, currentStep, battleSteps]);

  return (
    <div className="arena_body">
      <div className="arena_fighter1">
        <p>{fighter1 ? fighter1.name : "Not selected"}</p>
        <img className="fighters" src={fighter1.fullBodyImage} alt="" />
        <p>HP: {fighter1HP}</p>
      </div>
      <div className="arena_battle">
        {!battleStarted ? (
          <button className="startFight" onClick={battle}>
            FIGHT!
          </button>
        ) : (
          <div>{battleSteps[currentStep]}</div>
        )}
      </div>
      <div className="arena_fighter2">
        <p>{fighter2 ? fighter2.name : "Not selected"}</p>
        <img className="fighters" src={fighter2.fullBodyImage} alt="" />
        <p>HP: {fighter2HP}</p>
      </div>
    </div>
  );
}
