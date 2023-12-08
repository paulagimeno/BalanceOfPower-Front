import React, { useState, useEffect } from "react";
import { w3cwebsocket } from "websocket";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import MenuHeader from "../MenuHeader/MenuHeader";

const CharactersGallery = () => {
  const [characters, setCharacters] = useState([]);
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);
  const [filter, setFilter] = useState("All");
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMoveToArena, setIsMoveToArena] = useState(false);

  useEffect(() => {
    const client = new w3cwebsocket(
      "wss://3xdolcyby2.execute-api.eu-west-3.amazonaws.com/dev/"
    );
    client.onopen = () => {
      console.log("Tas conetao");

      const message = JSON.stringify({ action: "GetAll" });
      client.send(message);
    };
    client.onmessage = (message) => {
      const characters = JSON.parse(message.data);
      console.log("Personajes: ", characters);
      setCharacters(characters);
    };
    client.onclose = () => {
      console.log("Ya no tas conectao");
    };
    return () => {
      client.close();
    };
  }, []);

  const handleFighters = (character) => {
    if (fighter1 === character) {
      setFighter1(null);
    } else if (fighter2 === character) {
      setFighter2(null);
    } else if (fighter1 === null) {
      setFighter1(character);
    } else if (fighter2 === null) {
      setFighter2(character);
    } else {
      setFighter1(null);
      setFighter2(null);
    }
  };

  const extractAttributeValue = (attribute) => {
    const type = Object.keys(attribute)[0];
    return attribute[type];
  };

  const filterCharacters = (Category) => {
    setFilter(Category);
  };

  const filteredCharacters =
    filter === "All"
      ? characters
      : characters.filter(
          (character) => extractAttributeValue(character.Category) === filter
        );

  useEffect(() => {
    if (fighter1 && fighter2) {
      setIsGrayscale(true);
    } else {
      setIsGrayscale(false);
    }
  }, [fighter1, fighter2]);

  //READY!!
  const handleReady = () => {
    setIsReady(true);
    setIsMoveToArena(true);
  };

  return (
    <div className="gallery">
      <div className="video-container">
        <video id="video-background" autoPlay muted loop>
          <source
            src="https://res.cloudinary.com/dvmkyxyc0/video/upload/v1699307885/FondoLoopCS_vu8sgm.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <MenuHeader />
      <div className={`gallery-cs ${isGrayscale ? "grayscale" : ""}`}>
        <div className="character-filter">
          <button
            className="button-filter"
            onClick={() => filterCharacters("All")}
          >
            All
          </button>
          <button
            className="button-filter"
            onClick={() => filterCharacters("DPS")}
          >
            DPS
          </button>
          <button
            className="button-filter"
            onClick={() => filterCharacters("Tank")}
          >
            TANK
          </button>
          <button
            className="button-filter"
            onClick={() => filterCharacters("Healer")}
          >
            HEALER
          </button>
        </div>
        <div className="under-cs">
           
              <div className="charcters-selection">
                {fighter1 && (
                  <div className="character-selected1">
                  <div className="this-image">
                    <img
                      className="img-character1"
                      src={extractAttributeValue(fighter1.FullBodyImage)}
                      alt={extractAttributeValue(fighter1.Name)}
                    />
                    </div>
                    <div className="this-name">
                    <p className="p-name1">
                      {extractAttributeValue(fighter1.Name)}
                    </p>
                    </div>
                  </div>
                )}
          
            </div>
            <div className="box-gallery">
              {/* <h1>Character Select</h1> */}
              <div className="character-content">
                <SimpleBar style={{ maxHeight: "65vh", width: "40vw" }}>
                  <div className="character-gallery">
                    {filteredCharacters.map((item, i) => (
                      <div
                        className={`character-item ${
                          fighter1 === item ? "fighter1" : ""
                        } ${fighter2 === item ? "fighter2" : ""}`}
                        key={i}
                        onClick={() => handleFighters(item)}
                      >
                        <img
                          className="character-img"
                          src={extractAttributeValue(item.AvatarImage)}
                          alt=""
                        />
                        <div className="character-overlay">
                          <div className="character-name">
                            {extractAttributeValue(item.Name)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SimpleBar>
              </div>
            </div>
            
              <div className="charcters-selection">
                {fighter2 && (
                  <div className="character-selected2">
                  <div className="this-image">
                    <img
                      className="img-character2"
                      src={extractAttributeValue(fighter2.FullBodyImage)}
                      alt={extractAttributeValue(fighter2.Name)}
                    />
                    </div>
                    <div className="this-name">
                    <p className="p-name2">
                      {extractAttributeValue(fighter2.Name)}
                    </p>
                    </div>
                  </div>
                )}
              </div>
       
        </div>
      </div>
      <div className="characters-button">
        {isReady ? (
          isMoveToArena ? (
            <Link
              to="/FightingArena"
              state={{ fighter1: fighter1, fighter2: fighter2 }}
            >
              <button className="button-arena">
                Move to the fighting arena
              </button>
            </Link>
          ) : (
            <button
            type="button"
              className="button-ready rotate-button"
              onClick={handleReady}
            >
              Ready!
            </button>
          )
        ) : (
          fighter1 &&
          fighter2 && (
            <div className="button-ready">
              <button className="ready" onClick={handleReady}>
                Ready!
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CharactersGallery;
