import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link  } from 'react-router-dom'

import JoinedChatsList from '../components/JoinedChatsList'
import AvailableChatsList from '../components/AvailableChatsList'
import ViewTitle from '../components/shared/ViewTitle'
import { withBaseLayout } from '../layouts/Base'

import { fetchChats } from '../actions/chats'
import Notification from '../utils/notification'
function Home(props) {
    const dispatch = useDispatch()
    const { joined, available }  = useSelector(({ chats }) => chats)

    useEffect(() => {
        Notification.setup()
    
        dispatch(fetchChats())
    },[dispatch])

    return (
    
        <div className="row no-gutters fh">
            <div className="col-3 fh">
            <JoinedChatsList chats={joined} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose your channel" >
                    <Link to="/createChat" className="btn btn-outline-primary">New Chat</Link>
                </ViewTitle>
                <AvailableChatsList chats={available} />
            </div>
        </div>
    );
}

export default withBaseLayout(Home);