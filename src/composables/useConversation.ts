import { computed, reactive } from 'vue'
import { getMessageDate, type Conversation, type NewMessagePayload } from '@/utils/index'
import { getConversation, sendReply } from '@/api/index'

const state = reactive<{
  conversation: Conversation
}>({
  conversation: []
})

export default function useConversation() {
  function revertLastMessage() {
    state.conversation.pop()
  }

  function createNewMessageEntity({ message, user }: NewMessagePayload) {
    return {
      date: getMessageDate(),
      from: user,
      id: state.conversation.length + 1,
      message
    }
  }

  async function addMessage({ message, user }: NewMessagePayload) {
    if (!message) return

    const newMessage = createNewMessageEntity({ message, user })
    state.conversation.push(newMessage)

    try {
      await sendReply(newMessage)
    } catch (error) {
      revertLastMessage()
      throw new Error('Error while sending new message, please try again later.')
    }
  }

  async function fetchConversation() {
    try {
      state.conversation = await getConversation()
    } catch (error) {
      throw new Error('There was an error while fetching conversation, please try again later')
    }
  }

  return {
    conversation: computed(() => state.conversation),
    addMessage,
    fetchConversation
  }
}
