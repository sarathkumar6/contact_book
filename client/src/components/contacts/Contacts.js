import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from '../contacts/ContactItem';

const Contacts = (props) => {
	const contactContext = useContext(ContactContext);

	const { filtered, contacts } = contactContext;

	!contacts && <h4>Pleae add a contact</h4>;

	return (
		<Fragment>
			<TransitionGroup>
				{filtered ? (
					filtered.map((contact) => (
						<CSSTransition key={contact.id} timeout={500} classNames='item'>
							<ContactItem
								phone={contact.phone}
								type={contact.type}
								email={contact.email}
								id={contact.id}
								name={contact.name}
							/>
						</CSSTransition>
					))
				) : (
					contacts.map((contact) => (
						<CSSTransition key={contact.id} timeout={500} classNames='item'>
							<ContactItem
								phone={contact.phone}
								type={contact.type}
								email={contact.email}
								id={contact.id}
								name={contact.name}
							/>
						</CSSTransition>
					))
				)}
			</TransitionGroup>
		</Fragment>
	);
};
export default Contacts;
