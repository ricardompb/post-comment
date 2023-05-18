import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const securityStore = defineStore('auth', {
  state: () => ({
    auth: {
      token: null
    }
  }),
  actions: {
    async login ({ login, senha }) {
      const res = await api.post('/security/v1/login', { login, senha })
      this.auth = res.data
      this.router.push('/')
    }
  }
})
