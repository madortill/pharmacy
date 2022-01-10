arr_quiz_1 = [
    {
        question: "מה חייב להימצא בחדר המתנה?",
        correct_answer: `ספסלים, פחים, לוח מודעות, שילוט המורה על "איסור עישון" ואמצעי הגנה מפגעי מזג האוויר.`,
        wrong_answer: [`מזגן, פחים, טלוויזיה, שילוט המורה על "איסור עישון" ואמצעי הגנה מפגעי מזג האוויר.` ,`ספסלים, פחים, טלוויזיה, שילוט המורה על "איסור עישון" ואמצעי הגנה מפגעי מזג האוויר.`]
    }, 
    
]

let finish_question_counter = 0;
let life_question_counter = 0;
const ANSWER_NUM = 4;
// setting timer
type_quiz = () => {
    // take random question from array
    let question_array = window[`arr_quiz_${nRoom}`];
    let question_num = Math.floor(Math.random() * window[`arr_quiz_${nRoom}`].length);
    let correct_answer = Math.floor(Math.random() * ANSWER_NUM) + 1;
    $(`#${matrix[nRoom][nPage].divName} .questions`).text(question_array[question_num].question);
    // question won't repeat
    question_array.splice(question_num, 1);
    // fill answers
    for (let i = 1; i <= ANSWER_NUM; i++) {
        if (i === correct_answer) {
            $(`#${matrix[nRoom][nPage].divName} .answer.data-num-${i}`).text(question_array[question_num].correct_answer);
        } else {
            let wrong_answer = Math.floor(Math.random() * (ANSWER_NUM - 1))
            $(`#${matrix[nRoom][nPage].divName} .answer.data-num-${i}`).text(question_array[question_num].wrong_answer[wrong_answer]);
            question_array.splice(question_num, 1);
            window[question_array[question_num].wrong_answer].splice(wrong_answer, 1);
        }
    }
  }