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
        [authedUser]: {
          ...[authedUser],
          answers: {
            ...[authedUser].answers,
            [qid]: answer
          }
        },
        [qid]: {
          ...[qid],
              [answer]: {
                ...[qid][answer],
                votes: [qid][answer].votes.concat([authedUser])
              }
        }
      }
    case ADD_QUESTION :
      const { question } = action

      // TODO: Add to user questions
      return {
        ...state,
        [question.id]: question
      }
    default :
      return state
  }
}