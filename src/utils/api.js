import {
  _getQuestions,
  _getUsers,
  _saveQuestion
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function getQuestions (info) {
  return _getQuestions(info)
}

export function getUsers (info) {
  return _getUsers(info)
}

export function saveQuestion (info) {
  return _saveQuestion(info)
}