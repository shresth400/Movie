import React, { useEffect } from "react";
import axios from "axios";

const Favorite = () => {
	const apiKey = "59857a06cd1b18db4121a0c4d3dc7ce6"; // API key for The Movie DB API
	const baseURL = "https://api.themoviedb.org/3/movie/"; // Base URL for The Movie DB API

    const favorite = localStorage.getItem('favorite')
    let id = 0

	useEffect(async () => {
		// const response = await axios.get(`${baseURL}${id}?api_key=${apiKey}`);
	});

	return (
        <>
        {favorite}
        </>
    )
};

export default Favorite;
