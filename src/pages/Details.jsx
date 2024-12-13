

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const params = useParams();
  const movieId = params.id;
  const api = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}`
      )
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [movieId]);

  // Loading state
  if (loading) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center text-2xl text-red-500 mt-10">Error: {error}</div>;
  }

  // Check if production_companies is defined and has data
  const productionCompanies = details && details.production_companies;

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


    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row bg-green-600 text-white rounded-lg shadow-lg">
        {/* Left Side: Poster */}
        <div className="w-full lg:w-1/3 p-4">
          {details && details.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title}
              className="w-full rounded-lg"
              />
            )}
        </div>

        {/* Right Side: Movie Info */}
        <div className="w-full lg:w-2/3 p-4">
          <h1 className="text-4xl font-bold mb-4">{details.title}</h1>
          <p className="text-lg mb-4 italic text-gray-300">{details.tagline}</p>

          <p className="text-lg mb-4">{details.overview}</p>

          {/* Release Date and Other Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p><strong>Release Date:</strong> {details.release_date}</p>
            <p><strong>Runtime:</strong> {details.runtime} minutes</p>
            <p><strong>Budget:</strong> ${details.budget.toLocaleString()}</p>
            <p><strong>Revenue:</strong> ${details.revenue.toLocaleString()}</p>
          </div>

          {/* Languages */}
          <div className="mb-4">
            <strong>Languages:</strong>{" "}
            {details.spoken_languages.map((language) => language.name).join(", ")}
          </div>

          {/* Production Companies */}
          <div className="mb-4">
            <strong>Production Companies:</strong>
            {productionCompanies && productionCompanies.length > 0 ? (
              <ul className="list-disc ml-6">
                {productionCompanies.map((company) => (
                  <li key={company.id} className="mb-2">{company.name}</li>
                ))}
              </ul>
            ) : (
              <p>No production companies listed</p>
            )}
          </div>

          {/* Additional Info: Vote Average */}
          <div className="mb-4">
            <strong>Vote Average:</strong> {details.vote_average} ({details.vote_count} votes)
          </div>
        </div>
      </div>
    </div>
              </>
  );
};

export default Details;


