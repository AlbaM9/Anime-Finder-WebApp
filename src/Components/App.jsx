import React, { useState, useEffect } from 'react';
import Card from "./Card"
import '../scss/App.scss';



function App() {
  const [animesToShow, setAnimesToShow] = useState([]);
  let [favArray, setFavArray] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
  const [savedAnimes, setSavedAnimes] = useState([]);

  useEffect(() => {


    const savedAnimesFromStorage = JSON.parse(localStorage.getItem("favourites"));
    if (savedAnimesFromStorage) {

      favArray = savedAnimesFromStorage;
      setFavArray(favArray);

    }
  }, []);

  const handleFilter = (event) => {


    event.preventDefault();
    
    const SERVER_URL = `https://api.jikan.moe/v4/anime?q=${searchTerm}`;
    fetch(SERVER_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAnimesToShow(data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
    
  };
 

  const handleAddToFavorites = (anime) => {
    const isAlreadyFavourite = favArray.some(fav => fav.mal_id === anime.mal_id);
    if (!isAlreadyFavourite) {
      setFavArray([...favArray, anime]);
    } else {
      handleRemoveFromFavorites(anime.mal_id);
    }
  };

  const handleRemoveFromFavorites = (mal_id) => {
    const updatedFavArray = favArray.filter(anime => anime.mal_id !== mal_id);
    setFavArray(updatedFavArray);
  };

  const resetLists = () => {
    setFavArray([]);
    setAnimesToShow([]);
    localStorage.removeItem("favourites");
    setSearchTerm('');
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favArray));
  }, [favArray]);

  return (

    <>

      <div>
        <header>
          <h1>Buscador de Animes</h1>
          <nav className='nav'>
            <input className="searchInput" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="resetBtn" onClick={handleFilter}>Search</button>
            <button className="resetBtn" onClick={resetLists}>Reset</button>
          </nav>
        </header>
        <div className='masterContainer'  >
          <div className="favsList">
            {favArray.length > 0 && (
              <div>
                <h2>Animes favoritos</h2>
                {favArray.map(anime => (

                <Card param = {anime.mal_id} addFavouritesProp = {(mal_id) =>handleRemoveFromFavorites(anime.mal_id)} classBtn = {"delButn"} anime = {anime} typeBtn = "X" classItems = "favsItems" buttonParam={anime.mal_id}/>
               
               ))}
              </div>
            )}
          </div>
          <section>
            <div>
              <h2>Resultados de la búsqueda</h2>
            </div>
            <div className="searchList ">
            {animesToShow.map(anime => (
              
              
              <Card param = {anime} addFavouritesProp = {(anime) => handleAddToFavorites(anime)} classBtn = {"resetBtn"} anime = {anime} typeBtn = {"Añadir a Favoritos" } classItems ={"none"} />
            
            ))}
             </div>
          </section>

        </div>
      </div>

    </>
  );
}
//ksanfsf

export default App;

