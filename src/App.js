import NavBar from "./components/NavBar";
import Background from "./components/Background";
import Description from "./components/Description";
import Popular from "./components/Popular";
import Failed from "./Failed";
import { useState, useEffect, useRef} from 'react';

function App() {
  const scrollRef = useRef(null);
  const[prevData, setData] = useState({})
  const[AllData, setAllData]=useState([])
  const [FilteredCardData, setFilteredCardData] = useState([])
  const [ComedyCardData, setComedyCardData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [Display, setDisplay] = useState(true)
  const [Curent, setCurrent] = useState('Home')
  const [Title, setTitle] = useState("TV Comedies")
  useEffect(() => {
    if (FilteredCardData.length > 0) {
      const randint = Math.floor(Math.random() * FilteredCardData.length);
      const image = FilteredCardData[randint].image;
      const desc = FilteredCardData[randint].description;
      const logo = FilteredCardData[randint].logo;
      const seasons = FilteredCardData[randint].seasons;
      setData({ image: image, description: desc, logo: logo, seasons: seasons });
    }
  }, [FilteredCardData]);
  useEffect(() =>{
    setFilteredCardData(AllData)
    setComedyCardData(AllData.filter((data) => {
      return (
        data.genres.includes("Comedy Anime") ||
        data.genres.includes("Comedy Movies") ||
        data.genres.includes("Romantic Comedy Movies") ||
        data.genres.includes("Stand-Up Comedy") ||
        data.genres.includes("TV Comedies") ||
        data.genres.includes("Romantic TV Comedies")
      );
    }));
  }, [AllData])
  const tabSelectHandler = (data) => {
    window.scrollTo({ top: 0});
    if (data === 'Home'){
      setFilteredCardData(AllData)

      setComedyCardData(AllData.filter((data) => {
        return (
          data.genres.includes("Comedy Anime") ||
          data.genres.includes("Comedy Movies") ||
          data.genres.includes("Romantic Comedy Movies") ||
          data.genres.includes("Stand-Up Comedy") ||
          data.genres.includes("TV Comedies") ||
          data.genres.includes("Romantic TV Comedies")
        );
      }));
      (AllData.map((data) => {
        return console.log(data.genres)
      }))
      setDisplay(true)
      setCurrent("Home")
    }else if(data ==="TVShows"){
      if (Curent === "TVShows"){
        return;
      }
      setTitle("TV Comedies")
      setFilteredCardData(AllData.filter((card) => {return card.episodes !== undefined}))
      setComedyCardData(AllData.filter((data) => {
        return (
          data.genres.includes("Comedy Anime") ||
          data.genres.includes("Stand-Up Comedy") ||
          data.genres.includes("TV Comedies") ||
          data.genres.includes("Romantic TV Comedies")
        );
      }));
      setDisplay(true)
      setCurrent("TVShows")
  }else if(data ==="Movies"){
    if (Curent === "Movies"){
      return;
    }
    setTitle("Comedy Movies")
    setFilteredCardData(AllData.filter((card) => {return card.episodes === undefined}))
    setComedyCardData(AllData.filter((data) => {
      return (
        data.genres.includes("Comedy Movies") ||
        data.genres.includes("Romantic Comedy Movies") 
      );
    }));
    setDisplay(true)
    setCurrent("Movies")
}else{
  if (Curent === ''){
    setTimeout(() => {
      window.scrollTo({
        top: window.pageYOffset + 100,
        behavior: 'smooth'
      });
    }, 0.001) 
    return;
  }
  setDisplay(false)
  setCurrent('')
  window.scrollTo({
    top: window.pageYOffset + 100,
    behavior: 'smooth'
  })}}
  useEffect(() =>{
      async function data() {
      const url = 'https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20&lang=en';
      const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '8586d0c1f7mshf62c53df23e7d53p11c4d5jsne05d82791ef0',
          'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
      }
      };
      try {
      const response = await fetch(url, options);
      const result = await response.text();
      const randint = Math.floor(Math.random()*JSON.parse(result).titles.length)
      const image = JSON.parse(result).titles[randint].jawSummary.backgroundImage.url
      const desc = JSON.parse(result).titles[randint].jawSummary.contextualSynopsis.text
      const logo = JSON.parse(result).titles[randint].jawSummary.logoImage.url
      const seasons = JSON.parse(result).titles[randint].jawSummary.seasonCount
  

      
        for (let i = 0; i < JSON.parse(result).titles.length; i++) {
          setAllData((disco) => {
            return [
              ...disco,
              {
                title: 'card ' + (i + 1),
                image: JSON.parse(result).titles[i].jawSummary.backgroundImage?.url,
                episodes: JSON.parse(result).titles[i].episodeCount,
                description: JSON.parse(result).titles[i].jawSummary.contextualSynopsis.text,
                logo: JSON.parse(result).titles[i].jawSummary.logoImage?.url,
                seasons: JSON.parse(result).titles[i].jawSummary.seasonCount,
                genres: JSON.parse(result).titles[i].jawSummary.genres.map((k) => {
                  return k.name;
                }),
              },
            ];
          });
        }
      
      
      setData({image: image, description: desc, logo: logo, seasons:seasons})
      setLoaded(true)
      } catch (error) {
      console.error(error);
  
      }}
      data();
  }, [])

  return (
    <div ref={scrollRef}>
      <NavBar selected={tabSelectHandler}/>
      {Display? <><Background data={prevData}/>
      <Description data={prevData} loaded={loaded}/>
      <Popular data={FilteredCardData} loaded={loaded} title='Popular On Netflix'/>
      <Popular data={ComedyCardData} loaded={loaded} title={Title}/></>:<Failed/>}
    </div>
  );
}

export default App;
