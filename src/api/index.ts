import {
  conversation,
  currentUser,
  type Conversation,
  type User,
  type Message
} from '@/utils/index'

function fakeCall<T>(data: T) {
  return new Promise<T>((resolve, reject) => {
    const randomFailure = Math.random()
    return setTimeout(() => {
      if (randomFailure < 0.1) {
        reject('api call failed')
      } else {
        resolve(data)
      }
    }, 500)
  })
}

export function getConversation(): Promise<Conversation> {
  return fakeCall<Conversation>(conversation)
}

export function getUser(): Promise<User> {
  return fakeCall<User>(currentUser)
}

export function sendReply(message: Message) {
  return fakeCall<Conversation>([...conversation, message])
}
