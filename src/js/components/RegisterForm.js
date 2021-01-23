import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { registerUser } from '../actions/auth'

import LoadingView from './shared/LoadingView'
import { Redirect } from 'react-router-dom';

function RegisterForm(props) {

  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { error, isFetching } = useSelector(({ auth }) => auth.register)
  const onSubmit = (data) => dispatch(registerUser(data))
  
  if (isFetching) {
    <LoadingView message="One moment please..." />
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Create an account</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            ref={register}
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            ref={register}
            type="text"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            ref={register}
            type="text"
            name="avatar"
            placeholder="Enter url to image"
            className="form-control"
            id="avatar"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            ref={register}
            name="password"
            type="password"
            className="form-control"
            id="password" />
        </div>
        { error && <div className="alert alert-danger small">{error.message}</div>}
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </div>
    </form>
 
   
  );
}

export default RegisterForm;