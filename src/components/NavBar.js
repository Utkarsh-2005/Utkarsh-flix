import React from "react";
import { useState, useEffect } from 'react';
import "./NavBar.css"

const NavBar = (props) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isActive, setActive] = useState({Home: 'clicked'});

    useEffect(() => {
      function handleScroll() {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const tabClickHandler = (e) =>{
        const name = e.target.outerText.replace(/\s+/g, '');
        props.selected(name)
        setActive({[name] : 'clicked'})
    }
    return(
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <img src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' className="logo" alt=""/>
            <div className={`options ${isActive.Home==='clicked'? 'active' : ''}`} id="home">
                <p onClick={tabClickHandler}>Home</p>
            </div>
            <div className={`options ${isActive.TVShows==='clicked'? 'active' : ''}`} id="tvshows">
                <p onClick={tabClickHandler}>TV Shows</p>
            </div>
            <div className={`options ${isActive.Movies==='clicked'? 'active' : ''}`} id="movies">
                <p onClick={tabClickHandler}>Movies</p>
            </div>
            <div className={`options ${isActive['New&Popular']==='clicked'? 'active' : ''}`} id="new">
                <p onClick={tabClickHandler}>New & Popular</p>
            </div>
            <div className={`options ${isActive.MyList==='clicked'? 'active' : ''}`} id="mylist">
                <p onClick={tabClickHandler}>MyList</p>
            </div>
            <div className={`options ${isActive.BrowseByLanguages==='clicked'? 'active' : ''}`} id="Browse">
                <p onClick={tabClickHandler}>Browse By Languages</p>
            </div>
            <div className="options2">
                <img src="https://static-00.iconduck.com/assets.00/search-icon-256x256-v6gfhlc1.png" alt='' className="icons" id="search"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png" alt='' className="icons"/>
                <img src="http://occ-0-2610-3647.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABblDbORWl6aYv8C5_eq2TKG4OE90mhcN7rJFAehBCctTzhdyEj4O6CP8auuFiQtMep4GkTCFaY1iASnR6iDxZ41t0noi7Ag.png?r=6a6" className="profile" alt=''/>
                <img src="https://www.nicepng.com/png/full/433-4333997_white-triangle-transparent-background.png" className="arrow" alt=''/>
            </div>
        </div>
    )
}

export default NavBar;