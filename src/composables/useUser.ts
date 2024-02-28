import { computed, reactive } from 'vue'
import { type User } from '@/utils/index'
import { getUser } from '@/api/index'

const state = reactive<{
  currentUser: User | null
}>({
  currentUser: null
})

export default function useUser() {
  async function fetchUser() {
    try {
      state.currentUser = await getUser()
    } catch (error) {
      throw new Error('There was an error while fetching your profile, please try again later.')
    }
  }

  return {
    currentUser: computed(() => state.currentUser),
    fetchUser
  }
}
