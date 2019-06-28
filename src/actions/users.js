export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS'
export const UPDATE_USER_CREATED = 'UPDATE_USER_CREATED'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function updateUserAnswers (info) {
  return {
    type: UPDATE_USER_ANSWERS,
    info,
  }
}

export function updatedUserCreated (info) {
  return {
    type: UPDATE_USER_CREATED,
    info
  }
}