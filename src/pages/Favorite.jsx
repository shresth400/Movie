import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Favorite = () => {



	const apiKey = process.env.REACT_APP_API_KEY; // API key for The Movie DB API
	const baseURL = "https://api.themoviedb.org/3/movie/"; // Base URL for The Movie DB API

    const [favorite, setFavorite] = useState([])
    const [storege, setStorage] = useState(
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
