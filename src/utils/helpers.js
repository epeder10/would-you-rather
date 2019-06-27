export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestions (questions, user, authedUser) {
  const { id, name, avatarURL, answers, userQuestions } = user
  var answeredQuestions = []
  var unanserwedQuestions = []

  questions.map((id) => (
    answeredQuestions.append(questions[id])
  ))

  return {
    name,
    id,
    avatar: avatarURL,
    answeredQuestions: answeredQuestions,
    userQuestions: unanserwedQuestions
  }
}