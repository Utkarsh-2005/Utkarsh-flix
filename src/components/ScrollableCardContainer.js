import React from 'react';
import Card from './Card';
import { useRef } from 'react';

import './ScrollableCardContainer.css'

const ScrollableCardContainer = (props) =>{
    const containerRef = useRef(null);
  
    const handleScroll = (scrollOffset) => {
      containerRef.current.scrollLeft += scrollOffset;
    };
  
    return (
      <>
      <div className="scrollable-container" ref={containerRef}>
      <button className="scroll-button scroll-button-left" onClick={() => handleScroll(-1200)}>
      <img src='	https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png' alt=''/>
      </button>
        {props.data.map((card, index) => (
          <Card key={index} title={card.title} image={card.image}/>
        ))} 
      <button className="scroll-button scroll-button-right" onClick={() => handleScroll(1200)}>
      <img src='	https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png' alt=''/>
    </button>
      </div>
      </>
    );
};

export default ScrollableCardContainer;