import React from "react";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
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