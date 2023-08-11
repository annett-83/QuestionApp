import React from "react";
import { Form } from "react-final-form";
import { TextField, Select } from "mui-rff";
import { FORM_ERROR } from "final-form";
import { useSelector } from "react-redux";
import questionService from "../services/questionService";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Paper,
    Grid,
    Button,
    CssBaseline,
    MenuItem
} from "@mui/material";

const CreateQuestionPage = () => {
    const navigate = useNavigate();
    const subjects = useSelector((state) => state.subject.data);
    if (subjects) {
        const validate = (values) => {
            const errors = {};
            if (!values.subject) {
                errors.subject = "Поле обязательно для заполнения";
            }
            if (!values.title) {
                errors.title = "Поле обязательно для заполнения";
            }
            if (!values.content) {
                errors.content = "Поле обязательно для заполнения";
            }
            if (!values.price) {
                errors.price = "Поле обязательно для заполнения";
            } else {
                const n = Number(values.price);
                if (isNaN(n)) {
                    errors.price = "Enter a valid amount"; // не работает?
                } else {
                    if (n < 50) {
                        errors.price = "Цена должна быть минимум 50 рублей";
                    }
                }
            }
            return errors;
        };

        const basicFormFields = [
            {
                size: 12,
                field: (
                    <Select
                        name="subject"
                        label="Предмет"
                        required={true}
                        formControlProps={{ margin: "none" }}
                        style={{ textAlign: "left" }}>
                        {Object.values(subjects).map((s) => (
                            <MenuItem
                                key={s._id}
                                value={s._id}>
                                {s.name}
                            </MenuItem>
                        ))}
                    </Select>
                )
            },
            {
                size: 12,
                field: (
                    <TextField
                        label="Укажи, к какому разделу науки относится твой вопрос"
                        name="title"
                        margin="none"
                        required={true}
                    />
                )
            },
            {
                size: 12,
                field: (
                    <TextField
                        name="content"
                        multiline
                        label="Твой вопрос"
                        margin="none"
                        required={true}
                    />
                )
            },
            {
                size: 12,
                field: (
                    <TextField
                        type="number"
                        label="Цена"
                        name="price"
                        margin="none"
                        required={true}
                    />
                )
            }
        ];
        const onSubmit = async (values) => {
            try {
                await questionService.create(values);
                navigate(-1);
            } catch (error) {
                return { [FORM_ERROR]: "Upload Failed" };
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
                    gutterBottom>
                    Задай свой вопрос
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
                        dirtyFieldsSinceLastSubmit
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            noValidate>
                            {submitError &&
                                Object.values(
                                    dirtyFieldsSinceLastSubmit
                                ).filter((x) => x).length === 0 && (
                                <div className="alert alert-danger">
                                    {submitError}
                                </div>
                            )}
                            <Paper style={{ padding: 16 }}>
                                <Grid
                                    container
                                    alignItems="flex-start"
                                    direction="row"
                                    spacing={3}>
                                    {basicFormFields.map((item, idx) => (
                                        <Grid
                                            item
                                            xs={item.size}
                                            key={idx}>
                                            {item.field}
                                        </Grid>
                                    ))}

                                    <Grid
                                        item
                                        style={{ marginTop: 16 }}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={form.reset}
                                            disabled={submitting || pristine}>
                                            Отчистить
                                        </Button>
                                    </Grid>
                                    <Grid
                                        item
                                        style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}>
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
    } else {
        return <div>Loading...</div>;
    }
};

export default CreateQuestionPage;
