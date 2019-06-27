import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

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
      .then(() => dispatch(hideLoading()))
  }
}


export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function toggleQuestion ({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_QUESTION,
    id,
    authedUser,
    hasLiked
  }
}

/*
export function handleToggleQuestion (info) {
  return (dispatch) => {
    dispatch(toggleQuestion(info))

    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleQuestion: ', e)
        dispatch(toggleQuestion(info))
        alert('The was an error liking the question. Try again.')
      })
  }
}
*/