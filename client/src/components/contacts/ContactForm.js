import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const { addContact, current, clearCurrent, updateContact } = contactContext;

	useEffect(
		() => {
			if (current) {
				setContact(current);
			} else {
				setContact({
					name: '',
					phone: '',
					email: '',
					type: 'personal'
				});
			}
		},
		[ contactContext, current ]
	); // only want to happen during contactContext and current

	const [ contact, setContact ] = useState({
		name: '',
		phone: '',
		email: '',
		type: 'personal'
	});
	const { name, type, email, phone } = contact;
	const onChangeHandler = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (!current) {
			addContact(contact);
		} else {
			updateContact(contact);
			clearCurrent();
		}
	};

	const clearAll = () => {
		clearCurrent();
	};
	return (
		<form onSubmit={onSubmitHandler}>
			<h2 className='text-primary'> {current ? 'Edit Contact' : 'Add Contact'}</h2>
			<input type='text' placeholder='Enter Name' name='name' value={name} onChange={onChangeHandler} />
			<input
				type='email'
				placeholder='Enter Contact Email'
				name='email'
				value={email}
				onChange={onChangeHandler}
			/>
			<input
				type='text'
				placeholder='Enter Contact Phone'
				name='phone'
				value={phone}
				onChange={onChangeHandler}
			/>
			<h5>Contact Type</h5>
			<input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChangeHandler} />
			Personal {''}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChangeHandler}
			/>Professional {''}
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
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

export default ContactForm;
