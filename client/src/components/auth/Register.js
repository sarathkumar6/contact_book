import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
	const { setAlert } = useContext(AlertContext);
	const [ client, setClient ] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		type: 'farmer'
	});

	const { register, error, clearErrors, isAuthenticated } = useContext(AuthContext);

	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push('/');
			}
			if (error) {
				setAlert(error, 'danger');
				clearErrors();
			}
		},
		[ error, isAuthenticated, props.history ]
	);
	const onChangeHandler = (e) => {
		setClient({ ...client, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Password donot match', 'danger');
		} else {
			console.log('Register Submit');
			register({ name, email, password, type });
		}
	};
	const { name, email, password, password2, type } = client;
	return (
		<div className='form-container'>
			<h1>
				Client <span className='text-primary'>Register</span>
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
				<input type='radio' name='type' value='farmer' checked={type === 'farmer'} onChange={onChangeHandler} />
				Farmer {''}
				<input
					type='radio'
					name='type'
					value='scientist'
					checked={type === 'scientist'}
					onChange={onChangeHandler}
				/>Scientist {''}
				<input type='submit' value='Register' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default Register;
