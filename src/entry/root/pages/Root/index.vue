<template>
	<div class="root">
		<Topbar v-if="$getState('adminInfo','isLogined')" />
		<LeftNav v-if="$getState('navStore','showLeft')" />
		<div
			id="container"
			:class="{
				'padding-top': $getState('adminInfo','isLogined'),
				'padding-left': $getState('navStore','showLeft')
			}"
		>
			<iframe
				id="Iframe"
				class="iframe"
				frameborder=0
				scrolling="auto"
				:src="src"
				@load="loaded"
			/>
		</div>
	</div>
</template>

<script>
import { setChildGlobalData } from '@root/utils/postMessage'

let currentAppName = ''

export default {
  computed: {
    src() {
      const selectApp = this.$getState('navStore', 'selectApp')
      const src = `${ selectApp.host }/#${ selectApp.path }`

      if (currentAppName !== selectApp.name) {
        this.$loading('加载中')
        currentAppName = selectApp.name
      }

      return src
    }
  },
  methods: {
    /**
     * iframe加载完成, 加载失败也会触发
     */
    loaded() {
      setChildGlobalData()
      this.$hideLoading()
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  #container {
    position: relative;
    width: 100%;
    height: 100vh;

    &.padding-top {
      padding-top: $topbarHeight;
    }

    &.padding-left {
      padding-left: $leftNavWidth;
    }

    .iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
