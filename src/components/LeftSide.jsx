import React from "react"; 
import { Link } from "react-router-dom";

function LeftSide({ movie, genre, setGenre, setSearch }) {
  // handleClick function to handle genre selection
  const handleClick = (selectedGenre) => {
    setGenre(selectedGenre); // Update the genre in the parent component
    setSearch(""); // Reset the search query when the genre is changed
  };

  return (
    <div className="bg-green-600 w-auto h-full">
      {/* List of genres */}
      <ul>

        <li className=" bg-green-200 border-y py-4 px-8 cursor-pointer text-green-600 font-bold"><Link to="/favorites"><p>My Favorites</p></Link></li>
        {/* If 'movie' is an empty string, show an error message */}
        {movie === "" ? (
          "Error"
        ) : (
          // If movie is available, map through the movie (genres) array
          movie.map((items) => (
            <li
              key={items.id} // Unique key for each list item
              className={`border-y py-4 px-8 cursor-pointer ${genre === items.id ? 'bg-green-500 text-white' : ''}`} // Tailwind classes for styling; highlight selected genre
              onClick={() => handleClick(items.id)} // Trigger handleClick on item click
            >
              {items.name} {/* Display the name of the genre */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default LeftSide;
