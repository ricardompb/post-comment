<template>
    <form></form>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Login',
    setup () {
        const form = ref({
            login: '',
            senha: ''
        })

        const loading = ref(false)
        const focused = ref(false)
        const showPassword = ref(false)

        const login = async () => {
            loading.value = true
            try {
                
            } finally {
                loading.value = false
            }
        }
    }
})

</script>