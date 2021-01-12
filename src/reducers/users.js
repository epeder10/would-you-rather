import { RECEIVE_USERS, UPDATE_USER_ANSWERS, UPDATE_USER_CREATED } from '../actions/users'

const initial_state = [{"johndoe":{"answers":{},"avatarURL":"../../images/leaf.jpg","id":"johndoe","name":"John Doe","questions":["5636645067948032"]}}]

export default function users(state = initial_state, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case UPDATE_USER_ANSWERS:
      const { authedUser, qid, answer } = action.info

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case UPDATE_USER_CREATED:
      const { question } = action.info

      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id])
        }
      }

    default:
      return state
  }
}