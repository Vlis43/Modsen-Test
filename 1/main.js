const questions = [
	{
		question: "What is the longest river in the world?",
		answers: ["Yangtze", "Amazon", "Nile"],
		correct: 2,
	},	
	{
		question: "What is the capital of Canada?",
		answers: ["Ottawa", "Toronto", "Vancouver"],
		correct: 1,
	},
	{
		question: "How many planets are in the solar system?",
		answers: ["6", "7", "8", "9", "10", "11"],
		correct: 3,
	},
	{
		question: "Which of these characters are friends with Harry Potter?",
		answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
		correct: 3,
	},
];

// local storage, кнопка заного, изменение цвета
// Находим элементы
const questionContainer = document.querySelector('#list');
const paceContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные опроса
let score = 0; // Баллы за ответы
let questionIndex = 0; // Нынешний вопрос
let questionTemp = 0; // Вопрос из всего вопросов

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	paceContainer.innerHTML = '';
	questionContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion(){
	// Темп вопросов
	questionTemp += 1;
	let pace = `Questions ${questionTemp} out of ${questions.length}`;
	const questionPace = `</h1 class="summary">%pace%</h1>`;
	const paceHTML = questionPace.replace('%pace%', pace);
	paceContainer.innerHTML = paceHTML;

	// Вопрос 
	const headerTemplate = `<h2 class="title">%summary%</h2>`;
	const title = headerTemplate.replace('%summary%', questions[questionIndex]['question']);
	questionContainer.innerHTML = title;

	// Варианты ответов
	let answerNumber = 1;
	for(answerText of questions[questionIndex]['answers']){
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		const answerHTML = questionTemplate
										.replace('%answer%', answerText)
										.replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer(){
	// Нахождение выбранной кнопки
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	// Выход из функции, если не выбран ответ
	if(!checkedRadio){ 
		submitBtn.blur();
		return;
	}

	// Номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);

	// Увелечение счета при правильном ответе
	if(userAnswer === questions[questionIndex]['correct']) {
		score++;
		// document.querySelector('input[type=radio]:checked').nextElementSibling.style.backgroundColor = 'green';
	} else {
		// document.querySelector('input[type=radio]:checked').nextElementSibling.style.backgroundColor = 'red';
	}

	if(questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
	} 
	else {
		clearPage();
		showResults();
	}

}

function showResults(){
	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
	`;

	title = 'Благодарим за прохождение опроса'
	message = 'Ваш результат:'
	// Результат
	let result = `${score} из ${questions.length}`;

	// Финальный ответ
	const finalMassage = resultsTemplate
										.replace('%title%', title)
										.replace('%message%', message)
										.replace('%result%', result);

	questionContainer.innerHTML = finalMassage;

	// Пройти опрос заново
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => {
		history.go();
	}
}