import React from "react";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Upload from "./components/Upload";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<HomePage mode={'all'}/>}/>
                <Route path="/upload" element={<Upload/>}/>
                <Route path="/new" element={<HomePage mode={'new'}/>}/>
                <Route path="/hot" element={<HomePage mode={'hot'}/>}/>
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