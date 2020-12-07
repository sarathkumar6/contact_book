import React, { Fragment, useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import Activities from '../activities/Activities';
import ContactForm from '../contacts/ContactForm';
import ActivityForm from '../activities/AcitivtyForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	useEffect(() => {
		authContext.loadUser();
		//eslint-disable-next-line
	}, []);
	return (
		<div className='grid-3'>
			<div>{/* Contact Form */}</div>
			<div>
				{user && user.type === 'farmer' ? (
					<div>
						<ActivityForm />
						<Activities displayEditAndDelete={true} />
					</div>
				) : (
					<Fragment>
						<Activities displayEditAndDelete={false} />
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Home;
