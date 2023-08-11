import React from "react";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import answerService from "../services/answerService";
import { FORM_ERROR } from "final-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { Typography, Paper, Grid, Button, CssBaseline } from "@mui/material";

const CreateAndViewQuestionPage = () => {
    const params = useParams();
    const { questionId } = params;

    const navigate = useNavigate();

    const selectFilteredQuestions = createSelector(
        (state) => state.user.data.questionData,
        (questionArray) => questionArray.find((q) => q._id === questionId)
    );

    const questionData = useSelector(selectFilteredQuestions);

    const validate = (values) => {
        const errors = {};
        if (!values.answer) {
            errors.answer = "Поле должно быть заполнено.";
        } else {
            if (values.answer.length < 100) {
                errors.answer = "Ответ должен содержать более одного предложения";
            }
        }
        return errors;
    };

    const basicFormFields = [
        {
            size: 12,
            field: (
                <TextField
                    name="answer"
                    multiline
                    label="Ваш ответ"
                    margin="none"
                    required={true}
                />
            )
        }
    ];

    const onSubmit = async (values) => {
        try {
            const answer = {
                content: values.answer,
                question: questionData._id
            };
            await answerService.create(answer);
            navigate("/");
        } catch (error) {
            const errors = {};
            if (error.response.data.error) {
                const { code } = error.response.data.error;
                if (code === 400) {
                    errors.password = "Posting not possible";
                }
                return errors;
            } else {
                return { [FORM_ERROR]: "Posting Failed" };
            }
        }
    };

    return (
        <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
            <CssBaseline />
            <Typography
                variant="subtitle1"
                align="left"
                color="white"
                fontSize="2rem"
                backgroundColor="blue">
                {questionData.subject.name} Цена: {questionData.price} RUB
                <hr size="30" />
            </Typography>
            <Typography
                variant="h5"
                color="primary"
                align="left">
                раздел науки: {questionData.title}
            </Typography>
            <Typography
                variant="overline"
                display="block"
                align="left"
            >
                <hr size="20" />
                <h6 className="text-success">Вопрос:</h6>
                <div>{questionData.content}</div>
            </Typography>
            {questionData.answer
                ? <div>
                    <Typography
                        variant="subtitle1"
                        align="left">
                        {questionData.answer.user.name}
                    </Typography>
                    {questionData.answer.content
                        ? <Typography
                            variant="subtitle1"
                            align="left">
                            {questionData.answer.content}
                        </Typography>
                        : <Typography
                            variant="subtitle1"
                            align="left">
                    Вы хотите купить ответ...
                        </Typography> // пока не работает!!!!!!!!!
                    }
                </div>
                : <span>{questionData.canAnswer
                    ? <Form
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
                                            Ответ
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </form>
                        )} />
                    : <Typography
                        variant="overline"
                        display="block"
                        color="red"
                        align="left">
                        <hr/>
                        <div>Извените, Вы не можете дать ответ, это не по Вашей специальности</div>
                    </Typography>}</span>

            }
        </div>
    );
};

export default CreateAndViewQuestionPage;
