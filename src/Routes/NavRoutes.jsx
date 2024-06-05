import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../components/Home/Home';
import DisplayDetails from '../components/DisplayDetails/DisplayDetails';

function NavRoutes() {
    return (
        <Routes>
            <Route path="/details" element={<DisplayDetails />}></Route>
            <Route path="/" element={< Home />}></Route>
        </Routes>
    )
}

export default NavRoutes
