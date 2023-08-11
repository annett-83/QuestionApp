import { useEffect, React } from "react";
import "./App.css";
import CreatEditUserProfilePage from "./pages/CreatEditUserProfilePage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import QuestionAppNavbar from "./pages/navbar.jsx";
import CreateQuestionPage from "./pages/CreateQuestionPage.jsx";
import CreateAndViewQuestionPage from "./pages/CreateAndViewQuestionPage.jsx";
import { useDispatch } from "react-redux";
import UserTeacherPage from "./pages/userTeacherPage.jsx";
import { actions as storeActions } from "./store/sagas";
import AboutThis from "./pages/AboutThis.jsx";
import {
    CssBaseline
} from "@mui/material";
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
