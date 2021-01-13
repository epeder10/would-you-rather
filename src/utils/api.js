
export function getInitialData () {
  return Promise.all([
    getUsers(),
    getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}
export function getQuestions() {
  return getQuestionsApi();
}

export function getUsers() {
    return getUsersApi();
}
export async function getQuestionsApi() {
  const response = await fetch('/questions');
  const jsonData = response.json();
  return jsonData
}

export async function getUsersApi() {
    const response = await fetch('/users');
    const jsonData = response.json();
    return jsonData
}

export async function saveQuestion(data) {
  console.log(data);
  const question = formatQuestion(data);
  console.log(question);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question)
  };  
  console.log(requestOptions);

  const response = await fetch('/questions', requestOptions);
  const jsonData = response.json();
  return jsonData
}

export async function saveQuestionAnswer(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  };  

  const response = await fetch('/answer', requestOptions);
  const jsonData = response.json();
  return jsonData
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}