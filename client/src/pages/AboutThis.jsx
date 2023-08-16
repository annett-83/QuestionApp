import * as React from "react";
import {
    CardContent,
    Typography
} from "@mui/material";

import AppLayersSVG from "../components/img/AppLayers.svg";
import RelationSVG from "../components/img/svgrelation.svg";

const AboutThis = () => {
    return (
        <React.Fragment>
            <CardContent>
                <Typography
                    color="white"
                    backgroundColor="blue"
                    sx={{ fontSize: 40 }}
                    gutterBottom
                    style={{ textAlign: "center" }}
                >
              Мой первый проект
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center" }}
                >
              Этот проект я реализовываю в собственных целях. Конечно это только
              начало, моей задумки. В планах у меня реализовать сайт учителя,
              который упростит и автоматизирует работу успешного и
              заинтересованного в своей профессии преподавателя.
                </Typography>
                <br />
                <Typography
                    sx={{ mb: 3, fontSize: 30 }}
                    color="white"
                    backgroundColor="green"
                    style={{ textAlign: "center" }}
                >
              Моя цель
                </Typography>
                <Typography
                    variant="body2"
                    style={{ textAlign: "center" }}
                    sx={{ fontSize: 20 }}
                >
              С учетом своего педагогического опыта создать образовательную
              платформу, которая будет универсальной и поможет не только
              учащимся получать и углублять знания в общении в свободное время,
              но и упростить работу педагога.
                    <hr />
              !Углуюлять свои умения в программирование.
                    <br />
                </Typography>
                <Typography
                    sx={{ mb: 3, fontSize: 20 }}
                    color="white"
                    backgroundColor="grey"
                    style={{ textAlign: "center" }}
                >
              Описание работы сайта на данном этапе
                </Typography>
                <Typography
                    variant="body2"
                    style={{ textAlign: "center" }}
                    sx={{ fontSize: 15 }}
                >
              На сайте регистрируются пользователи ( ученики и учителя). На главной странице отображаются все вопросы учеников, которые можно фильтровать по предмету, вопрос можно
              посмотреть перейдя по изображению-ссылке и ответить на него или вернуться обратно к
              списку.На сайте отображаются специалисты(учителя),
              которые на данный момент находятся онлайн, где можно также посмотреть их
              профиль.
              Ученикам предоставляется возможность задавать вопросы учителям разной
              сложности, за денежное вознаграждение по их усмотрению.
              Только те учителя могут отвечать на вопросы учеников, которые
              являются специалистами в той области в которой был задан вопрос и
              устраивает цена за труд. Мой проект был осуществлен с использованием следующих технологий:
                    <br/>
                    <img src={AppLayersSVG} alt="Layers" width={600} height={800} />
                    <br/>
                и соблюдались следующие типы связей:
                    <br />
                    <img src={RelationSVG} alt="Layers" width={600} height={500} />

                </Typography>
            </CardContent>
        </React.Fragment>
    );
};
export default AboutThis;
