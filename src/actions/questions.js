import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { updateUserAnswers, updatedUserCreated } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionA, optionB, author) {
  return (dispatch, getState) => {
    dispatch(showLoading())

    return saveQuestion({
      optionOneText: optionA,
      optionTwoText: optionB,
      author
    })
      .then((question) => dispatch(addQuestion(question)))
      .then((question) => dispatch(updatedUserCreated(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function answerQuestions(info) {
  return {
    type: ANSWER_QUESTION,
    info,
  }
}

export function handleAnswerQuestion (info) {
  return (dispatch, getState) => {
    dispatch(showLoading())

    return saveQuestionAnswer(info)
      .then(() => dispatch(answerQuestions(info)))
      .then(() => dispatch(updateUserAnswers(info)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}