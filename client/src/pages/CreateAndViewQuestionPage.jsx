import React from "react";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { FORM_ERROR } from "final-form";
import _ from "lodash";
import { TextField } from "mui-rff";

import { ColorRing } from "../../node_modules/react-loader-spinner/dist/index";
import answerService from "../services/answerService";
import questionService from "../services/questionService";
import { states as currentUserStates } from "../store/userSlice";

const CreateAndViewQuestionPage = () => {
    const params = useParams();
    const { questionId } = params; // react-router url

    const navigate = useNavigate();
    const userData = useSelector(currentUserStates.currentUserData, _.isEqual);

    const selectFilteredQuestions = createSelector(
        (state) => state.user.data.questionData,
        (questionArray) => questionArray.find((q) => q._id === questionId)
    );// обновляет (render) добовляет ответ 
    const questionData = useSelector(selectFilteredQuestions);

    const validate = (values) => {
        const errors = {};
        if (!values.answer) {
            errors.answer = "Поле должно быть заполнено.";
        } else {
            if (values.answer.length < 10) {
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

    const onDelete = async (questionId)=>{
        navigate("/");
        try {
            questionService.remove(questionId);
 
        } catch(e) {console.log(e);}
    };

    if (userData && questionData) {
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
                            {userData.isTeacher?  <div>Извените, Вы не можете дать ответ, это не по Вашей специальности</div> :<div>пока нет ответа</div> }
                    

                        </Typography>}</span>

                }
                {questionData.canDelete?  <Button
                    variant="overline"
                    display="block"
                    onClick={()=>onDelete(questionData._id)}

                >
                                            delete
                </Button>:<span></span>}
            </div>
        );
    } else {<ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />;}



};

export default CreateAndViewQuestionPage;
