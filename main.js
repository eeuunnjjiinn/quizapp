const quizQuestions = [
    { question: "'고것을 포도~시 삼켜부렀당께?'에서 포도~시의 뜻으로 적절한것은?",
        options: ["맛있게", "간신히", "한번에", "조금씩"],
        answer: 1 },
    { question: "전라도 사투리로 올바르게 발음한 것이 아닌 것은?",
        options: ["육학년 - 유강년", "곱하기 - 고바기", "못해 - 모대", "머리카락 - 멀꾸락"],
        answer: 3 },
    { question: "'아따. 야, 있냐~ 니 친구 참말로 귄있게 생겨브렀다잉~' 에서 '귄있게'의 의미로 적절한 것은?",
        options: ["고약하게", "고상하게", "건강하게", "매력있게"],
        answer: 3 },
    { question: "'저 집 아들은 어른들헌티 인사도 안 허고 느자구없어' 에서 '느자구없어'의 의미로 적절한 것은?",
        options: ["어이가 없다.", "고집이 없다.", "책임감이 없다.", "싸가지가 없다."],
        answer: 3 },
    { question: "다음 중 좋아하는 마음을 전라도 사투리로 올바르게 표현한 것은?",
        options: ["내니 사랑혀", "느 좋아허맨", "나 너 좋아해", "니가 오살나게 좋아브러"],
        answer: 3 },
    { question: "전라도 사투리와 뜻이 올바르지않은 것은?",
        options: ["하나씨 - 할아버지", "뽀짝 - 귀여운", "복성 - 복숭아", "괭일 - 일요일"],
        answer: 1 },
    { question: "전라도 사투리와 뜻이 올바르지 않은 것은?",
        options: ["새앙치 - 양파", "가생이 - 가장자리", "반괭일 - 토요일", "강생이 - 강아지"],
        answer: 0 },
    { question: "'몽니가 심하시오'의 의미로 적절한 것은?",
        options: ["이가 심하게 아픕니다.", "고집을 부립니다.", "이젠 모두 다 지긋지긋하다.", "이젠 정말 힘들다."],
        answer: 1 },
    { question: "전라도 사투리와 뜻이 올바르지 않은 것은?",
        options: ["시방 머라고라? - 너 지금 뭐라고 말했냐?", "아구지 막혀브러싸야 - 놀라서 말문이 막혔냐", "온몸 구녕이란 구녕은 다 둘릴 텬디 - 온몸 구멍이 다 뚫려서 막힌 입도 뚫린다.", "아직 팔구월 풍월 나 애가졌쏘 - 8~9개월 된 아기를 가졌다."],
        answer: 3 },
    { question: "전라도 지역이 아닌 것은?",
        options: ["광주", "전주", "여수", "고흥"],
        answer: 0 },
];

function getRandomQuestions(questions, num) {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let wrongAnswers = [];

function showQuestion(index) {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = '';

    if (index < selectedQuestions.length) {
        const question = selectedQuestions[index];
        const newQuiz = document.createElement('div');
        newQuiz.innerHTML = `
            <p>${question.question}</p>
            ${question.options.map((option, optionIndex) => `
                <input type="radio" id="q${index}o${optionIndex}" name="question${index}" value="${optionIndex}">
                <label for="q${index}o${optionIndex}">${option}</label><br>
            `).join('')}
            <br><br>
            <button onclick="submitAnswer()">다음</button>
        `;
        questionContainer.appendChild(newQuiz);
    } else {
        showResults();
    }
}

function submitAnswer() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
        const selectedAnswer = parseInt(selectedOption.value);
        if (selectedAnswer === selectedQuestions[currentQuestionIndex].answer) {
            score += 20;
        } else {
            wrongAnswers.push({
                question: selectedQuestions[currentQuestionIndex].question,
                correctAnswer: selectedQuestions[currentQuestionIndex].options[selectedQuestions[currentQuestionIndex].answer]
            });
        }
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        alert('답을 선택하세요!');
    }
}

function showResults() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = `
        <p>퀴즈 완료! 당신의 점수는 ${score}점 입니다.</p>
        ${wrongAnswers.length > 0 ? '<p>틀린 문제와 정답:</p>' : ''}
        ${wrongAnswers.map(wrongAnswer => `
            <p>${wrongAnswer.question} <br> 정답: ${wrongAnswer.correctAnswer}</p>
        `).join('')}
        <button onclick="restartQuiz()">처음으로 돌아가기</button>
    `;
}

function startQuiz() {
    selectedQuestions = getRandomQuestions(quizQuestions, 5);
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = [];
    showQuestion(currentQuestionIndex);
}

function restartQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '<button id="start-quiz" onclick="startQuiz()">퀴즈풀기</button>';
}

document.addEventListener('DOMContentLoaded', () => {
    restartQuiz();
});