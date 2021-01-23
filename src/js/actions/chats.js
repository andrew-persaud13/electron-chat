import * as api from '../api/chats'
import db from '../db/firestore'
import firebase from 'firebase/app'


export const fetchChats = () => async (dispatch, getState) => {
  const { user } = getState().auth
  dispatch({ type: 'CHATS_FETCH_INIT' })
  const chats = await api.fetchChats()

  chats
    .forEach(chat => chat.joinedUsers = chat.joinedUsers.map(user => user.id))

  const sortedChats = chats.reduce((accuChats, chat) => {
    accuChats[ chat.joinedUsers.includes(user.uid) ? 'joined' : 'available'].push(chat)
    return accuChats
  }, {joined: [], available: []})


  dispatch({
    type: 'CHATS_FETCH_SUCCESS',
    ...sortedChats
  })

  return sortedChats
}
 
export const joinChat = (chat, uid) => async dispatch => {
  await api.joinChat(uid, chat.id)
  dispatch({ type: 'CHATS_JOIN_SUCCESS', chat })
}


export const createChat = (formData, userId) => async dispatch => {

  const newChat = { ...formData }
  newChat.admin = db.doc(`profiles/${userId}`)

  const chatId = await api.createChat(newChat)
  dispatch({ type: 'CHATS_CREATE_SUCCESS' })
  await api.joinChat(userId, chatId)
  dispatch({ type: 'CHATS_JOIN_SUCCESS', chat: { ...newChat, id: chatId } })
  return chatId
}


export const subscribeToChat = (chatId) => dispatch => 
  api.subscribeToChat(chatId, async (chat) => {

    const joinedUsers = await Promise.all(chat.joinedUsers.map(async userRef => { //Array of Promises!
      const userSnapshot = await userRef.get()
      return userSnapshot.data()
    }))
    chat.joinedUsers = joinedUsers
    dispatch({ type: 'CHATS_SET_ACTIVE_CHAT', chat })
  })

export const subscribeToProfile = (uid, chatId) => dispatch => 
  api.
    subscribeToProfile(uid, (user) => dispatch({ type: 'CHAT_UPDATE_USER_STATE', user, chatId }) )


export const subscribeToMessages = (chatId) => dispatch => {
  
  return api
    .subscribeToMessages(chatId, async messages => {

      const chatMessages = messages.map(message => {
        if (message.type === 'added') {
          return { id: message.doc.id, ...message.doc.data() }
        }
      })
      const messagesWithAuthor = []
      const authorCache = {} //otherwise it will send request for each message even if same author
      for await(let message of chatMessages) {
        if (authorCache[message.author.id]) {
          message.author = authorCache[message.author.id]
        } else {
          const userSnapshot = await message.author.get()
          message.author = authorCache[message.author.id] = userSnapshot.data()
        }
        messagesWithAuthor.push(message)
      }
      dispatch({ type: 'CHATS_SET_MESSAGES', chatMessages : messagesWithAuthor, chatId })
      return messages
    })
}   

export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
  const newMessage = { ...message }
  const { user } = getState().auth
  const userRef = db.doc(`/profiles/${user.uid}`)
  newMessage.author = userRef

  return api
    .sendChatMessage(newMessage, chatId)
    .then(_ => dispatch({ type: 'CHATS_MESSAGE_SENT' }))
}

export const registerMessageSubscription = (chatId, messageSub) => ({
  type: 'CHATS_REGISTER_MESSAGE_SUB',
  sub: messageSub,
  chatId
})

// song 1:43 in