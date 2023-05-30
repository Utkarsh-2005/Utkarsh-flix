import React from 'react'
import { useState, useEffect } from 'react'
import './Description.css'
import image from '../assets/PngItem_3406810.png'
const Description = (props) => {
    const [Defined, setDefined] = useState(true)
    useEffect(() => {
        if (typeof props.data.seasons === 'undefined') {
            setDefined(false);
        } else {
            setDefined(true);
        }
    }, [props.data.seasons]);
    return (
        <div className={`info ${props.loaded? '': 'waiting'}`}>
            <img src={props.data.logo} alt='' className='logoImage' />
            {Defined ? <p className='seasons'>Watch Season {props.data.seasons} now</p> : null}
            <p className='description'>{props.data.description}</p>
            <button className="play-button">
                <div className='container'><img src="https://icons.veryicon.com/png/o/miscellaneous/winsion/play-button-6.png" alt="" className='play-image' /><p>Play</p></div>
            </button>
            <button className='info-button'>
                <div className='container2'><img src={image} alt="" className='play-image' /><p>More Info</p></div>
            </button>
        </div>
    )
}

export default Description;