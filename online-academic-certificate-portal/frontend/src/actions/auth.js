import axios from "axios";
import { toast } from 'react-toastify';
import * as actionTypes from './types';

export const create_chairman_user = ({ fullname, email, password, password2 }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ fullname, email, password, password2 })

    axios.post('http://localhost:8000/api/signup/chairman/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.REGISTER_CHAIRMAN_USER_SUCCESS,
                payload: res.data
            })
            toast.success("please confirm from your email")
        }).catch(err => {
            dispatch({
                type: actionTypes.REGISTER_CHAIRMAN_USER_FAILED
            })
            toast.error("something went wrong. please try agin")
        })

}

export const create_student_user = ({ fullname, email, password, password2 }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ fullname, email, password, password2 })
    console.log('inside')
    axios.post('http://localhost:8000/api/signup/student/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.REGISTER_STUDENT_USER_SUCCESS,
                payload: res.data
            })
            console.log(res.data)
        }).catch(err => {
            dispatch({
                type: actionTypes.REGISTER_STUDENT_USER_FAILED
            })
            console.log(err.response.data)
        })

}

export const forget_password = ({ email }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({ email })
    axios.post('http://localhost:8000/api/password_reset/', body, config)
        .then(response => {

            dispatch({
                type: actionTypes.PASSWORD_CHANGE_REQUEST_SUCCESS,
                payload: response.data
            })

            toast.success("enter the code sent to your email")

        }).catch(err => {

            dispatch({
                type: actionTypes.PASSWORD_CHANGE_REQUEST_FAILED
            })
            toast.error("please enter correct email address", err)
            console.log("i am here", err)
        })
}

export const forget_password_confirm = ({ token, password }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({ token, password })
    axios.post('http://localhost:8000/api/password_reset/confirm/', body, config)
        .then(response => {
            dispatch({
                type: actionTypes.PASSWORD_CHANGE_CONFIRM_REQUEST_SUCCESS,
                payload: response.data
            })
            toast.success("successfully changed the password")
        }).catch(err => {
            dispatch({
                type: actionTypes.PASSWORD_CHANGE_CONFIRM_REQUEST_FAILED
            })
            toast.error("Token is not correct", err)
        })
}

export const email_change = ({ oldEmail, newEmail }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }
    const body = JSON.stringify({ 'oldEmail': oldEmail, 'newEmail': newEmail })
    axios.post('http://localhost:8000/api/emailchange/', body, config)
        .then(response => {
            dispatch({
                type: actionTypes.EMAIL_CHANGE_REQUEST_SUCCESS
            })
            toast.success("please confirm from your new email address")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.EMAIL_CHANGE_REQUEST_FAILED
            })
            toast.error("something went wrong")
        })
}


export const login = ({ email, password }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({ email, password })
    console.log(body)
    axios.post('http://localhost:8000/api/login/', body, config)
        .then(response => {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: response.data
            })
            toast.success("login success")
        }).catch(err => {
            dispatch({
                type: actionTypes.LOGIN_FAILED
            })
            toast.error("login failed")
        })

}

export const check_continuous_auth = () => (dispatch) => {
    const token = localStorage.getItem("token")
    if (!token) {
        dispatch(logout)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }
    axios.get('http://localhost:8000/api/checkauth/', config)
        .then(response => {
            dispatch({
                type: actionTypes.CONTINUOUS_USER_AUTH_SUCCESS,
                payload: response.data
            })
        }).catch(err => {
            dispatch({
                type: actionTypes.CONTINUOUS_USER_AUTH_FAILED
            })
        })
}

export const logout = () => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    localStorage.removeItem("token")
    dispatch({ type: actionTypes.AUTH_LOGOUT })
    toast.success("logout success")
}

// provisional certificates actions

export const chairman_accept_provisional = (email) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email })
    console.log(body)
    axios.post('http://localhost:8000/api/chairman-accept-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully accepted")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

export const chairman_reject_provisional = (email, message) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'message': message })
    console.log(body)
    axios.post('http://localhost:8000/api/chairman-reject-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully rejected")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}