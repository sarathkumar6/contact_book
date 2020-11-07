import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
	const { setAlert } = useContext(AlertContext);
	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { register, error, clearErrors, isAuthenticated } = useContext(AuthContext);

	useEffect(
		() => {
			console.log(error);
			if (isAuthenticated) {
				props.history.push('/');
			}
			if (error) {
				setAlert(error, 'danger');
				clearErrors();
			}
			/**{
				error &&
					error.length > 0 &&
					error.map((eachErr) => {
						setAlert(eachErr.msg, 'danger');
					});
			}
			clearErrors();*/
			//eslint-disable-next-line
		},
		[ error, isAuthenticated, props.history ]
	);
	const onChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Password donot match', 'danger');
		} else {
			console.log('Register Submit');
			register({ name, email, password });
		}
	};
	const { name, email, password, password2 } = user;
	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			<form onSubmit={onSubmitHandler}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' value={name} onChange={onChangeHandler} required />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input type='email' name='email' value={email} onChange={onChangeHandler} required />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChangeHandler}
						required
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='password'
						name='password2'
						value={password2}
						onChange={onChangeHandler}
						required
						minLength='6'
					/>
				</div>
				<input type='submit' value='Register' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default Register;
