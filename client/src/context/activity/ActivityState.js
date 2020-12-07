import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ActivityContext from './activityContext';
import activityReducer from './activityReducer';
import axios from 'axios';
import {
	ADD_ACTIVITY,
	DELETE_ACTIVITY,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_ACTIVITY,
	FILTER_ACTIVITIES,
	CLEAR_FILTER,
	ACTIVITY_ERROR,
	DELETE_ERROR,
	GET_ACTIVITIES,
	CLEAR_ACTIVITIES
} from '../types';

const ActivityState = (props) => {
	const initialState = {
		activities: null,
		current: null,
		filtered: null,
		error: null
	};

	const [ state, dispatch ] = useReducer(activityReducer, initialState);

	// GET ACTIVITIES
	const getActivities = async () => {
		try {
			const response = await axios.get('/api/clients/activities');
			dispatch({ type: GET_ACTIVITIES, payload: response.data });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// Add Activity
	const addActivity = async (activity) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.post('/api/clients/activities', activity, config);
			dispatch({ type: ADD_ACTIVITY, payload: response.data });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// Update Activity
	const updateActivity = async (activity) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.put(`/api/clients/activities/${activity.id}`, activity, config);
			dispatch({ type: UPDATE_ACTIVITY, payload: response.data });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// Delete Contact
	const deleteActivity = async (id) => {
		try {
			const response = await axios.delete(`/api/clients/activities/${id}`);
			dispatch({ type: DELETE_ACTIVITY, payload: id });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// Set Current Activity
	const setCurrent = (activity) => {
		dispatch({ type: SET_CURRENT, payload: activity });
	};

	// Clear Current Activity
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter Activities
	const filterActivities = (text) => {
		dispatch({ type: FILTER_ACTIVITIES, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	const clearActivities = () => {
		dispatch({ type: CLEAR_ACTIVITIES });
	};

	return (
		<ActivityContext.Provider
			value={{
				activities: state.activities,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addActivity,
				deleteActivity,
				setCurrent,
				clearCurrent,
				updateActivity,
				filterActivities,
				clearFilter,
				getActivities,
				clearActivities
			}}>
			{props.children}
		</ActivityContext.Provider>
	);
};

export default ActivityState;
