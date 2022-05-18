import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const useRoutes = (isAuthenticated, userID) => {
    const path = `/user-profile:${userID}`.toString()

    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={ <Navigate to={ path } /> } />
                <Route path={ path } element={ <ProfilePage /> } />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={ <AuthPage /> } />
        </Routes>
    );
};

export default useRoutes;