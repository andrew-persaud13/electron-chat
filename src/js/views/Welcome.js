import React, { useState } from 'react';
import { useSelector  } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import LoadingView from '../components/shared/Loader'

function Welcome(props) {

  const [isLoginView, setIsLoginView] = useState(true)

  const { user, isFetching } = useSelector(({ auth }) => 
    ({user: auth.user, isFetching: auth.isFetching}))
  
  const state = useSelector(state => state)
  

  const optInText = isLoginView ? ['Need an account?', 'Register'] : ['Already registered?', 'Login']
  
  if (isFetching) {
    return <LoadingView message="One moment please..." />
  }

  if (user && !isFetching) {
    return <Redirect to="/home" />
  }
  return (

      <div className="centered-view">
        <div className="centered-container">
          {
            isLoginView ? <LoginForm /> : <RegisterForm />
          }
          
          <small className="form-text text-muted mt-2">{optInText[0]}
            <span
              onClick={() => setIsLoginView(!isLoginView)}
        className="btn-link ml-2">{optInText[1]}</span>
          
          </small>
        </div>
      </div>
   
  );
}

export default Welcome;