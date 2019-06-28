import { RECEIVE_USERS, UPDATE_USER_ANSWERS } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case UPDATE_USER_ANSWERS :
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
    default :
      return state
  }
}