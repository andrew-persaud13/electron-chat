import { Timestamp } from '../db/firestore'
import moment from 'moment'

export const createTimestamp = () => {
  return Timestamp.now().toMillis().toString()
}

export const timeFromNow = (timestamp) => moment(timestamp).fromNow()