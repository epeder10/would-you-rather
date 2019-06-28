import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION :
      const { authedUser, qid, answer } = action.info

      return {
        ...state,
        [qid]: {
          ...state[qid],
              [answer]: {
                ...state[qid][answer],
                votes: state[qid][answer].votes.concat([authedUser])
              }
        }
      }
    case ADD_QUESTION :
      const { question } = action

      // TODO: Add to user questions
      return {
        ...state,
        [question.id]: question,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id])
        }
      }
    default :
      return state
  }
}