import React  from "react";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import userService from "../services/user.service";
import { FORM_ERROR } from "final-form";
import { Typography, Paper, Grid, Button, CssBaseline } from "@mui/material";
import { actions as storeActions } from "../store/sagas";
import {  useDispatch } from "react-redux";

const LogInPage = () => {

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Поле обязательно для заполнения";
        }
        if (!values.password) {
            errors.password = "Поле обязательно для заполнения";
        }
        return errors;
    };

    const basicFormFields = [
        {
            size: 12,
            field: (
                <TextField
                    type="email"
                    label="Email"
                    name="email"
                    margin="none"
                    required={true}
                />
            ),
        },
        {
            size: 12,
            field: (
                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    margin="none"
                    required={true}
                />
            ),
        },
    ];

    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        const { data, error } = await userService.get(values);
        if (error) {
            console.log(error);
            if (error.code === "ERR_NETWORK") {
                return { [FORM_ERROR]: "Network Error" };
            } else {
                return { password: "wrong email or password" };
            }
        } else {
            dispatch(storeActions.currentuser_set_newToken(data));
        }
    };

    return (
        <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
            <CssBaseline />
            <Typography
                variant="h5"
                align="center"
                component="h2"
                color="white"
                backgroundColor="blue"
                gutterBottom
            >
                Страница входа
            </Typography>

            <Form
                onSubmit={onSubmit}
                initialValues={{}}
                validate={validate}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    submitError,
                    dirtyFieldsSinceLastSubmit,
                }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        {submitError &&
                            Object.values(dirtyFieldsSinceLastSubmit).filter(
                                (x) => x
                            ).length === 0 && (
                            <div className="alert alert-danger">
                                {submitError}
                            </div>
                        )}
                        <Paper style={{ padding: 16 }}>
                            <Grid
                                container
                                alignItems="flex-start"
                                direction="row"
                                spacing={3}
                            >
                                {basicFormFields.map((item, idx) => (
                                    <Grid item xs={item.size} key={idx}>
                                        {item.field}
                                    </Grid>
                                ))}

                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Отчистить
                                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        Отправить
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                )}
            />
        </div>
    );
};

export default LogInPage;
