import React from "react";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Upload from "./components/Upload";
import NewPosts from "./components/NewPosts";
import HotPosts from "./components/HotPosts";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/upload" element={<Upload/>}/>
                <Route path="/new" element={<NewPosts/>}/>
                <Route path="/hot" element={<HotPosts/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/"/>}
                />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route
                path="*"
                element={<Navigate to="/login"/>}
            />
        </Routes>
    )
}