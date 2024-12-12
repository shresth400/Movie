import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Details from "./pages/Details";
import Favorite from "./pages/Favorite";

const Siteroute = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
					<Route index element={<Home />}></Route>
					<Route path="/favorites" element={<Favorite />}></Route>

					</Route>

					<Route path="/details/:id" element={<Details />}/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Siteroute;
