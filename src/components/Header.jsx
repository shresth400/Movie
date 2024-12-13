import React from "react"; // Importing React
import SearchBar from "./SearchBar"; // Importing the SearchBar component
import { useLocation } from "react-router-dom";
import { MdLocalGasStation } from "react-icons/md";

const Header = ({ search, setSearch }) => {
	const location = useLocation();

	return (
		<>
			{/* Header container with green background and flexible layout */}
			<div className="bg-green-600 h-40 flex justify-evenly items-center">
				{/* Logo section */}
				<div>
					{/* Logo image, with a height of 30 */}
					<img src="../../images/logo_white.png" alt="logo" className="h-30" />
				</div>

				{/* Search bar section */}
				<div>
					{/* SearchBar component, passing down search and setSearch as props */}

					{location.pathname === "/" && (
						<SearchBar search={search} setSearch={setSearch} />
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
