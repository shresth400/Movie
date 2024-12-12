import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
	const [favorite, setFavorite] = useState(false);

  useEffect(()=> {
    const favoriteMovies = JSON.parse(localStorage.getItem("favorite")) || []
    const exist = favoriteMovies.find((id) => id === props.movie.id)
    setFavorite(!!exist)
  }, [props.movie.id])

  const handelClick = () => {

    setFavorite(!favorite)

    const favoriteMovies = JSON.parse(localStorage.getItem('favorite')) || []
    const exist = favoriteMovies.find((id) => id === props.movie.id)
    
    if(!exist) {
      favoriteMovies.push(props.movie.id)
      localStorage.setItem('favorite', JSON.stringify(favoriteMovies))
    }
    else {
      let update = favoriteMovies.filter(id => id !== props.movie.id)
      localStorage.setItem('favorite', JSON.stringify(update))
      
    }
  }

	return (
		<>
			{/* Card container for each movie */}
			<div className="w-80 bg-green-600 rounded-md shadow-md m-4 shadow-green-600 hover:scale-105 transition-transform transform duration-500 relative">
				{/* Link that navigates to the details page of the specific movie */}
				<Link to={`/details/${props.movie.id}`}>
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
				<div
					className="absolute bottom-2 right-2 cursor-pointer"
					onClick={handelClick}
				>
					{!favorite ? (
						<svg
							class="h-8 w-8 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					) : (
						<svg
							class="h-8 w-8 text-white"
							fill="white"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					)}
				</div>
			</div>
		</>
	);
};

export default MovieCard;
