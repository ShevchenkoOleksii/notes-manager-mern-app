import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {NotesPage} from "./pages/NotesPage";
import {ProfilePage} from "./pages/ProfilePage";
import {AuthPage} from "./pages/AuthPage";
import {DetailPage} from "./pages/DetailPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path={'api/notes'} element={<NotesPage />} />
        <Route path={'api/users/me'} element={<ProfilePage />} />
        <Route path={'api/notes/:id'} element={<DetailPage />} />
        <Route path={'*'} element={<Navigate replace to="api/users/me" />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path={'api/auth'} element={<AuthPage />} />
      <Route path={'*'} element={<Navigate replace to="api/auth" />} />
    </Routes>
  )
};