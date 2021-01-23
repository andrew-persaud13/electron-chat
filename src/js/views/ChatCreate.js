import React from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createChat } from '../actions/chats'
import { withBaseLayout } from '../layouts/Base'


function ChatCreate(props) {

  const { register, handleSubmit  } = useForm()
  const user = useSelector(({ auth }) => auth.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (data) => dispatch(createChat(data, user.uid)).then(_ => history.push("/home"))

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
            <div className="header">Create a chat!</div>
            <div className="subheader">Enjoy a conversation with others!</div>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="name">Channel Name</label>
                <input
                  ref={register}
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  aria-describedby="nameHelp" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Chat Description</label>
                <input
                  ref={register}
                  type="textarea"
                  name="description"
                  className="form-control"
                  id="description" />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  ref={register}
                  type="text"
                  name="image"
                  className="form-control"
                  id="image" />
              </div>
              { false && <div className="alert alert-danger small">{"beep"}</div>}
              <button type="submit" className="btn btn-outline-primary">Create</button>
            </div>
          </form>
      </div>    
    </div>
  );
}

export default withBaseLayout(ChatCreate, { canGoBack: true });