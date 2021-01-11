
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
  const question = formatQuestion(data);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: question
  };  

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

  const response = await fetch('/answers', requestOptions);
  const jsonData = response.json();
  return jsonData
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
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