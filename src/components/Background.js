import React from 'react'
import "./Background.css"

const Background = (props) =>{
  return(
    <div>
        <img src={props.data.image} alt='background' className='background'/>
        <div className='gradient'></div>
        <div className='gradient2'></div>
    </div>
  )
}

export default Background;