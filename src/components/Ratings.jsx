import React from 'react' 
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa" 

// Ratings component takes `rate` as props to display the star rating
const Ratings = (rate) => {
    // Dividing the rate by 2 to map to a 5-star scale (since ratings are usually out of 10)
    const rating = rate.rate / 2;

    // Array to hold the star elements that will be rendered
    const stars = [];

    // Loop to create the 5-star rating system
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            // If the current index is less than or equal to the rating, push a filled star
            stars.push(<FaStar key={i} />);
        }
        // Check for half-star condition
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            // If the rating is not an integer and we're at the position for a half-star, push a half-star
            stars.push(<FaStarHalfAlt key={i} />);
        }
        else {
            // If the current index is greater than the rating, push an empty star
            stars.push(<FaRegStar key={i} />);
        }
    }

    return (
        <>
            {/* Render the stars */}
            <div className='flex text-yellow-300 space-x-1'>
                {stars}
            </div>
        </>
    );
};

export default Ratings;
