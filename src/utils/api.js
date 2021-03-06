
export function getInitialData() {
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

export async function addUser(data) {
  const user = formatUser(data);
  console.log(user);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  const response = await fetch('/users', requestOptions);
  const jsonData = response.json();
  return jsonData
}

export async function saveQuestionAnswer(data) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  const response = await fetch('/answer', requestOptions);
  const jsonData = response.json();
  return jsonData
}

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatUser({email, name, displayName}) {
  return { 
    email: { 
      "answers": {}, 
      "avatarURL": "../../images/leaf.jpg", 
      "id": displayName, 
      "name": name, 
      "questions": [] 
    } 
  }
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
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