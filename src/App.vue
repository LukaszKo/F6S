<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

import ComposeSection from '@/components/ComposeSection.vue'
import ConversationArea from '@/components/ConversationArea.vue'
import AppLoader from '@/components/AppLoader.vue'

import useConversation from '@/composables/useConversation'
import useUser from '@/composables/useUser'

const { addMessage, conversation, fetchConversation } = useConversation()
const { currentUser, fetchUser } = useUser()

const conversationArea = ref<{ $el: HTMLElement } | null>(null)
const fetching = ref(false)
const newMessage = ref('')
const apiError = ref('')

async function scrollToBottom() {
  await nextTick()
  conversationArea.value?.$el.scrollTo(0, conversationArea.value.$el.scrollHeight)
}

async function submit() {
  addMessage({ message: newMessage.value, user: currentUser.value! })
  newMessage.value = ''
  scrollToBottom()
}

onMounted(async () => {
  try {
    fetching.value = true
    apiError.value = ''
    await fetchUser()
    await fetchConversation()
  } catch (error) {
    apiError.value = error
  } finally {
    fetching.value = false
  }
})
</script>

<template>
  <main>
    <AppLoader v-if="fetching"></AppLoader>
    <ConversationArea
      v-if="conversation && currentUser && !fetching"
      ref="conversationArea"
      :conversation="conversation"
      :currentUserId="currentUser.id"
    ></ConversationArea>
    <ComposeSection v-model="newMessage" @submit="submit"></ComposeSection>
    <p class="error" v-if="apiError">{{ apiError }}</p>
  </main>
</template>

<style scoped>
main {
  display: grid;
  gap: 20px;
}

.error {
  color: red;
  text-align: center;
}
</style>
