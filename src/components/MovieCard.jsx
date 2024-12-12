import React, { useState } from "react";
import Ratings from "./Ratings"; 
import { Link } from "react-router-dom"; 
import AddFavorites from "./AddFavorites";

const MovieCard = (props) => {

  const [favorite, setFavorite] = useState(false)
  const [movie_id, setMovie_id] = useState()

  return (
    <>
      {/* Card container for each movie */}
      <div className="w-80 bg-green-600 rounded-md shadow-md m-4 shadow-green-600 hover:scale-105 transition-transform transform duration-500 relative">
        
        {/* Link that navigates to the details page of the specific movie */}
        <Link to={`/details/${props.movie.id || 'a'}`}>
          
          <div>
            {/* Movie poster */}
            <img
              src={`https://image.tmdb.org/t/p/w200${props.movie.poster_path}`} // The image URL is dynamically created using the poster_path from the movie object
              alt={props.movie.title} // Alt text for the image
              className="w-full rounded-t-md" // Tailwind classes for styling (full width, rounded top)
            />
          </div>

          <div className="p-4 space-y-2 text-xl text-white">
            {/* Movie title */}
            <h2>{props.movie.title}</h2>

            {/* Release date */}
            <p>{props.movie.release_date}</p>

            {/* Display the Ratings component and pass the average rating */}
            <div>
              <Ratings rate={props.movie.vote_average} />
            </div>
          </div>
        </Link>
        <div className="absolute bottom-2 right-2 cursor-pointer" onClick={()=> !favorite ? (setFavorite(true),setMovie_id(props.movie.id)) : setFavorite(false)}>
          <AddFavorites favorite={favorite} setFavorite={setFavorite} movie_id={movie_id} setMovie_id={setMovie_id}/>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
