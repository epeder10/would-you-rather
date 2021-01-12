import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

const initialstate = {"5636645067948032":{"author":"johndoe","id":"5636645067948032","optionOne":{"text":"have horrible short term memory","votes":""},"optionTwo":{"text":"have horrible long term memory","votes":""},"timestamp":"2021-01-11 16:05:00+00:00"}}

export default function questions (state = initialstate, action) {
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
      }
    default :
      return state
  }
}