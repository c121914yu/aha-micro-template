<template>
	<div
		v-if="loaded"
		id="app"
	>
		<Topbar v-if="$getState('adminInfo','isLogined')" />
		<LeftNav v-if="leftNav" />
		<router-view
			id="main"
			:class="{
				'paddingLeft': leftNav
			}"
		/>
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
  computed: {
    leftNav() {
      return this.$getState('navStore', 'showLeft') && this.$route.meta.leftNav
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
        try {
          this.$loading('登录中...')
          await this.$storesAction('autoLogin', this.$route.query)
        } catch (err) { err }
        this.$hideLoading()
      }
      this.loaded = true
    },
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  padding-top: $topbarHeight;

  #main {
    position: relative;
    height: calc(100vh - #{$topbarHeight});

    &.paddingLeft {
      margin-left: $leftNavWidth;
    }
  }
}
</style>
