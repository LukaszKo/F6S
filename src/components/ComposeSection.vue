<template>
  <div class="compose">
    <textarea v-model="model" type="text" @keyup.enter="$emit('submit')" :rows="textareaRows" />
    <img @click="$emit('submit')" src="@/assets/send.svg" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel()
defineEmits<{
  submit: []
}>()

const textareaRows = computed(() => (model.value.length ? 3 : 1))
</script>

<style scoped lang="scss">
.compose {
  display: grid;
  grid-template-columns: 1fr 60px;
  gap: 12px;
  align-items: center;

  textarea {
    padding: 4px;
    resize: none;
  }

  img {
    align-self: center;
    justify-self: center;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
}
</style>
