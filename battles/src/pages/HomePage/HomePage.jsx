import { Link } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const [isHomepage, setIsHomepage] = useState(location.pathname === '/');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, []);

  useLayoutEffect(() => {
    setIsHomepage(location.pathname === '/');
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (isHomepage) {
      const handleOrientationChange = () => checkOrientation();
      const handleResize = () => checkOrientation();

      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleResize);

      // Initial check
      checkOrientation();

      // Clean up event listeners when the component is unmounted
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isHomepage]);
    

  function checkOrientation() {
    var landscapeMessage = document.getElementById("landscapeMessage");

    if (window.innerHeight > window.innerWidth) {

      landscapeMessage.style.display = "block";
    } else {

      landscapeMessage.style.display = "none";
    }
  }
    
setTimeout(function() {
        checkOrientation();
    }, 1500);

  return (
    <div className="home-container">
      <div className="video-container">
        <video id="video-background" autoPlay muted loop>
          <source
            src="https://res.cloudinary.com/dvmkyxyc0/video/upload/v1699307706/FondoLoopHome_x5f2lv.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div id="landscapeMessage">
        <p>
          EN: Consider turning your device to landscape mode for a better
          experience.
        </p>
        <p>
          ES: Considera poner tu dispositivo en modo paisaje para optimizar tu
          experiencia.
        </p>
      </div>
      <div className="home-all">
        <div className="logoImg">
          <img
            className="logo-name puff-in-center"
            src="https://res.cloudinary.com/dizd9f3ky/image/upload/v1699431365/Logo_name1_haqxgd.png"
            alt="logo"
          />
        </div>
        <div className="home-button">
          {showButton && (
            <Link to="/CharacterSelection">
              <button className="home-content fade-in-fwd" type="button">
                Choose your characters!
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
