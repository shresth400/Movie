import React from "react"; 

const SearchBar = ({ search, setSearch }) => {
  // Function to update the search value as the user types
  const userQuery = (event) => {
    setSearch(event.target.value); // Sets the search query to the current value of the input field
  };

  // Function to trigger search action (can be used to trigger search when user presses a button)
  const searchQuery = () => {
    setSearch(search); // Triggers the search with the current search query value
  };

  return (
    <>
      {/* Wrapper for the search bar and button, using flex layout */}
      <div className="flex items-center w-auto">
        
        {/* Input field for the user to type the search query */}
        <input
          type="text"
          placeholder="Search for Movies..."  // Placeholder text in the search box
          className="h-14 p-2 w-3/4 rounded rounded-r-none"  // Tailwind CSS classes for height, padding, and width
          onChange={userQuery}  // Updates search state as user types
          maxLength={100}  // Maximum characters user can type
        />
        
        {/* Button to trigger the search action */}
        <button
          className="bg-slate-500 rounded-l-none rounded-md p-3"  // Tailwind CSS classes for button style
          onClick={searchQuery}  // Triggers search when clicked
        >
          {/* SVG search icon */}
          <svg
            className="h-8 w-8 text-white"  // Set icon size and color
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" /> {/* Clears the default path */}
            <circle cx="10" cy="10" r="7" /> {/* Circle part of the search icon */}
            <line x1="21" y1="21" x2="15" y2="15" /> {/* Line representing the magnifying glass handle */}
          </svg>
        </button>
      </div>
    </>
  );
};

export default SearchBar;
