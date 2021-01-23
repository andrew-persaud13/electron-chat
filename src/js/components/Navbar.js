import React from 'react';
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {logout} from '../actions/auth'
import BackButton from './shared/BackButton';

function Navbar({ canGoBack, view }) {


    const dispatch  = useDispatch()

    const user = useSelector(({auth}) => auth.user)

    return (
        <div className="chat-navbar">
            <nav className="chat-navbar-inner">
                <div className="chat-navbar-inner-left">
                    {canGoBack && <BackButton /> }
                    {view !== 'Settings' && <Link 
                        to="/settings" 
                        className="btn btn-outline-success ml-2"
                    >
                        Settings
                    </Link>}
                 
                </div>
                <div className="chat-navbar-inner-right">
                    {!user && 
                    <Link
                      to="/"
                      className="btn btn-outline-success ml-2">Login</Link>}
                    {
                        user && 
                        <>
                        <img className="avatar" src={user.avatar} />
                        <span className="logged-in-user">Hi {user.username}</span>
                        <button
                        onClick={() => dispatch(logout())}
                        className="btn btn-outline-danger ml-2"
                    >
                            Logout
                        </button>
                        </>
                    }
                    
                </div>
            </nav>
      </div>
    );
}

export default Navbar