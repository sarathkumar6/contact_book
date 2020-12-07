import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ActivityContext from '../../context/activity/activityContext';

const ActivityItem = ({
	id,
	clientName,
	food,
	foodQuantity,
	foodType,
	numberOfDucks,
	country,
	date,
	displayEditAndDelete
}) => {
	const activityContext = useContext(ActivityContext);
	const { deleteActivity, setCurrent, clearCurrent } = activityContext;
	const onDeleteHandler = () => {
		deleteActivity(id);
		clearCurrent();
	};
	const onEditHandler = () => {
		setCurrent({ id, clientName, food, foodQuantity, foodType, numberOfDucks, date, country });
	};
	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{clientName} <i className='fas fa-globe' /> {country}
				<span
					style={{ float: 'right' }}
					className={'badge ' + (foodType === 'veggies' ? 'badge-success' : 'badge-primary')}>
					{foodType && foodType.charAt(0).toUpperCase() + foodType.slice(1)}
				</span>
			</h3>
			<ul className='list'>
				{food && (
					<li>
						<i className='far fa-bread-slice' /> {food && food.charAt(0).toUpperCase() + food.slice(1)}
					</li>
				)}
				{date && (
					<li>
						<i className='far fa-calendar-week' /> {moment(date).format('MMM Do YYYY, h:mm:ss A')}
					</li>
				)}
				{foodQuantity && (
					<li>
						<i className='fas fa-weight' /> {`${foodQuantity} lb`}
					</li>
				)}
			</ul>
			{displayEditAndDelete && (
				<p>
					<button className='btn btn-dark btn-sm' onClick={onEditHandler}>
						Edit
					</button>
					<button className='btn btn-danger btn-sm' onClick={onDeleteHandler}>
						Delete
					</button>
				</p>
			)}
		</div>
	);
};

ActivityItem.propTypes = {
	id: PropTypes.string.isRequired,
	clientName: PropTypes.string.isRequired,
	food: PropTypes.string.isRequired,
	foodQuantity: PropTypes.number.isRequired,
	foodType: PropTypes.string.isRequired
};

export default ActivityItem;
