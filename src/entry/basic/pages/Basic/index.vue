<template>
	<div>
		<Iframe
			:name="$getState('navStore', 'routeName')"
			:src="src"
			@load="$hideLoading()"
		/>
	</div>
</template>

<script>
import { subEvent } from '@/utils/eventBus'
import { getToken } from '@/utils/userManage'
import { qs, objToQeury } from '@/utils/param'

export default {
  data() {
    return {
      src: ''
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
