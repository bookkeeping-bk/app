<template>
  <form class="login__form">
    <h1 class="login__form-title">登 录</h1>
    <div class="login__form-item">
      <be-input
        v-model="formData.mobile"
        type="number"
        :placeholder="rules.mobile"
      />
    </div>
    <div class="login__form-item">
      <be-input
        v-model="formData.password"
        type="password"
        :placeholder="rules.password"
      />
    </div>
    <div class="login__form-item">
      <van-button
        :loading="state.isLoading"
        block
        loading-size="40px"
        loading-text="正在登录中..."
        type="primary"
        text="登录"
        @click="submitLogin"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import { login } from '@/api/auth'
import router from '@/router'
import { setAuthToken } from '@/utils/storage'
import Input from './components/input/index.vue'

const { VITE_USERNAME, VITE_PASSWORD, MODE } = import.meta.env

export default defineComponent({
  setup() {
    const state = reactive({ route: useRoute(), isLoading: false })

    // 登录表单数据
    const formData: LoginFormData = reactive({
      mobile: MODE === 'development' ? (VITE_USERNAME as string) : '',
      password: MODE === 'development' ? (VITE_PASSWORD as string) : '',
    })

    // 表单验证
    const rules: LoginFormData = reactive({
      mobile: '请输入手机号',
      password: '请输入密码',
    })

    // 提交登录方法
    const submitLogin = async () => {
      const { mobile, password } = formData
      if (!mobile) return handleToast(rules.mobile)
      if (mobile.length !== 11) return handleToast('请输入正确的手机号')
      if (!password) return handleToast(rules.password)

      try {
        state.isLoading = true
        const { redirect } = state.route.query
        const { data } = await login(formData)
        const { token } = data.meta
        setAuthToken(token)
        router.replace((redirect as string) || '/')
      } finally {
        state.isLoading = false
      }
    }

    const handleToast = (message: string) => {
      Toast({ message, position: 'bottom' })
    }

    return { state, formData, rules, submitLogin }
  },

  components: {
    [Input.name]: Input,
  },
})
</script>

<style lang="scss" scoped>
.login__form {
  padding: 100px 25px 0;
  &-title {
    text-align: center;
  }
  &-item {
    margin-bottom: 20px;
  }
}
</style>

