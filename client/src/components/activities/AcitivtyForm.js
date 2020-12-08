import React, { useState, useContext, useEffect } from 'react';
import ActivityContext from '../../context/activity/activityContext';

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
					numberOfDucks: ''
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
		numberOfDucks: ''
	});
	const { food, foodQuantity, country, foodType, numberOfDucks } = activity;
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
				placeholder='Enter no.of.ducks i.e., 5'
				name='numberOfDucks'
				value={numberOfDucks}
				onChange={onChangeHandler}
			/>
			<input
				type='text'
				placeholder='Enter food i.e., Lettuce, Oats'
				name='food'
				value={food}
				onChange={onChangeHandler}
			/>
			<input
				type='text'
				placeholder='Enter quantity i.e., 5lbs'
				name='foodQuantity'
				value={foodQuantity}
				onChange={onChangeHandler}
			/>
			<input
				type='text'
				placeholder='Enter country i.e., CA, US'
				name='country'
				value={country}
				onChange={onChangeHandler}
			/>
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
