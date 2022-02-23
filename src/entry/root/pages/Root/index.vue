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
				class="iframe"
				frameborder=0
				scrolling="auto"
				:src="src"
				@load="$hideLoading()"
				@error="$emit('error')"
			/>
		</div>
	</div>
</template>

<script>
import { subEvent } from '@/utils/eventBus'
import { getToken } from '@/utils/userManage'
import { qs, objToQeury } from '@/utils/param'

export default {
  computed: {
    src() {
      const selectApp = this.$getState('navStore', 'selectApp')
      const src = `${ selectApp.host }/#${ selectApp.path }`

      console.log(src)
      return src
    }
  },
  watch: {
    'src': function() {
      this.$loading('加载中')
      this.$storesCommit('setLoadTimer')
    }
  },
  created() {
    this.subEvents()
  },
  methods: {
    /**
     * 事件订阅
     */
    subEvents() {
      /* 路由修改 */
      subEvent('iframeChange', (src) => {
        if (src) {
          const param = qs(src)

          param.token = getToken()
          this.src = src + objToQeury(param)
          console.log('加载子项===>', this.src)
        }
      })
    },
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
