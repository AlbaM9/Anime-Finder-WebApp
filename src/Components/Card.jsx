

function Card({addFavouritesProp, anime, typeBtn , classItems, classBtn, param}){

    return(
          <div className={`completeAnime ${classItems}`} key={anime.mal_id}>
            <img src={anime.images?.jpg?.image_url || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'} alt={anime.title} />
            <h3>{anime.title}</h3>
            <button className={`${classBtn}`} onClick={() => addFavouritesProp(param)}>{typeBtn}</button>
           
          </div>
    )
}

export default Card;