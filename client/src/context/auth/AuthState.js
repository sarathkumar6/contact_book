import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import _ from 'lodash';
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';
import setAuthToken from '../../utils/setAuthToken.js';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
		type: null
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = async () => {
		//ToDo: load token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			const response = await axios.get('api/auth');
			console.log(response);
			dispatch({ type: USER_LOADED, payload: response.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// Register User
	const register = async (registerInfo) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.post('/api/clients', registerInfo, config);
			console.log(response);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.data
			});
			loadUser();
		} catch (err) {
			console.log(err);
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.message
			});
		}
	};
	// Login User
	const loginUser = async (logininfo) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.post('/api/auth', logininfo, config);
			config.headers['x-auth-token'] = response.data.token;
			const getUserType = await axios.get('/api/auth', config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: _.merge(response.data, { type: getUserType.data.type })
			});
			loadUser();
		} catch (err) {
			console.log(err);
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.message
			});
		}
	};

	// Logout User
	const logoutUser = () => {
		dispatch({ type: LOGOUT });
	};

	// Clear Errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				loginUser,
				logoutUser,
				clearErrors
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
