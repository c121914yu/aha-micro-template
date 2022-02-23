<template>
	<div
		v-if="loaded"
		id="root-app"
	>
		<router-view />
	</div>
</template>

<script>
import { getToken } from '@/utils/userManage'

export default {
  data() {
    return {
      loaded: false,
    }
  },
  created() {
    this.autoLogin()
  },
  methods: {
    /**
     * 自动登录
     */
    async autoLogin() {
      if (getToken()) {
        this.$loading('登录中...')
        try {
          await this.$storesAction('autoLogin', this.$route.query)
        } catch (err) { err }
        this.$hideLoading()
      }
      this.loaded = true
    },
  }
}
</script>

<style lang="scss" >
#root-app {
  height: 100vh;
  overflow: hidden;
}
</style>
