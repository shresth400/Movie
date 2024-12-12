import React, { useEffect, useState } from 'react'
import { FaVirusCovid } from 'react-icons/fa6'

const AddFavorites = (props) => {

    console.log(props.favorite)

    let isFavorite = false;

    const favoriteMovies = JSON.parse(localStorage.getItem('favorite')) || []
    const exist = favoriteMovies.find((id) => id === props.movie_id)

    const favorite = {
        id: props.movie_id
    }

    if(props.favorite){

        if (!exist) {
            
            console.log(props.favorite)
            
            favoriteMovies.push(props.movie_id)
            
            localStorage.setItem('favorite', JSON.stringify(favoriteMovies))
        }
    }
    else {
       let update = favoriteMovies.filter(id => id !== props.movie_id)
        localStorage.setItem('favorite', JSON.stringify(update))
    }



  return (
    <>
      <div>
        {!props.favorite?
      <svg class="h-8 w-8 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
</svg>
:
<svg class="h-8 w-8 text-white"  fill="white" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
</svg>
}



      </div>
    </>
  )
}

export default AddFavorites
