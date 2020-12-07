import React, { useRef, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
	const text = useRef('');
	const contactContext = useContext(ContactContext);
	const { filterContacts, clearFilter, filtered } = contactContext;

	useEffect(() => {
		if (!filtered) {
			text.current.value = '';
		}
	});

	const onChangeHandler = (e) => {
		if (text.current.value !== '') {
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};
	return (
		<form>
			<input ref={text} type='text' placeholder='Filter Contacts' onChange={onChangeHandler} />
		</form>
	);
};

export default ContactFilter;
