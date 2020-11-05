import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ id, name, email, type, phone }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;
	const onDeleteHandler = () => {
		deleteContact(id);
		clearCurrent();
	};
	const onEditHandler = () => {
		setCurrent({ id, name, email, type, phone });
	};
	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className='list'>
				{email && (
					<li>
						<i className='fas fa-envelope-open' /> {email}
					</li>
				)}
				{phone && (
					<li>
						<i className='fas fa-phone' /> {phone}
					</li>
				)}
			</ul>
			<p>
				<button className='btn btn-dark btn-sm' onClick={onEditHandler}>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDeleteHandler}>
					Delete
				</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default ContactItem;
