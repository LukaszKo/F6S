<template>
  <div class="conversation-area">
    <MessageBubble
      v-for="message in conversation"
      :key="message.id"
      :message="message"
      :currentUserId="currentUserId"
    ></MessageBubble>
  </div>
</template>

<script setup lang="ts">
import { type Conversation } from '@/utils/index'
import MessageBubble from './MessageBubble.vue'

defineProps<{
  conversation: Conversation
  currentUserId: number
}>()
</script>

<style lang="scss" scoped>
.conversation-area {
  display: grid;
  height: 400px;
  overflow-y: auto;
  scroll-behavior: smooth;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
