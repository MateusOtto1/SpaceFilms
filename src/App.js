import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Movie from "./pages/movie";
import Favoritos from "./pages/favoritos";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/:id" exact element={<Movie />} />
                <Route path="/favoritos" exact element={<Favoritos />} />
            </Routes>
        </div>
    );
};

export default App;
