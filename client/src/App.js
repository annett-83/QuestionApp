import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    CssBaseline
} from "@mui/material";

import AboutThis from "./pages/AboutThis.jsx";
import CreateAndViewQuestionPage from "./pages/CreateAndViewQuestionPage.jsx";
import CreatEditUserProfilePage from "./pages/CreatEditUserProfilePage.jsx";
import CreateQuestionPage from "./pages/CreateQuestionPage.jsx";
import Home from "./pages/Home.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import QuestionAppNavbar from "./pages/navbar.jsx";
import UserTeacherPage from "./pages/userTeacherPage.jsx";
import { actions as storeActions } from "./store/sagas";

import "./App.css";
export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Update the document title using the browser API
        dispatch(storeActions.initialize_store());
    });

    return (
        <div className="App">
            <CssBaseline />
            <BrowserRouter>
                <QuestionAppNavbar />
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/teacher/:teacherId?"
                        element={<UserTeacherPage />}
                    />
                    <Route
                        path="/login"
                        element={<LogInPage />}
                    />
                    <Route
                        path="/signUp"
                        element={<CreatEditUserProfilePage />}
                    />
                    <Route
                        path="/profile"
                        element={<CreatEditUserProfilePage />}
                    />
                    <Route
                        path="/About"
                        element={<AboutThis />}
                    />
                    <Route
                        path="/askYourQuestion"
                        element={<CreateQuestionPage />}
                    />
                    <Route
                        path="/answerThatQuestion/:questionId?"
                        element={<CreateAndViewQuestionPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
