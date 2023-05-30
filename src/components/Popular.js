import React from 'react'
import './Popular.css'
import ScrollableCardContainer from './ScrollableCardContainer'

const Popular = (props) =>{
    return(
        <div className={`main-tab ${props.loaded? '': 'waiting'}`}>
            <div className='popular-tab'>
                <p>{props.title}</p>
            </div>
            <ScrollableCardContainer data={props.data}/>
        </div>
    )
}

export default Popular;