import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ActivityContext from '../../context/activity/activityContext';
import ContactItem from '../contacts/ContactItem';

const Contacts = (props) => {
	const contactContext = useContext(ContactContext);
	//const activityContext = useContext(ActivityContext);

	const { filtered, contacts, getContacts } = contactContext;
	//const { activities, getActivities } = activityContext;

	useEffect(() => {
		getContacts();
		//getActivities();
		//eslint-disable-next-line
	}, []);

	if (!contacts) {
		return <h4>Pleae add a contact</h4>;
	} else {
		return (
			<Fragment>
				<TransitionGroup>
					{filtered ? (
						filtered.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames='item'>
								<ContactItem
									phone={contact.phone}
									type={contact.type}
									email={contact.email}
									id={contact._id}
									name={contact.name}
								/>
							</CSSTransition>
						))
					) : (
						contacts.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames='item'>
								<ContactItem
									phone={contact.phone}
									type={contact.type}
									email={contact.email}
									id={contact._id}
									name={contact.name}
								/>
							</CSSTransition>
						))
					)}
				</TransitionGroup>
			</Fragment>
		);
	}
};
export default Contacts;
