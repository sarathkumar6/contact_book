import {
	ADD_ACTIVITY,
	DELETE_ACTIVITY,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_ACTIVITY,
	FILTER_ACTIVITIES,
	CLEAR_FILTER,
	ACTIVITY_ERROR,
	GET_ACTIVITIES,
	CLEAR_ACTIVITIES
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_ACTIVITY:
			return {
				...state,
				activities: [ ...state.activities, action.payload ]
			};
		case DELETE_ACTIVITY:
			return {
				...state,
				activities: state.activities.filter((activity) => activity._id !== action.payload),
				loading: false
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case UPDATE_ACTIVITY:
			return {
				...state,
				activities: state.activities.map(
					(activity) => (activity._id === action.payload._id ? action.payload : activity)
				),
				loading: false
			};
		case FILTER_ACTIVITIES:
			return {
				...state,
				filtered: state.activities.filter((activity) => {
					const regex = new RegExp(`${action.payload}`, 'gi'); // global case insensitive
					return activity.name.match(regex) || activity.email.match(regex);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case ACTIVITY_ERROR:
			return {
				...state,
				error: action.payload
			};
		case GET_ACTIVITIES:
			return {
				...state,
				activities: action.payload,
				loading: false
			};
		case CLEAR_ACTIVITIES:
			return {
				...state,
				activities: null,
				error: null,
				current: null,
				filteres: null,
				loading: false
			};
		default:
			return state;
	}
};
