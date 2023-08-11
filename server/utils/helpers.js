const Subject = require("../models/Subject");
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateUserData() {
    return {
        rate: getRandomInt(1, 5),
        completedMeetings: getRandomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`,
    };
}

function enrichUserData(user) {
    try { // doc это специальный синтаксис для получения данных через mongooss из базы данных
        if (!user._doc.subjects || user._doc.subjects.length === 0) {
            delete user._doc.subjects;
            user._doc.isTeacher = false;
            user._doc.isStudent = true;
        } else {
            user._doc.isTeacher = true;
            user._doc.isStudent = false;
        }
    } catch (e) {
        console.log(e);
    }
    return user;
}
// функция для Subject переформатирует из массива со сточными айди в массив объектов с айди
async function convertSubjectStringsToObjectId(subjects) {
    console.log("convert subjects ", subjects);
    if (subjects && subjects.length > 0) {
        const sj = [];

        await Promise.all(subjects.map(async (s) => {
            const sub = await Subject.findById(s);
            console.log("found subject", sub);
            if (sub) {
                sj.push(sub._id);
            }
        }));
        return sj;
    }
    return [];
}
module.exports = {
    generateUserData,
    convertSubjectStringsToObjectId,
    enrichUserData,
};
