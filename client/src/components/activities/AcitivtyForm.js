import React, { useState, useContext, useEffect } from 'react';
import ActivityContext from '../../context/activity/activityContext';
import moment from 'moment';

const ActivityForm = () => {
	const activityContext = useContext(ActivityContext);
	const { addActivity, current, clearCurrent, updateActivity } = activityContext;

	useEffect(
		() => {
			if (current) {
				setActivity(current);
			} else {
				setActivity({
					food: '',
					foodQuantity: '',
					country: '',
					foodType: 'veggies',
					date: ''
				});
			}
		},
		[ activityContext, current ]
	); // only want to happen during contactContext and current

	const [ activity, setActivity ] = useState({
		food: '',
		foodQuantity: '',
		country: '',
		foodType: 'veggies',
		date: ''
	});
	const { food, foodQuantity, country, foodType, date } = activity;
	const onChangeHandler = (e) => {
		setActivity({ ...activity, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (!current) {
			addActivity(activity);
		} else {
			updateActivity(activity);
			clearCurrent();
		}
	};

	const clearAll = () => {
		clearCurrent();
	};
	return (
		<form onSubmit={onSubmitHandler}>
			<h2 className='text-primary'> {current ? 'Edit Activity' : 'Add Activity'}</h2>
			<input
				type='text'
				placeholder='Food i.e., Lettuce, Oats'
				name='food'
				value={food}
				onChange={onChangeHandler}
			/>
			<input
				type='text'
				placeholder='Quantity in lbs'
				name='foodQuantity'
				value={foodQuantity}
				onChange={onChangeHandler}
			/>
			<input type='text' placeholder='Enter Country' name='country' value={country} onChange={onChangeHandler} />
			<input
				type='text'
				placeholder='Date and time'
				name='date'
				value={date && moment(date).format('MMM Do YYYY, h:mm:ss A')}
				onChange={onChangeHandler}
			/>
			<h5>Food Type</h5>
			<input
				type='radio'
				name='foodType'
				value='veggies'
				checked={foodType === 'veggies'}
				onChange={onChangeHandler}
			/>
			Veggies {''}
			<input
				type='radio'
				name='foodType'
				value='grains'
				checked={foodType === 'grains'}
				onChange={onChangeHandler}
			/>Grains {''}
			<div>
				<input
					type='submit'
					value={current ? 'Update Activity' : 'Add Activity'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ActivityForm;
