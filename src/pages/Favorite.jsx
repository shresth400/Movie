import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const Favorite = () => {



	const apiKey = process.env.REACT_APP_API_KEY; // API key for The Movie DB API
	const baseURL = "https://api.themoviedb.org/3/movie/"; // Base URL for The Movie DB API

    const [favorite, setFavorite] = useState([])
    const [storage, setStorage] = useState(
        JSON.parse(localStorage.getItem('favorite')) || []
      );

    const movieId = JSON.parse(localStorage.getItem('favorite')) || []
    

	useEffect( () => {
		const getFavorite = async () => {
            const fav = movieId.map((id) => axios.get(`${baseURL}${id}?api_key=${apiKey}`))

            const response = await Promise.all(fav)

            const movies = response.map((response) => response.data)

            setFavorite(movies)
        }

        if (movieId.length > 0) {
            getFavorite()
        } else {
            setFavorite('')
        }

	}, [movieId]);


    useEffect(() => {
        const handleChange = () => {
            const update = JSON.parse(localStorage.getItem('favorite') || [])
            setStorage(update)
        }

        window.addEventListener('storage', handleChange)

        return () => {
            window.removeEventListener('storage', handleChange)
        }
    }, [])

	return (
        <>
        <div>

          <Link to="/">
      <div className="flex-1 w-40 h-full m-4">
        <div className="flex w-full bg-green-600 shadow rounded-lg py-2 px-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
          <p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-white">Go Back</p>
        </div>
</div>
          </Link>
         </div>


        <div className="flex flex-wrap">

        {
            favorite.length > 0 ?
            favorite.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))
            :
            <p className="m-10 text-3xl">You Don't have any Favorite Movies yet!!</p>

        }


        </div>
        </>
    )
};

export default Favorite;
