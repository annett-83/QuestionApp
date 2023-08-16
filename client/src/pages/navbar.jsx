import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { ColorRing } from "../../node_modules/react-loader-spinner/dist/index";
import logo from "../components/img/pc7rLGMKi_small.jpg";
import { actions as storeActions } from "../store/sagas";
import { states as currentUserStates } from "../store/userSlice";
import useClickClack from "./hooks/useClickClack.jsx";

function QuestionAppNavbar() {
    const navigate = useNavigate();
    const userData = useSelector(currentUserStates.currentUserData, _.isEqual);
    const isLoadingUserData = useSelector(currentUserStates.isLoadingUserData);
    const dispatch = useDispatch();
    const [checked, onClick] = useClickClack();
    useEffect(() => {
        navigate("/");
    }, [userData, isLoadingUserData]);

    function logout() {
        navigate("/");
        dispatch(storeActions.currentuser_log_out());
    }
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand title="Ask" onClick={() => navigate("/")}>
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">
                    <Button
                        type="button"
                        variant="outline-primary"
                        onClick={onClick}
                    >
                        {checked ? <span>yes</span> : <span>no</span>}
                    </Button>

                    <Button
                        type="button"
                        variant="outline-primary"
                        onClick={() => navigate("/About")}
                    >
                        О сайте
                    </Button>

                    {isLoadingUserData ? (
                        <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                            ]}
                        />
                    ) : (
                        <div className="flex">
                            {userData ? (
                                <div className="btn-group">
                                    <Form inline="true">
                                        {userData.isStudent ? (
                                            <Button
                                                type="button"
                                                variant="outline-primary"
                                                onClick={() =>
                                                    navigate("/askYourQuestion")
                                                }
                                            >
                                                Задай свой вопрос
                                            </Button>
                                        ) : (
                                            <div />
                                        )}
                                    </Form>
                                    <Form inline="true">
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="outline-primary"
                                                id="dropdown-basic"
                                            >
                                                {userData.name}
                                                {userData.isTeacher
                                                    ? "-Учитель"
                                                    : "-Ученик"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        navigate("/profile")
                                                    }
                                                >
                                                    Профиль
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={logout}>
                                                    Выйти
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    Пополнить баланс
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        type="button"
                                        variant="outline-primary"
                                        onClick={() => navigate("/login")}
                                    >
                                        Войти
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline-primary"
                                        onClick={() => navigate("/signup")}
                                    >
                                        Регистрироваться
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default QuestionAppNavbar;
