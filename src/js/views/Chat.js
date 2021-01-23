import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ChatUsersList from '../components/ChatUsersList'
import ChatMessagesList from '../components/ChatMessagesList'
import ViewTitle from '../components/shared/ViewTitle'
import { withBaseLayout } from '../layouts/Base'

import { 
  subscribeToChat, 
  subscribeToProfile, 
  sendChatMessage, 
  subscribeToMessages, 
  registerMessageSubscription 
} from '../actions/chats'
import LoadingView from '../components/shared/LoadingView';
import Messenger from '../components/Messenger'

function Chat(props) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const activeChat = useSelector(({ chats }) => chats.activeChats[id])
  const messages = useSelector(({ chats }) => chats.messages[id])
  const messageSub = useSelector(({ chats }) => chats.messagesSubs[id])
  const joinedUsers = activeChat?.joinedUsers
  const unsubscribeArr = useRef({})
  const messageList = useRef()

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers)

    return () => unsubscribeToJoinedUsers()
  }, [joinedUsers])
 

  useEffect(() => {
    const unSubFromChat = dispatch(subscribeToChat(id))
    if (!messageSub) {
      const unsubFromMessages = dispatch(subscribeToMessages(id))
      dispatch(registerMessageSubscription(id, unsubFromMessages))
    }
    
    

    return () => unSubFromChat()
  }, [])

  const subscribeToJoinedUsers = useCallback((jUsers) => {
    jUsers.forEach(user => {
      if (!unsubscribeArr.current[user.uid])
      unsubscribeArr.current[user.uid] = dispatch(subscribeToProfile(user.uid, id))
    })
  }, [dispatch, id])

  const unsubscribeToJoinedUsers = useCallback(() => Object.keys(unsubscribeArr.current).forEach(key => unsubscribeArr.current[key]()), [unsubscribeArr.current] )

  const sendMessage = useCallback(message => {
    dispatch(sendChatMessage(message, id))
      .then(_ => messageList.current.scrollIntoView(false))
  }, [id])

  if (!activeChat?.id) {
    return <LoadingView message="Loading chat..." />
  }
  return (
   
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <ChatUsersList users={activeChat?.joinedUsers || []} />
        </div>
        <div className="col-9 fh">
            <ViewTitle text={`Channel ${activeChat?.name || ''}`} />
            <ChatMessagesList innerRef={messageList} messages={messages || []} />
            <Messenger onSubmit={sendMessage} />
        </div>
      </div>
  );
}

export default withBaseLayout(Chat, { canGoBack: true });