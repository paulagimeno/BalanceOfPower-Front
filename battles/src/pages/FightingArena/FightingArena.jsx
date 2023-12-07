import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuHeader from "../../components/MenuHeader/MenuHeader";

export default function FightingArena() {
  const location = useLocation();
  const { fighter1, fighter2 } = location.state;
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleSteps, setBattleSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playerChoice, setPlayerChoice] = useState("");
  const [attacker, setAttacker] = useState();
  const [defender, setDefender] = useState();

  
  const [winner, setWinner] = useState();
  const [loser, setLoser] = useState();
  const chatContainerRef = useRef();

  const extractAttributeValue = (attribute) => {
    const type = Object.keys(attribute)[0];
    return attribute[type];
  };

  const processFighterObject = (fighter) => {
    const processedFighter = {};
    for (const key in fighter) {
      if (fighter.hasOwnProperty(key)) {
        processedFighter[key] = extractAttributeValue(fighter[key]);
      }
    }
    return processedFighter;
  };

  const navigate = useNavigate();

  const handleBackToCS= () => {
    navigate('/CharacterSelection');
  };

  const handleRepeatMatch= () => {
    window.location.reload();
  };


const newFighter1 = processFighterObject(fighter1);
const newFighter2 = processFighterObject(fighter2);

const [fighter2CurrentHp, setFighter2CurrentHp] = useState(newFighter2.Hp);
const [fighter1CurrentHp, setFighter1CurrentHp] = useState(newFighter1.Hp);

const [fighter1maxHp, setFighter1maxHp] = useState(newFighter1.Hp);
const [fighter2maxHp, setFighter2maxHp] = useState(newFighter2.Hp);

useEffect(() => {
  setFighter2CurrentHp((prevHp) => newFighter2.Hp);
}, [newFighter2.Hp]);

