import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function answerQuestion (authedUser, id, answer) {
    return {
        type: ANSWER_QUESTION,
        authedUser, id, answer
    }
}

export function handleAddQuestion (optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        return _saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
        .then( (question) => 
            dispatch(addQuestion(question))
        )
        .catch( error => {
            console.warn('Error in handleAddQuestion', error);
            alert('Error while saving the question')
        })
        .then(() => dispatch(hideLoading()))

    }
}

export function handleAnswerQuestion (authedUser, id, answer) {
    return (dispatch) => {

        dispatch(showLoading())
        dispatch(answerQuestion(authedUser, id, answer))
        return _saveQuestionAnswer({
            authedUser,
            qid: id,
            answer
        })
/*         .then( ({authedUser, id, answer}) => 
            dispatch(answerQuestion({authedUser, id, answer}))
        ) */
        .catch( error => {
            console.warn('Error in handleAnswerQuestion', error);
            alert('Error while answering the question')
        })
        .then(() => dispatch(hideLoading()))

    }
}