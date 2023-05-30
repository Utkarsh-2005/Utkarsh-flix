import React from 'react'
import { useState, useEffect } from 'react';
import './Failed.css'

const Failed = () =>{
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      function handleScroll() {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return(
        <div className={`main ${isScrolled ? 'scrolled' : ''}`}>
        <div className='loading'>
        <h1>This page could not be loaded</h1>
        <p>We apologise for the inconvenience</p>
        </div>
        </div>
    )
}

export default Failed;