useEffect(() => {
  setFighter1CurrentHp((prevHp) => newFighter1.Hp);
}, [newFighter1.Hp]);

  const abilities = {
    strike: (attacker, defender) => {
      const damage = calculateDamage(
        attacker.Strength,
        attacker.Crit,
        defender.Defense
      );
      defender.Hp -= damage;
      return `${attacker.Name} used Strike and dealt ${damage} damage.`;
    },
    execute: (attacker, defender) => {
      const randomNum = Math.floor(Math.random() * 10) + 1;
      if (randomNum === 1) {
        const damage = defender.Hp;
        defender.Hp -= damage;
        return `${attacker.Name} successfully executed ${defender.Name}.`;
      } else {
        return `${attacker.Name}'s attack missed!`;
      }
    },
    heal: (attacker, defender) => {
      const recover = calculateRecover(attacker.Strength, attacker.Crit);
      attacker.Hp += recover;
      return `${attacker.Name} used Heal and recovered ${recover} Health Points.`;
    },
    block: (attacker, defender) => {
      const extraHP = attacker.defense; // Modify as needed.
      attacker.extraHP = extraHP;
      return `${attacker.Name} used Shield and gained a ${extraHP} points of shield.`;
    },
  };

  const calculateDamage = (Strength, Crit, Defense) => {
    const baseDamage =
      Math.floor(Math.random() * (parseInt(Strength[1].N) - parseInt(Strength[0].N) +1)) + parseInt(Strength[0].N);
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let critMultiplier;
    if (randomNumber === 1) {
      critMultiplier = Crit / 100;
    } else {
      critMultiplier = 0;
    }
    const damage = (
      baseDamage * 2 +
      baseDamage * critMultiplier -
      Defense
    ).toFixed(0);
    return parseFloat(damage);
  };

  const calculateRecover = (Strength, Crit) => {
    const baseRecover =
      Math.floor(Math.random() * (Strength[1] - Strength[0] + 1)) + Strength[0];
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let critMultiplier;
    if (randomNumber === 1) {
      critMultiplier = Crit / 100;
    } else {
      critMultiplier = 0;
    }

    const recover = (baseRecover * 2 + baseRecover * critMultiplier).toFixed(0);
    return parseFloat(recover);
  };

  const battle = () => {
    const steps = [];
    
    setBattleStarted(true);
    setBattleSteps(steps);

    steps.push(`${newFighter1.Name} and ${newFighter2.Name} are ready for battle!`);

    let attacker;
    if (newFighter1.Speed > newFighter2.Speed) {
      attacker = newFighter1;
    } else if (newFighter1.Speed < newFighter2.Speed) {
      attacker = newFighter2;
    } else {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      if (randomNumber === 1) {
        attacker = newFighter1;
      } else {
        attacker = newFighter2;
      }
    }

    let defender = attacker === newFighter1 ? newFighter2 : newFighter1;

    setAttacker(attacker);
    setDefender(defender);

    const battleStep = (attacker, defender) => {
      if (newFighter1.Hp > 0 && newFighter2.Hp > 0) {
        steps.push(`It's ${attacker.Name}'s turn.`);
        steps.push("Choose your next move:");

        if (attacker.Category === "DPS") {
          steps.push(
            <div>
              <button className="abilityButton"
                onClick={() => chooseAbility("Strike", attacker, defender)}
              >
                Strike
              </button>
              <button className="abilityButton"
                onClick={() => chooseAbility("Execute", attacker, defender)}
              >
                Execute
              </button>
            </div>
          );
        } else if (attacker.Category === "Healer") {
          steps.push(
            <div>
              <button className="abilityButton"
                onClick={() => chooseAbility("Strike", attacker, defender)}
              >
                Strike
              </button>
              <button className="abilityButton" onClick={() => chooseAbility("Heal", attacker, defender)}>
                Heal
              </button>
            </div>
          );
        } else if (attacker.Category === "Tank") {
          steps.push(
            <div>
              <button className="abilityButton"
                onClick={() => chooseAbility("Strike", attacker, defender)}
              >
                Strike
              </button>
              <button className="abilityButton"
                onClick={() => chooseAbility("Block", attacker, defender)}
              >
                Block
              </button>
            </div>
          );
        }

        executeAttack(playerChoice, attacker, defender);

        

      } else if (newFighter1.Hp <= 0 || newFighter2.Hp <= 0) {
        const won = fighter1CurrentHp > 0 ? newFighter1 : newFighter2;
        const lost = won === newFighter1 ? newFighter2 : newFighter1;
        setWinner(won);
        setLoser(lost);
        steps.push(`${won.Name} won the battle!`);
      }
    };

    

    const chooseAbility = (data, attacker, defender) => {
      setPlayerChoice(data);
      executeAttack(data, attacker, defender);
    };

    const executeAttack = (playerChoice, attacker, defender) => {
      if (playerChoice === "Strike") {
        steps.pop();
        const abilityResult = abilities.strike(attacker, defender);
        
        steps.push(abilityResult);
        if (defender.extraHP && defender.extraHP > 0) {
          defender.Hp += defender.extraHP;
          steps.push(
            `${defender.Name} blocked ${defender.extraHP} damage with the Shield.`
          ); // Reset the extraHP after it's consumed.
          defender.extraHP = 0;
        }
        setPlayerChoice("");
        setFighter1CurrentHp(newFighter1.Hp);
        setFighter2CurrentHp(newFighter2.Hp);
        attacker = attacker === newFighter1 ? newFighter2 : newFighter1;
        defender = attacker === newFighter2 ? newFighter1 : newFighter2;
        setAttacker(attacker);
        setDefender(defender);
        battleStep(attacker, defender);
      } else if (playerChoice === "Execute") {
        steps.pop();
        const abilityResult = abilities.execute(attacker, defender);
        
        steps.push(abilityResult);
        setPlayerChoice("");
        setFighter1CurrentHp(newFighter1.Hp);
        setFighter2CurrentHp(newFighter2.Hp);
        attacker = attacker === newFighter1 ? newFighter2 : newFighter1;
        defender = attacker === newFighter2 ? newFighter1 : newFighter2;
        setAttacker(attacker);
        setDefender(defender);
      
        battleStep(attacker, defender);
      } else if (playerChoice === "Heal") {
        steps.pop();
        const abilityResult = abilities.heal(attacker, defender);
        
        steps.push(abilityResult);
       
        setPlayerChoice("");
        setFighter1CurrentHp(newFighter1.Hp);
        setFighter2CurrentHp(newFighter2.Hp);
        attacker = attacker === newFighter1 ? newFighter2 : newFighter1;
        defender = attacker === newFighter2 ? newFighter1 : newFighter2;
        setAttacker(attacker);
        setDefender(defender);
      
        battleStep(attacker, defender);
      } else if (playerChoice === "Block") {
        steps.pop();
        const abilityResult = abilities.block(attacker, defender);
        
        steps.push(abilityResult);
      
        setPlayerChoice("");
        setFighter1CurrentHp(newFighter1.Hp);
        setFighter2CurrentHp(newFighter2.Hp);
        attacker = attacker === newFighter1 ? newFighter2 : newFighter1;
        defender = attacker === newFighter2 ? newFighter1 : newFighter2;
        setAttacker(attacker);
        setDefender(defender);
      
        battleStep(attacker, defender);
      }
    };

    battleStep(attacker, defender);
  };

  const scrollChatToBottom = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
  }, [winner])

  useEffect(() => {
    scrollChatToBottom();
    if (battle && currentStep < battleSteps.length - 1) {
      const timer = setInterval(() => {
        if (currentStep + 1 < battleSteps.length)
          setCurrentStep(currentStep + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [battleSteps, currentStep, battle]);

  const getStepText = (step) => {
    if (typeof step === "string") {
      return step;
    }
    return step.props.children;
  };

  const getStepClass = (step) => {
    const stepText = getStepText(step);

    if (stepText.includes(newFighter1.Name) && stepText.includes(newFighter2.Name)) {
      return "bothFighters";
    } else if (stepText.includes(newFighter1.Name)) {
      return "fighterOne";
    } else if (stepText.includes(newFighter2.Name)) {
      return "fighterTwo";
    } else {
    return "noFighter";
    }
  };

  const getColorOne = () => {
    if ((newFighter1.Hp / fighter1maxHp) * 100 < 35) {
      return "health-bar-inner1"
    } else if ((newFighter1.Hp / fighter1maxHp) * 100 < 65) {
      return "health-bar-inner2"
    } else if ((newFighter1.Hp / fighter1maxHp) * 100 === 100) {
      return "health-bar-inner-full"
    } else {
      return "health-bar-inner3"
    }
  }

  const getColorTwo = () => {
    if ((newFighter2.Hp / fighter2maxHp) * 100 < 35) {
      return "health-bar-inner1"
    } else if ((newFighter2.Hp / fighter2maxHp) * 100 < 65) {
      return "health-bar-inner2"
    } else if ((newFighter2.Hp / fighter2maxHp) * 100 === 100) {
      return "health-bar-inner-full"
    } else {
      return "health-bar-inner3"
    }
  }

  useEffect(() => {
    const fighter1Percentage = (Math.max(fighter1CurrentHp, 0) / fighter1maxHp) * 100;
    const fighter2Percentage = (Math.max(fighter2CurrentHp, 0) / fighter2maxHp) * 100;

    const fighter1HealthBar = document.getElementById("fighter1HealthBar");
    if (fighter1HealthBar) {
      fighter1HealthBar.style.width = `${fighter1Percentage}%`;
    }

    const fighter2HealthBar = document.getElementById("fighter2HealthBar");
    if (fighter2HealthBar) {
      fighter2HealthBar.style.width = `${fighter2Percentage}%`;
    }

  }, [fighter1maxHp, fighter2maxHp, fighter1CurrentHp, fighter2CurrentHp])

  return (
    
    <div className="arena_body">
      <div className='video-container'>
        <video id='video-background' autoPlay muted loop>
          <source src="https://res.cloudinary.com/dvmkyxyc0/video/upload/v1699357538/FondoLoopFA_acobp9.mp4 " type='video/mp4' />
        </video>
      </div>
      <MenuHeader/>
      <div className="main">
      <div className="arena_fighter1">
        <div className="arena_names">
          <p className="fighterName">
            {newFighter1 ? newFighter1.Name.toUpperCase() : "Not selected"}
          </p>
        </div>
        <div className="arena_fighters">
          <img className={`fighters ${newFighter1.Name === winner?.Name ? 'winningFighter' : newFighter1.Name === loser?.Name ? 'losingFighter' : ''}`} src={newFighter1.FullBodyImage} alt="" />
        </div>
        <div className="arena_hps">
          <div className="health-bar">
            <div
              id="fighter1HealthBar"
              className={getColorOne()}
            >
            </div>
          </div>
          <p className="hpText">HP: {Math.max(fighter1CurrentHp, 0).toFixed(0)}</p>
        </div>
      </div>
      <div className="arena_battle">
        {!battleStarted ? (
          <button className="startFight" onClick={battle}>
            START THE FIGHT !
          </button>
        ) : (
          <div className="battle">
            <div className="chat">
              {battleSteps.slice(0, currentStep + 1).map((step, index) => (
                <div className={getStepClass(step)} key={index}>
                  {step}
                </div>
              ))}
              <div ref={chatContainerRef} />
            </div>
          </div>
        )}
      </div>
      <div className="arena_fighter2">
        <div className="arena_names">
          <p className="fighterName">
            {newFighter2 ? newFighter2.Name.toUpperCase() : "Not selected"}
          </p>
        </div>
        <div className="arena_fighters">
          <img className={`fighters ${newFighter2.Name === winner?.Name ? 'winningFighter' : newFighter2.Name === loser?.Name ? 'losingFighter' : ''}`} src={newFighter2.FullBodyImage} alt="" />
        </div>
        <div className="arena_hps">
          
          <div className="health-bar">
            <div
              id="fighter2HealthBar"
              className={getColorTwo()}
            >
            </div>
          </div>
          <p className="hpText">HP: {Math.max(parseInt(fighter2CurrentHp), 0).toFixed(0)}</p>
        </div>
      </div>
      <div className="holita">
      {winner?.Name === newFighter1.Name || winner?.Name === newFighter2.Name ? ( 
        <div className="winner-message-container">
            <p className="winner-text">{`${winner.Name} won the battle!`}</p>
            <div className="buttonsEnd">
            <button type="button" onClick={handleBackToCS} className="buttonEnd">Character selection</button>
            <button type="button" onClick={handleRepeatMatch} className="buttonEnd">Start over</button>
            </div>
        </div>
      ) : "" }
      </div>
    </div>
    </div>
  );
}
