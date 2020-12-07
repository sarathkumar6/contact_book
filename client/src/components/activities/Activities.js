import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ActivityContext from '../../context/activity/activityContext';
import ActivityItem from '../activities/ActivityItem';

const Activities = ({ displayEditAndDelete }) => {
	//const contactContext = useContext(ContactContext);
	const activityContext = useContext(ActivityContext);

	//const { filtered, contacts, getContacts } = contactContext;
	const { filtered, activities, getActivities } = activityContext;

	useEffect(() => {
		//getContacts();
		getActivities();
		//eslint-disable-next-line
	}, []);

	if (!activities) {
		return <h4>Pleae add a activity</h4>;
	} else {
		return (
			<Fragment>
				<TransitionGroup>
					<div className='title'>Activities</div>
					{activities.map((contact) => (
						<CSSTransition key={contact._id} timeout={500} classNames='item'>
							<ActivityItem
								clientName={contact.clientName}
								food={contact.food}
								foodQuantity={contact.foodQuantity}
								id={contact._id}
								foodType={contact.foodType}
								country={contact.country}
								date={contact.date}
								numberOfDucks={contact.numberOfDucks}
								displayEditAndDelete={displayEditAndDelete}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</Fragment>
		);
	}
};
export default Activities;
