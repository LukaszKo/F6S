<template>
  <div :class="messageBubbleClasses">
    <div :class="messageAvatarClasses">
      <img
        class="message__avatar__img"
        :src="message.from.thumbnail"
        @mouseover="tooltipVisible = 'visible'"
        @mouseleave="tooltipVisible = 'hidden'"
      />
      <span :class="tooltipClasses">{{ message.from.lastName }}</span>
    </div>

    <div class="message__text">
      <span class="message__text__created_at">{{ message.date }}</span>
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Message } from '@/utils/index'

const props = defineProps<{
  message: Message
  currentUserId: number
}>()

const isOwnerMessage = computed(() => props.message.from.id === props.currentUserId)
const messageBubbleClasses = computed(() => [
  'message',
  isOwnerMessage.value && 'message--is-owner'
])
const messageAvatarClasses = computed(() => [
  'message__avatar',
  isOwnerMessage.value && 'message__avatar--is-owner'
])

const tooltipClasses = computed(() => [
  'message__tooltip',
  isOwnerMessage.value && 'message__tooltip--is-owner'
])

const tooltipVisible = ref('hidden')
</script>

<style scoped lang="scss">
.message {
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 8px;
  gap: 12px;

  &--is-owner {
    justify-self: flex-end;
  }

  &__text {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    max-width: 400px;
    display: flex;
    flex-direction: column;

    &__created_at {
      font-size: 10px;
      align-self: flex-end;
    }
  }

  &__avatar {
    position: relative;

    &__img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      align-self: flex-end;
      position: relative;
    }

    &--is-owner {
      order: 2;
    }
  }

  &__tooltip {
    visibility: v-bind(tooltipVisible);
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    padding: 4px 12px;
    position: absolute;
    z-index: 1;
    top: 0;

    &--is-owner {
      right: 48px;
    }
  }
}
</style>
