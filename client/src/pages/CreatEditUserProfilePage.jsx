import { useEffect, useState, React } from "react";
import { Form } from "react-final-form";
import { TextField, Checkboxes, Select } from "mui-rff";
import userService from "../services/user.service";
import { FORM_ERROR } from "final-form";
import { useSelector, useDispatch } from "react-redux";
import { actions as storeActions } from "../store/sagas";
import { states as currentUserStates } from "../store/userSlice";
import _ from "lodash";
import {
    Typography,
    Paper,
    Grid,
    Button,
    CssBaseline,
    MenuItem
} from "@mui/material";

const CreatEditUserProfilePage = () => {
    const [formInitialValues, setFormInitialValues] = useState();
    const subjects = useSelector((state) => state.subject.data);
    const userData = useSelector(currentUserStates.currentUserData, _.isEqual);

    useEffect(() => {
        if (userData) {
            const tmpUserData = { ...userData };
            tmpUserData.isUserEditData = true;
            delete tmpUserData.password;
            if (tmpUserData.isTeacher) {
                tmpUserData.userType = "Teacher";
            } else {
                tmpUserData.userType = "Student";
            }
            setFormInitialValues(tmpUserData);
        }
    }, [userData]);

    const getSubjectData = () => {
        const data = [];
        if (subjects) {
            const sa = Object.values(subjects);

            // eslint-disable-next-line array-callback-return
            sa.map((s) => {
                data.push({ label: s.name, value: s._id });
            });
        }
        return data;
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Обязательно для заполнения";
        }
        if (!values.email) {
            errors.email = "Обязательно для заполнения";
        }
        if (!formInitialValues && !values.password) {
            errors.password = "Обязательно для заполнения";
        }
        if (!values.sex) {
            errors.sex = "Обязательно для заполнения";
        }
        if (!values.userType) {
            errors.userType = "Обязательно для заполнения";
        }
        if (
            values.userType &&
            values.userType === "Teacher" &&
            (!values.subjects || values.subjects.length < 1)
        ) {
            errors.subjects = "Required";
        }
        return errors;
    };

    const basicFormFields = [
        {
            size: 12,
            field: (
                <TextField label="ФИО" name="name" margin="none" required={true} />
            )
        },
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
            )
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
            )
        },

        {
            size: 12,
            field: (
                <Select
                    name="sex"
                    label="Выберите свой пол"
                    required={true}
                    formControlProps={{ margin: "none" }}
                    style={{ textAlign: "left" }}
                >
                    <MenuItem value="male">Мужской</MenuItem>
                    <MenuItem value="female">Женский</MenuItem>
                    <MenuItem value="other">Другое</MenuItem>
                </Select>
            )
        },

        {
            size: 12,
            field: (
                <Select
                    disabled={formInitialValues !== undefined}
                    name="userType"
                    label="Выберите свою профессию"
                    required={true}
                    formControlProps={{ margin: "none" }}
                    style={{ textAlign: "left" }}
                >
                    <MenuItem value="Student">Ученик</MenuItem>
                    <MenuItem value="Teacher">Учитель</MenuItem>
                </Select>
            )
        }
    ];

    const teacherFormFields = [
        {
            size: 12,
            field: (
                <Checkboxes
                    label="Ваш предмет"
                    name="subjects"
                    required={true}
                    formControlProps={{ margin: "none" }}
                    formGroupProps={{ row: false }}
                    data={getSubjectData()}
                    style={{ textAlign: "left" }}
                />
            )
        },
        {
            size: 12,
            field: (
                <TextField
                    name="notes"
                    multiline
                    label="Впишите свой предмет "
                    margin="none"
                />
            )
        }
    ];

    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        if (formInitialValues) {
            try {
                const res = await userService.updateUserData(values);
                console.log(res);
            } catch (error) {
                console.log(error);
                const errors = {};
                if (error.response.data.error) {
                    const { message } = error.response.data.error;
                    console.log(message);
                    return errors;
                } else {
                    return { [FORM_ERROR]: "Signup Failed" };
                }
            }
        } else {
            try {
                const { data } = await userService.create(values);
                dispatch(storeActions.currentuser_set_newToken(data));
            } catch (error) {
                const errors = {};
                if (error.response.data.error) {
                    const { code, message } = error.response.data.error;
                    console.log(message);
                    if (code === 400) {
                        errors.email = "Already in use";
                    }
                    return errors;
                } else {
                    return { [FORM_ERROR]: "Signup Failed" };
                }
            }
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
                {formInitialValues
                    ? (
                        <span>edit your profile</span>
                    )
                    : (
                        <span>Запоните форму регистрации</span>
                    )}
            </Typography>
            <Form
                onSubmit={onSubmit}
                initialValues={formInitialValues}
                validate={validate}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                    submitError,
                    dirtyFieldsSinceLastSubmit
                }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        {submitError &&
                Object.values(dirtyFieldsSinceLastSubmit).filter((x) => x)
                    .length === 0 && (
                            <div className="alert alert-danger">{submitError}</div>
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

                                {values.userType &&
                    values.userType === "Teacher" &&
                    teacherFormFields.map((item, idx) => (
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
                        {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                    </form>
                )}
            />
        </div>
    );
};

export default CreatEditUserProfilePage;
