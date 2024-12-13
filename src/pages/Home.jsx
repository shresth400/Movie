import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import LeftSide from "../components/LeftSide";
import { useOutletContext } from "react-router-dom";

const Home = () => {
	const [movies, setMovies] = useState([]); // State to store movie data
	const [genres, setGenres] = useState([]); // State to store genres
	const [genre, setGenre] = useState(28); // Default genre is Action (28)
	const [loading, setLoading] = useState(true); // State to manage loading

	const { search, setSearch } = useOutletContext(); // Get search state and setSearch function from parent

	const apiKey = process.env.REACT_APP_API_KEY; // API key for The Movie DB API
	const baseURL = "https://api.themoviedb.org/3"; // Base URL for The Movie DB API

	// Fetch genres
	useEffect(() => {
		const fetchGenres = async () => {
			const response = await axios.get(
				`${baseURL}/genre/movie/list?api_key=${apiKey}&language=en-US`
			);
			setGenres(response.data.genres); // Set the fetched genres to state
		};
		fetchGenres();
	}, []);

	// Fetch movies based on selected genre or search query
	useEffect(() => {
		setLoading(true); // Set loading to true before fetching data

		const fetchMovies = async () => {
			let response;
			if (search.trim() === "") {
				// If no search query, fetch movies for the selected genre
				response = await axios.get(
					`${baseURL}/discover/movie?api_key=${apiKey}&with_genres=${genre}`
				);
			} else {
				// If there is a search query, fetch movies based on the query
				response = await axios.get(
					`${baseURL}/search/movie?api_key=${apiKey}&query=${search}`
				);
			}

			// Set the movies state with the fetched data
			setMovies(response.data.results || []); // Set the fetched results to state
			setLoading(false); // Set loading to false after the data is fetched
		};

		fetchMovies();
	}, [search, genre]); // Runs whenever the search query or genre changes

	return (
		<div>
			<div className="flex">
				<div>
					{/* Pass genres, genre, and setGenre to LeftSide component for genre filtering */}
					<LeftSide
						movie={genres}
						genre={genre}
						setGenre={setGenre}
						setSearch={setSearch}
					/>
				</div>

				{/* Main content area for displaying movies */}
				<div></div>

				{/* Display the movie cards or a "Not Found" message */}
				<div className="flex flex-wrap justify-evenly">
					{loading ? (
						// If loading, display loading message
						<div className="text-center m-10">
							<p className="text-3xl">Loading...</p>
						</div>
					) : movies.length === 0 ? (
						// If no movies found, display not found message
						<p className="text-red-400 m-10 text-3xl">{search} Not Found.</p>
					) : (
						// If movies are found, display movie cards
						movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
