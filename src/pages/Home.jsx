import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import LeftSide from "../components/LeftSide";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]); // State to store movie data
  const [genres, setGenres] = useState([]); // State to store genres
  const [genre, setGenre] = useState(28); // Default genre is Action (28)

  const { search, setSearch } = useOutletContext(); // Get search state and setSearch function from parent

  const apiKey = "59857a06cd1b18db4121a0c4d3dc7ce6"; // API key for The Movie DB API
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

  // Fetch movies based on the selected genre
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `${baseURL}/discover/movie?api_key=${apiKey}&with_genres=${genre}`
      );
      setMovies(response.data); // Set the fetched movies to state
    };
    fetchMovies();
  }, [genre]); // Runs whenever the selected genre changes

  // Fetch movies based on search query
  useEffect(() => {
    if (search.trim() === "") { // If no search query, fetch movies for the selected genre
      const fetchMovies = async () => {
        const response = await axios.get(
          `${baseURL}/discover/movie?api_key=${apiKey}&with_genres=${genre}`
        );
        setMovies(response.data.results); // Set the fetched results to state
      };
      fetchMovies();
    } else { // If there is a search query, fetch movies based on the query
      const fetchMovies = async () => {
        const response = await axios.get(
          `${baseURL}/search/movie?api_key=${apiKey}&query=${search}`
        );
        setMovies(response.data.results); // Set the fetched results to state
      };
      fetchMovies();
    }
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
        <div>
        </div>

        {/* Display the movie cards or a "Not Found" message */}
        <div className="flex flex-wrap justify-evenly">
          {movies.length === 0 ? (
            // If no movies are found, display a "Not Found" message
            <p className="text-red-400 m-10 text-3xl">
              {search} Not Found.
            </p>
          ) : (
            // If movies are found, map through the array and display movie cards
            Array.isArray(movies) ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              // If the movies data is not an array, show a "Loading..." message
              <div className="text-center m-10">
                <p className="text-3xl">Loading...</p>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
