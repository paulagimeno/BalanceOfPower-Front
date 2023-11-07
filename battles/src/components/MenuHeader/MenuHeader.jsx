import React from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function MenuHeader() {

    const goBack = () => {
        window.history.back();
      };

    return(
        <div className='menuHeader'>
            <div className='volver' onClick={goBack}>
            <img className='flecha' src='https://res.cloudinary.com/dvmkyxyc0/image/upload/v1697845997/Vector_jvcokm.png' alt='flechita'></img>
            <p>Back</p>
            </div>
            <div className='homeLink'>
            <Link to='/'>
            <img className='house' src="https://res.cloudinary.com/dvmkyxyc0/image/upload/v1697845997/Group_syd31k.png" alt="home"></img>
            </Link>
            </div>
        </div>
    )
}